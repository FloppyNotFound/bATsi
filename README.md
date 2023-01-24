# bATsi
Bahn AT Sitzplatzauslastungsanzeige ("bATsi", for short)

Refer to https://live.oebb.at

This is a private project without any commercial interest.

## External Systems

### Station IDs
https://live.oebb.at/assets/assets/stations.json

### Train Data
https://live.oebb.at/backend/info?trainNr={trainNr}&date={date}&station={stationId}

#### Query Parameters
- trainNr: Per-day unique train number
- date: format: 'YYYY-MM-DD'
- station: Get ID from [Station IDs](#station-ids)
