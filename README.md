# Webshop-Frontend

## Backend konfigurieren (.env)

Das Projekt verwendet Create React App. Im Projektverzeichnis liegt `.env`:

```dotenv
REACT_APP_API_URL=http://localhost:8081
```

Der Wert ist die Backend-Adresse **ohne** `/api` am Ende. Die generierten Clients
fügen die in der Spezifikation definierten Pfade selbst an.

Für eine persönliche Abweichung eine `.env.local` anlegen (wird von Git ignoriert).
Der Standard passt zu `server.port=8081` im Backend.
Falls du das Backend auf Port 8080 umstellst, verwende:

```dotenv
REACT_APP_API_URL=http://localhost:8080
```

Nach einer Änderung den Entwicklungsserver stoppen und `npm start` neu ausführen.
Für ein Deployment wird die Variable beim Build eingesetzt; danach ist ein neuer
Build nötig. `REACT_APP_*`-Werte sind im Browser sichtbar, daher hier keine
Passwörter oder privaten Schlüssel speichern. Es ist kein zusätzliches `dotenv`
Paket nötig, Create React App lädt diese Dateien selbst.

## Starten und prüfen

```sh
npm ci
npm start
```

```sh
npm run typecheck
npm test -- --watchAll=false
npm run build
```

## OpenAPI-Clients generieren

`openapi/azubi-api-v1-spec.yaml` ist die Kopie des Backend-Vertrags aus
`Smajli-MMS/Azubi-Projekt`, Pfad
`azubi-api/src/main/resources/api/provider/azubi-api-v1-spec.yaml`.

Nach einer Vertragsänderung die YAML erneut aus dem Backend übernehmen und dann:

```sh
npm run generate:api
```

Zur Generierung wird Java 11 oder neuer benötigt (deine Backend-JDK genügt).
Generator-Version 7.12.0 und Optionen sind in `openapitools.json` festgelegt.
Die generierten TypeScript-Clients und Modell-Interfaces in `src/generated`
sind eingecheckt: zum Starten/Build ist daher keine lokale Java-Installation und
keine vorherige Generierung erforderlich. Generierte Dateien nicht manuell ändern;
stattdessen Spezifikation/Generator-Konfiguration anpassen und neu generieren.
Die React-Komponenten bleiben JavaScript, Create React App verarbeitet die
generierten TypeScript-Dateien mit.

`src/api/index.js` erzeugt eine gemeinsame `Configuration` und die Instanzen
`productsApi`, `marketsApi` und `stockApi`. Beispiel:

```js
import { productsApi, marketsApi } from './api';

const products = await productsApi.getAllProductsWithStock();
const availability = await marketsApi.getProductStockInAllMarkets({ productId: 1 });
```

Diese Methoden liefern bereits die deserialisierten Daten, ein zusätzliches
`response.json()` entfällt. Nicht erfolgreiche HTTP-Antworten werfen einen Fehler.
`StockService` delegiert an den generierten `StockApi`-Client, damit die vorhandenen
Warenkorb- und Bestandskomponenten ihre Service-Schnittstelle weiter nutzen können.
Der Bestellabschluss bleibt wie bisher eine lokale Simulation, da der
Backend-Vertrag keinen Bestell-Endpunkt enthält.

Dokumentation:
- https://create-react-app.dev/docs/adding-custom-environment-variables/
- https://openapi-generator.tech/docs/generators/typescript-fetch/

## Verbindung prüfen

1. PostgreSQL und danach `RelinApplication` starten. In der Startausgabe muss
   `Tomcat started on port 8081` erscheinen.
2. `http://localhost:8081/api/products/with-stock` im Browser öffnen. Dort muss
   eine JSON-Liste der Datenbankprodukte erscheinen. Eine leere Liste bedeutet,
   dass die aktive Backend-Datenbank keine Produkte liefert; ein HTTP-Fehler muss
   anhand des Backend-Logs behoben werden.
3. Frontend mit `npm start` starten und `http://localhost:3000/produkte` öffnen.
   Die Startseite `/` zeigt Werbebanner; die Produktliste liegt unter `/produkte`.
4. Bei Verbindungsfehlern zeigt die Produktseite eine Fehlermeldung mit einer
   Wiederholungsmöglichkeit. Details stehen in der Browser-Konsole.

Eine vorhandene `.env.local` überschreibt `.env`. Prüfe sie daher ebenfalls auf
Port 8081 und starte den Frontend-Server nach Änderungen neu. Beide Prozesse
müssen gleichzeitig laufen. Flyway befüllt die Datenbank beim Backend-Start;
der generierte Client liest diese Daten über `/api/products/with-stock`.
