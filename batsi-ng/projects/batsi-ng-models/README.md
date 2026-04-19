# BatsiNgModels

## Info

The auto-generated backend models for usage with the bATsi Angular frontend, now using @hey-api/openapi-ts for modern TypeScript SDK generation.

## Setup

### Install

- Install 3rd party dependencies by running:
  - `npm install`

### Generate models

- Start generation of models by running:
  - `npm run build:models`

## Migration Notes

This project has been migrated from OpenAPI Generator to @hey-api/openapi-ts. The new generator produces:
- Modern TypeScript SDK with Angular support
- Better type safety with union types
- Simplified API client structure
- No Java/JDK dependency required

## Key Changes

### Before (OpenAPI Generator)
- Required Java/JDK installation
- Generated separate API services and models
- Complex configuration with openapitools.json
- Used `@openapitools/openapi-generator-cli`

### After (Hey-API)
- Pure TypeScript/Node.js based
- Unified SDK with better TypeScript support
- Simple JSON configuration
- Uses `@hey-api/openapi-ts`
- Generates modern Angular-compatible client

## Usage Example

```typescript
import { backendInfoGet, stationsGet } from 'batsi-ng-models';

// Get train info
const trainData = await backendInfoGet({
  params: {
    query: {
      apiToken: 'your-api-token',
      trainNr: '123',
      date: '2024-01-01',
      station: 'Wien'
    }
  }
});

// Get stations
const stations = await stationsGet({
  params: {
    query: {
      apiToken: 'your-api-token'
    }
  }
});
```
