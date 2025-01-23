# bATsi

Bahn AT Sitzplatzauslastungsanzeige ("bATsi", for short)

Refer to https://live.oebb.at

This is a private project without any commercial interest.

## Project

This monorepo consists of a frontend and a corresponding backend-for-frontend (BFF).

- Frontend: [bATsi ng](./batsi-ng-workspace/README.md)
- Backend: [bATsi OEBB Proxy](./batsi-oebb-proxy/README.md)

## External Systems

### Station IDs

https://live.oebb.at/assets/assets/stations.json

### Train Data

https://live.oebb.at/backend/info?trainNr={trainNr}&date={date}&station={stationId}

#### Query Parameters

- trainNr: Per-day unique train number
- date: format: 'YYYY-MM-DD'
- station: Get ID from [Station IDs](#station-ids)
