# batsi-oebb-proxy

## Info

This is a Cloudflare Worker project which serves as a Proxy to the OEBB Backend https://live.oebb.at, which holds the data required for bATsi to work.

## Setup

### Install

- Install 3rd party dependencies by running:
  - `npm install`

### Environment Variables / Secrets

- Create a file named ".dev.vars" at the same path as this README.
  - Set the secret "API_TOKEN" to the API secret like this (replace \<TOKEN> with the actual token):
    - `API_TOKEN="<TOKEN>"`
  - Update the token on the Server as well:
    - `npm wrangler secret put API_TOKEN`
    - When asked, enter the token and press enter
- After Environment Variables / Secrets have been changed, type information can be updated by running:
  - `npm run cf-typegen`

### Start

- Start the project locally by running
  - `npm run dev`
- Call the Proxy by using Curl or another tool of your choice. Don't forget to include the API-Token in the header:
  - `curl "http://127.0.0.1:8787/backend/info?trainNr=740&date=2025-01-23&station=8103000" --verbose -H "API_TOKEN:<TOKEN>"`
