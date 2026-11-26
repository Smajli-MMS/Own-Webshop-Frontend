FROM nginx:stable-alpine

# npm ci and npm run build run in CI before this image is built.
ENV BACKEND_UPSTREAM=backend:8081
ENV NGINX_ENVSUBST_FILTER=BACKEND_UPSTREAM

COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY build/ /usr/share/nginx/html/

EXPOSE 80
