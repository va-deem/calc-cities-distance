## About The Project
This app calculates distances between cities using their coordinates and the Haversine formula.

### Demo Link:
https://calc-cities-distance.vercel.app


### Built With
- React v18 - JavaScript library for building user interfaces
- Material UI v5 - library of React UI components that implements Google's Material Design
- Webpack v5 - module bundler for modern JavaScript applications

There are some examples of unit tests using Jest and e2e tests using Cypress.

## Getting Started

### Installation
1. Clone the repo
   ```
   git clone https://github.com/va-deem/calc-cities-distance
   ```
2. Install NPM packages

   ```
   npm install
   ```
   
## Usage
Start an app in development mode
```
npm start
```

## Running tests
To run Jest tests:
```
npm run test
```

To run Cypress test, make sure the app is running in dev mode
Start an app in development mode, running `npm start`. Then start UI testing in browser:
```
npm run cypress:open
```
or run test in the console:
```
npm run cypress:run
```
