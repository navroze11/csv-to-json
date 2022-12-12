CSV TO JSON  
=======================

A CSV to JSON convertor. Each row in the CSV file will represent one object and a file
with multiple rows will be converted to a list of objects.

Table of Contents
-----------------
- [Assumptions](#assumptions)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)

Swagger
-------------
The swagger UI for the api can be found [here](#localhost:8080/api-docs).

Assupmtions
-------------

- Postgres is installed.
- Table is created.
- Correct Credentials are set in the .env file

Getting Started
---------------

```bash
# Get the latest snapshot
git clone git@github.com:navroze11/csv-to-json.git

# navigate to folder
cd csv-to-json

# Install NPM dependencies
npm install

#navigate to src path
cd src/

# To start the server
npm start

# To test unit and integration tests
npm test
```

**Note:** I have provided an additional feature to seed the user data. 
Data can be seeded by running `node seed.js`. This will save you a lot of time to create the test data and test the 
application. The number of users can be configured by passing a number as a parameter to
the `seedUsers()` function.


Project Structure
-----------------

| Name              | Description                                                  |
|-------------------|--------------------------------------------------------------|
| src               | All source code resides in this folder.                      |
| test/             | Unit and integration tests for the project.                  |                       |
| src/config        | All configuration for the project.                           |                       |
| src/helper        | Core logic from converting csv to json and storing data.     |                       |
| src/models        | Validator for check json structure.                          |                       |
| .env.example      | All environment variables.                                   |
| .eslintrc         | Rules for eslint linter.                                     |
| .gitignore        | Folder and files ignored by git.                             |
| app.js            | The main application file. Execution starts from here.       |
| package.json      | NPM dependencies.                                            |
| package-lock.json | Contains exact versions of NPM dependencies in package.json. |



