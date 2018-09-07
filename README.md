# Simple ElasticSearch Geocoding Service

Multi-thread.
Made with NodeJS, TypeScript, Babel, Koa, ElasticSearch, tslint.

## Quickstart

Edit src/config/index.ts with your ElasticSearch configuration.

     npm i
     npm run build-run
     
Open localhost:8000 in your navigator. See Methods for more information.

### Edit src/config/index.ts with your ElasticSearch configuration

    elasticSearchProtocol: string = 'http' | 'https'
    elasticSearchHost: string // elasticsearch host ip
    elasticSearchPort: number // elasticsearch host port

## Commands

    npm run build // build typescript
    npm start // run compiled javascript
    npm run build-run // build typescript & run javascript

## Methods

    GET /coords/:address
returns address, lat, lng

    POST /coords
create an address

    PATCH /coords
update an address

    DELETE /coords
delete an address
