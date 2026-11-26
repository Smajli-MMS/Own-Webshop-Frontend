# Frontend als versioniertes Docker-Image

## Voraussetzungen in GitHub und Docker Hub

Im Frontend-Repository Settings -> Secrets and variables -> Actions:

- Repository secret `DOCKERHUB_TOKEN`: gültiger Docker-Hub-PAT mit Repo Read & Write.
- Repository variable `DOCKERHUB_USERNAME`: `ensarsmajli`.

Auf Docker Hub das Repository `ensarsmajli/own-webshop-frontend` anlegen, falls es
noch nicht existiert. Die Sichtbarkeit nach Projektvorgabe wählen. Ein privates
Repository erfordert auch beim späteren Pull auf der VM eine Docker-Anmeldung.
Tokens gehören ausschließlich in Secrets bzw. die Docker-Anmeldung, niemals in Git.

## CI und erste Veröffentlichung

Pull Requests, Pushes auf main und manuelle Läufe führen Typprüfung, Tests,
Produktionsbuild, Docker-Build und einen Container-Smoke-Test aus. Nur der Push
eines gültigen Versions-Tags veröffentlicht das geprüfte Image auf Docker Hub.
Stabile Tags wie `1.0.0` sind erlaubt; `latest`, `v1.0.0`, Vorabversionen und
führende Nullen sind ausgeschlossen, entsprechend der Backend-Release-Regel.

Nach erfolgreicher PR-CI und dem Merge im Frontend-Projekt auf dem Laptop:

```sh
git switch main
git pull --ff-only origin main
git tag -a 1.0.0 -m "Frontend Release 1.0.0"
git push origin 1.0.0
```

Vorher prüfen, ob der Tag bereits existiert; andernfalls eine höhere freie Version
verwenden. Backend und Frontend haben unabhängige Git-Tags in getrennten Repositories.
Der erfolgreiche Workflow veröffentlicht beispielsweise:

```text
ensarsmajli/own-webshop-frontend:1.0.0
```

## Image und Backend-Verbindung

Das Dockerfile kopiert den zuvor mit npm erzeugten Ordner `build/` in das offizielle
Nginx-Image. Es enthält weder Node.js noch node_modules. `.dockerignore` lässt nur
Produktionsbuild und Nginx-Template in den Build-Kontext.

Die CI baut React mit `REACT_APP_API_URL=/`. Die bestehende API-Konfiguration entfernt
den abschließenden Slash, sodass die generierten Clients relative Pfade wie
`/api/markets` verwenden. Browser und API nutzen dadurch dieselbe Herkunft.
Die im Repository vorhandene lokale `.env` mit localhost:8081 wird beim CI-Build
durch die explizite Umgebungsvariable übersteuert. Sie bleibt für die lokale
Entwicklung mit npm start nutzbar.

Create React App liest REACT_APP_* beim Build. Eine solche Variable erst beim
Containerstart zu setzen, ändert das bereits gebaute JavaScript nicht.

Beim Containerstart erzeugt der offizielle Nginx-Entrypoint aus `nginx.conf.template`
die Serverkonfiguration. `BACKEND_UPSTREAM` hat den Standard `backend:8081` und kann
beim Containerstart geändert werden (Format Host:Port, ohne http:// und ohne Pfad).
Nur diese Variable wird ersetzt; Nginx-Variablen wie $uri bleiben erhalten.
`/api/...` wird mit unverändertem Pfad und Query-String zum Backend weitergeleitet.
Docker-DNS wird während des Betriebs erneut abgefragt, damit ein neu erstellter
Backend-Container mit einer anderen IP erreichbar bleibt.

React-Routen werden bei direktem Aufruf oder Neuladen über index.html bedient.
Fehlende Dateien unter /static/ liefern einen HTTP-404-Status.

## Nächster Schritt: bestehendes Compose auf der VM erweitern

Die gemeinsame Compose-Datei bleibt im Backend-Repository. Dieser PR im Frontend
ändert die laufende VM und das Backend-Repository noch nicht. Die folgende
Ergänzung wird beim nächsten Einrichtungsschritt dort übernommen:

```yaml
  frontend:
    image: ensarsmajli/own-webshop-frontend:${FRONTEND_TAG:?Set FRONTEND_TAG to a stable version}
    restart: unless-stopped
    depends_on:
      - backend
    environment:
      BACKEND_UPSTREAM: backend:8081
    ports:
      - "127.0.0.1:8082:80"
```

Der Service muss unter demselben `services:`-Block wie backend und db stehen,
damit die Container das gleiche Compose-Netzwerk verwenden. In der privaten
`.env.compose` sowie deren Beispiel wird eine eigene Frontend-Version ergänzt:

```dotenv
FRONTEND_TAG=1.0.0
```

Nach dieser Ergänzung auf der VM:

```sh
cd ~/Azubi-Projekt
docker compose --env-file .env.compose pull frontend
docker compose --env-file .env.compose up -d frontend
curl --fail http://127.0.0.1:8082/
curl --fail http://127.0.0.1:8082/api/markets
```

Danach die vorhandene Host-Nginx-Konfiguration `/etc/nginx/conf.d/relin.conf`
gemeinsam auf `proxy_pass http://127.0.0.1:8082;` umstellen und vor dem Neuladen
mit `sudo /usr/sbin/nginx -t` prüfen. Dann liefert Port 80 die Webseite aus;
API-Anfragen erreichen das Backend über den Frontend-Proxy.
Den bestehenden HTTPS-Domain-Block bei der späteren Domain-Einrichtung ebenfalls
berücksichtigen; dessen abgelaufenes Zertifikat muss separat erneuert werden.

Der Backend-Updater aktualisiert ausschließlich das Backend. Automatische
Frontend-Updates sind ein weiterer Schritt und werden durch dieses Image allein
noch nicht aktiviert.

## Manuelles Bauen auf einem Rechner mit Docker

```sh
npm ci
REACT_APP_API_URL=/ npm run build
docker build -t relin-frontend:local .
bash scripts/test-docker.sh relin-frontend:local
```

Die Umgebungsvariable in PowerShell stattdessen vor dem Build setzen:

```powershell
$env:REACT_APP_API_URL = '/'
npm run build
```

Auf dem Firmenlaptop ohne Docker/WSL übernimmt GitHub Actions den Container-Test.
Der CI-Smoke-Test prüft Startseite, React-Routen, fehlende statische Dateien und
die API-Weiterleitung gegen einen kleinen Nginx-Testserver. Die Verbindung zur
echten Spring-Boot-Anwendung wird beim anschließenden VM-Schritt geprüft.

Quellen:
- https://hub.docker.com/_/nginx
- https://docs.docker.com/build/ci/github-actions/
