CSV TO JSON  
=======================

A CSV to JSON convertor. Each row in the CSV file will represent one object and a file
with multiple rows will be converted to a list of objects.

Table of Contents
-----------------
- [Assumptions](#assumptions)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)


Assupmtions
-------------

- Postgres is installed
- Table is created
- Correct Credentials are set in the .env.example file

Getting Started
---------------

```bash
# Get the latest snapshot
git clone git@github.com:navroze/mini-exchange.git

cd csv-to-json
# Install NPM dependencies
npm install

# To view the report on the console
node app.js

# To test unit test cases
npm test
```

**Note:** I have provided an additional feature to seed the user data. Data can be seeded by running `node seed.js`. This will save you a lot of time to create the test data and test the application.




