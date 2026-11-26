#!/usr/bin/env bash
set -euo pipefail

# Run on a Docker-enabled CI runner, without the real backend or database.
image="${1:-relin-frontend:ci}"
network="relin-frontend-test-$$"
frontend="${network}-web"
backend="${network}-api"
temporary="$(mktemp -d)"
cleanup() {
    status=$?
    if [ "$status" -ne 0 ]; then
        docker logs "$frontend" 2>&1 || true
        docker logs "$backend" 2>&1 || true
    fi
    docker rm -f "$frontend" "$backend" >/dev/null 2>&1 || true
    docker network rm "$network" >/dev/null 2>&1 || true
    rm -rf "$temporary"
}
trap cleanup EXIT

docker network create "$network" >/dev/null
docker run -d --name "$backend" --network "$network" --network-alias backend \
    --entrypoint /bin/sh nginx:stable-alpine -c \
    'mkdir -p /usr/share/nginx/html/api; printf "[{\"marketId\":901}]" > /usr/share/nginx/html/api/markets; exec nginx -g "daemon off;"' >/dev/null
docker run -d --name "$frontend" --network "$network" \
    -e BACKEND_UPSTREAM=backend:80 -p 127.0.0.1::80 "$image" >/dev/null
address="http://$(docker port "$frontend" 80/tcp)"
curl --fail --max-time 5 --retry 20 --retry-all-errors --retry-max-time 45 --retry-delay 1 "$address/" -o "$temporary/index.html"
grep -q '<div id="root"' "$temporary/index.html"
curl --fail "$address/direct-react-route" -o "$temporary/route.html"
cmp "$temporary/index.html" "$temporary/route.html"
curl --fail --max-time 5 --retry 10 --retry-all-errors --retry-max-time 30 --retry-delay 1 "$address/api/markets?probe=1" -o "$temporary/markets.json"
python3 -c 'import json,sys; assert json.load(open(sys.argv[1])) == [{"marketId":901}]' "$temporary/markets.json"
status="$(curl -s -o /dev/null -w '%{http_code}' "$address/static/missing.js")"
test "$status" = 404
echo "Docker smoke test passed: React page, SPA fallback, API proxy and missing static asset."
