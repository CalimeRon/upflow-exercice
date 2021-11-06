# Upflow Exercice
<p>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/Language-Typescript-3178C6.svg?logo=typescript"/>
  </a>
  <a href="https://reactjs.org/">
    <img src="https://img.shields.io/badge/Powered%20by-React-5ED3F3.svg?logo=react"/>
  </a>
  <a href="https://sass-lang.com/">
    <img src="https://img.shields.io/badge/Style-SCSS-CF649A.svg?logo=sass"/>
  </a>
  <a href="https://www.postgresql.org/">
    <img src="https://badgen.net/badge/icon/PostgreSQL?icon=postgresql&label=Database&color=blue"/>
  </a>
  <a href="https://nodejs.org/en/">
    <img src="https://img.shields.io/badge/Backend-NodeJS-green?logo=nodedotjs"/>
  </a>
  <a href="https://nodejs.org/en/">
    <img src="https://img.shields.io/badge/Backend-Express-blue?logo=express"/>
  </a>
</p>

Full-Stack data-grid example with editable rows and navigation. Tests for front-end and back-end. Written in Typescript.

## User Features
This project contains a RESTful API powered by Express(NodeJS) on the back-end. The front-end is powered by ReactJS.
The table example provided contains the built-in features:
* Edit cells
* Insert new rows
* Table navigation
* Display options (rows per page)
* Sort table by columns on click
* Delete rows
* (for testing purposes) Add 1000 uniquely-generated rows to the database
* (for testing purposes) Delete all rows in the database

## First set-up
### Set environmental variables
There are three environmental variables to set according to the `.example`s provided:
* `.env` in the `/server` directory
* `.env` and `cypress.env.json` in the `/client` directory

*Note: in the* `/client` *directory, `.env`must point to the server, while `cypress.env.json` must point to the client (http://localhost:3000 by default)*


### Install dependencies
From the root directory:
```bash
npm i
```
Then:
```bash
npm run install-dependencies
```

## Usage
Launch the app from the root directory:
```bash
npm run start-app
```
This will run both back-end and front-end, provided the environmental variables are set properly.
* Add new rows by filling the first (empty) row and press `Add row` to record it into the database
* The first two columns, `Last Name` and `First Name`, are **mandatory cells**. The button won't be activated until those cells are filled. A warning message will be displayed if some required fields are missing.
* You can inject mock rows to the database by using the `Add 1000 rows` admin button. All the entries will be unique. This is for testing large size databases, but you can decide to enter 1000 rows manually at your will (it might take a while though). 
* You can delete the whole database by using the `Delete rows` admin button. _Note: both Admin components are here for testing purposes and wouldn't be integrated in a production build_. It goes without saying, but **make sure you're working on an expendable database before using this button**.
* Edit existing rows by directly modifying the cells. Each update is sent to the database on leaving the input.
* Sort the table by clicking on the corresponding headers. Sorting goes both ascending and descending.
* Delete a row by clicking on the corresponding button.
* Navigate between pages by using the navigation tools on the bottom. You can also decide how many rows to display on each page.

## Testing
Still in the root directory:
### Unit and integration tests on the back-end: 
```bash
npm run test-server
```
### Unit and integration tests on the front-end:
```bash
npm run test-client-integration
```
### End-to-end test with Cypress:
```bash
npm run test-client-e2e
```
Wait for the Cypress window to open, then click `table_spec.ts`. This will start the end-to-end testing.
**The full app needs to be running in order to run cypress properly**

## Other commands
Run only the back-end:
```bash
npm run server
```
Run only the front-end:
```bash
npm run client
```
