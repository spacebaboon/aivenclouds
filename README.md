# Aiven Clouds

## Overview

Full stack project to list available Aiven clouds.
Clouds can be filtered and sorted by name, region, provider and distance.
Distance is calculated based on user's geolocation.

## Tech stack

Front end in React with Typescript.
Back end in Python using Flask.
End-to-end tests with Cypress.

### Front-end dependencies

material-ui: UI component library based on Material Design
data-grid: data table rendering
nock: network mocking
create-react-app: projct staffolding
react-geolocated: easy geo location handling
react-testing-library: far superior to Enzyme, IMHO

## Development / implementation notes

I favoured using existing frameworks, tools and dependencies, for speed of development. While end-to-end tests should cover the essential user functionality, this also means I don't need to exhaustatively test these components, as their own projects are well tested.

### Back-end

I haven't written Python for many years, which is probably clear from the project! So I may have chosen frameworks badly, or not written the most stylish code. Hey, at least I chose Python 3.

Flask seemed a good choice to serve the back end.
CORS and caching support is easily available.
Doing all possible data processing and caching the endpoint means less strain on production API, and means a more consistent front-end performance, than doing data processing in the FE, where the device capabilities will vary to a large degree.

The app runs in development or production mode, via a parameter. See running instructions below.
In production mode, the live Aiven API is called. In development mode, a copy of the data is read. You probably don't want to hit production APIs in all test runs, and they might not be available in some test environments.

### Front-end

Typescript gives a project more robust code, with fewer errors, and a more helpful API experience, with improved autocomplete. It also removes the need to do certain parameter checking, or testing, as, for example it can remove the possibility for a parameter to be null, or can enforce a minimum array size. It does take slightly longer to write, and has a learning curve, but especially for team work, I think the benefits hugely outweigh the cost.

I used functional components and hooks, as I find this a more intuitive, powerful approach than class components, and I think this is the future direction of React.

`Geolocation`: I wrote this as a generic wrapper component, so it could be reused around any components which need geolocation data. It uses `React.cloneElement()` to add the coordinate props to the child components.
In this implementation, an error message is shown when the user denies the location to be accessed. But with a little more time, I would have implemented the location and hence distance from the clouds just being unknown.

`CloudTable.test.tsx`: I have commented a line out, but wanted to mention it, as it shows a cool new feature of React Testing Library.
`screen.logTestingPlaygroundURL()` will console log a URL with the component's markup serialised. This takes you to a Testing Playground page showing the component, which you can click around, and which gives you selectors for any of those elements, and another pane where you can type in selectors and see the outcome highlighted in your component. This saves a lot of trial and error in trying to find the right selectors for your tests.
https://twitter.com/kentcdodds/status/1316044932327469056

### Cypress testing

I had trouble with the requirement for the browser to ask permission to access the geolocation. As a result, the tests sometimes fail for me. This is currently an open issue on Cypress' Github page:
https://github.com/cypress-io/cypress/issues/2671
However, I think end-to-end browser automation testing is very good to have in a project, and wanted to at least show you how I would approach this part of testing, and what it can offer that unit testing cannot.

## Incomplete parts

I was not able to write the data filtering in time. The data in the table should be able to be filtered by region and provider, and possibly distance, with selectable filters for distance ranges, e.g. under 1000km, 1000 - 10000km, etc.
The approach I would have taken is to have a filter section to the left of the table, with a sub section for each type of filter, and a checkbox for each value to select. This link shows an example of this pattern.
http://ui-patterns.com/patterns/TableFilter/examples/242
In terms of the front-end components, CloudList loads the data from the back-end and passes it to CloudTable. I would write an additional component, CloudFilter, which would handle these checkboxes, and pass the matching data subset to CloudFilter, which would not need to change.
The back-end would need to provide a list of the distinct values for these filters, this would be returned as an additional section in the JSON response, e.g. filterRanges. These filter values should be calculated by the BE from the data, and dynamically rendered in the FE to reduce coupling.

## Installation / running

From the base directory

Back end:
`cd backend`
`pipenv install` (first time only)
`./test.sh`
`./start.sh`: run in dev mode. serves hard-coded data.
`./start.sh production`: run in prod mode. hits live API.

Front end:
`cd frontend`
`yarn install`
`yarn test`
`yarn run`

Cypress:
Ensure both front and back ends are running first.
`cd cypress`
`yarn test`

site is available at
http://localhost:3000/

back-end API is served at
http://localhost:5000/cloudlist
http://localhost:5000/status

## Attributions

https://www.smashingmagazine.com/2020/06/rest-api-react-fetch-axios/

