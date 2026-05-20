# Work Experience API

Detta repository innehåller kod för ett enklare REST API byggt med Node.js och Express. API:et är byggt för att hantera arbetserfarenheter, till exempel tidigare arbetsplatser, arbetsroller, plats, datum och beskrivning av arbetet.

Grundläggande funktionalitet för CRUD (Create, Read, Update, Delete) är implementerad.

https://nosql-backend-3zsp.onrender.com/

## Installation och databas

API:et använder en MongoDB-databas via MongoDB Atlas. För att hantera databasen används Mongoose.

Klona ner källkodsfilerna och kör följande kommando för att installera nödvändiga npm-paket:

```bash
npm install
```

Skapa sedan en .env-fil i projektets rotmapp och lägg till följande variabler:

```bash
PORT=3000
DATABASE_URL=mongodb+srv://USERNAME:PASSWORD@CLUSTER_URL/workexperience?retryWrites=true&w=majority
```

Starta projektet lokalt med:

```bash
npm run dev
```
eller 
```bash
npm start
```

Databasen skapas och fylls med data när nya poster läggs till via API:et. Varje arbetserfarenhet lagras som ett dokument i MongoDB.

## Datamodell

Varje arbetserfarenhet innehåller följande fält:

| Fält | Datatyp | Beskrivning |
|---|---|---|
| companyname | String | Namn på företaget |
| jobtitle | String | Arbetsroll/titel |
| location | String | Plats |
| startdate | String | Startdatum |
| enddate | String | Slutdatum |
| description | String | Beskrivning av arbetet |

## Användning

Nedan beskrivs hur API:et kan användas:

| Metod | Ändpunkt | Beskrivning |
|---|---|---|
| GET | `/api/workexp` | Hämtar alla arbetserfarenheter |
| GET | `/api/workexp/:id` | Hämtar en specifik arbetserfarenhet med angivet id |
| POST | `/api/workexp` | Lagrar en ny arbetserfarenhet. Kräver att ett arbetserfarenhets-objekt skickas med |
| PUT | `/api/workexp/:id` | Uppdaterar en existerande arbetserfarenhet med angivet id |
| DELETE | `/api/workexp/:id` | Raderar en arbetserfarenhet med angivet id |

## JSON-struktur

Ett arbetserfarenhets-objekt skickas som JSON med följande struktur:

```json
{
  "companyname": "Exempelföretag AB",
  "jobtitle": "Webbutvecklare",
  "location": "Stockholm",
  "startdate": "2023-01-01",
  "enddate": "2024-01-01",
  "description": "Arbetade med frontend- och backendutveckling."
}
```

## JSON-struktur

Projektet är byggt med:

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- CORS
- dotenv
