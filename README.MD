# Plenna medical service

This service is builded in order to manage the pacients, doctors and consultations of plenna pacients

## Index of Contents


1. [Enviroment Variables](#env-variables)
2. [Development Environment](#dev-environment)
3. [Endpoint Documentation](#end-documentation)
4. [Notes](#Notes)

## Environment Variables
<a name="env-variables"></a>

this is the list of the env variables for the project

```txt

DB_ACCESS_KEY=<DB_ACCESS_KEY>     # defines the mongo url that will be using for the project
PORT=<PORT>               # HTTP Port that the process will use
```

## Development Environment
<a name="dev-environment"></a>

In order to run the project locally, you need to clone if from github, after that you run the next commands:

- npm install # this will install all the node libraries and dependencies for the project.

- npm run start # this will start nodemon process and allows the user to run the project

## Endpoint Documentation
<a name="end-documentation"></a>

- All the endpoints and structure of that are available at the postman folder in the project as a postman collection.

## Notes
<a name="Notes"></a>

- the project was a pending docker integration that doesn't work completely, in order to test the project please run locally the project