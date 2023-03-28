## how to setup and connect to the database

1. Make sure you installed node on your device.\*\*

   [Node](https://nodejs.org/en/)

2. npm install (to install all needed packages)
3. SERVER PORTS: 3000, DATABASE PORT: 5432
   Postgres and pgadmin are used by containers.
   So, you need to poll the postgres (with port=5432) and pgadmin containers (with port:82 in localhost)

## environment variables used:

1. PORT=3000

2. POSTGRES_HOST=127.0.0.1
3. POSTGRES_DB=storeFront
4. POSTGRES_USER=azeez_141
5. POSTGRES_PASSWORD=password123

6. POSTGRES_DB_TEST=storeFront_test
7. ENV=dev

8. BCRYPT_SECRET=storeFront
9. saltRounds=10
10. TOKEN_SIGNATURE=storeFront

## IMPORTANT NOTES:

1.  If any test case fails then, tables will not be deleted which will affect the result of the second run of the test cases.
2.  To run the test cases, the ENV var must be set to 'test'.

### \*Enjoy The Project.
