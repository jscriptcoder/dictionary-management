# Dictionary Management

Functionality offered by this application:

1. Creating and deleting dictionaries
2. Showing available dictionaries in an overview.
3. Editing dictionaries (adding, updating and removing rows).
4. Validating the entire dictionary regarding consistency (see Dictionary Consistency)

Validations should be shown as some kind of problem markers next to the offending part of the dictionary. Problem markers have different severities, e.g. a Duplicate Domains/Ranges problem is less severe than a Cycle (in which case you cannot go on processing such a dictionary).

## Dictionary Consistency
- Duplicate Domains/Ranges: Two rows in the dictionary map to the same value, simply resulting in duplicate content.
- Duplicate Domains with different Ranges: Two rows in the dictionary map to different values, resulting in an ambiguous transformation.
- Cycles: Two or more rows in a dictionary result in cycles, resulting in a never-ending transformation.
- Chains: A chain structure in the dictionary (a value in Range column also appears in Domain column of another entry), resulting in inconsistent transformation.

## Technologies used

1. Angular 2+ (https://github.com/angular)
2. Angular CLI (https://github.com/angular/angular-cli)
3. Angular Material Design (https://github.com/angular/material2)
4. ngrx (https://github.com/ngrx)
   * ngrx/store (https://github.com/ngrx/store)
   * ngrx/effects (https://github.com/ngrx/effects)
   * ngrx/db for IndexedDB storage (https://github.com/ngrx/db)
5. Typescript (https://github.com/Microsoft/TypeScript)
6. Webpack under the hood (https://github.com/webpack)

## Installation

Run `npm install` to download all the dependencies to run and build the project.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).
