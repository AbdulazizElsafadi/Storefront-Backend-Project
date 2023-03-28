## how to setup and connect to the database

1. Make sure you installed node on your device.\*\*

   [Node](https://nodejs.org/en/)

2. npm install (to install all needed packages)
3. SERVER PORTS: 3000, DATABASE PORT: 5432
   Postgres and pgadmin are used by containers.
   So, you need to poll the postgres (with port=5432) and pgadmin containers (with port:82 in localhost)

## environment variables used:

PORT=3000

POSTGRES_HOST=127.0.0.1
POSTGRES_DB=storeFront
POSTGRES_USER=azeez_141
POSTGRES_PASSWORD=password123

POSTGRES_DB_TEST=storeFront_test
ENV=dev

BCRYPT_SECRET=storeFront
saltRounds=10
TOKEN_SIGNATURE=storeFront

## IMPORTANT NOTES:

1.  If any test case fails then, tables will not be deleted.
2.  To run the test case the ENV var must be test.

### \*Enjoy The Project.
