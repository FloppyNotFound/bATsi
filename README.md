# bATsi

Bahn AT Sitzplatzauslastungsanzeige ("bATsi", for short).

EN: Austrian Railway Seat Reservation Capacity viewer.

## Motivation

There already is an official UI available at https://live.oebb.at, with another concept of user experience. It will prompt you for start, destination, date and time, and shows you a list of available connections afterwards. When you select one, details are provided.

bATsi assumes you already know the train number and provides a shortcut to the specifc train information.

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
