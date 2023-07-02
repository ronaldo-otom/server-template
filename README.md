# breederdao-exam
All variables that supposed to be in .env I hardcoded it for this particular exam

Endpoints:
AUTH
/auth/register -> Register by username and password
/auth/login -> Logging in by using your username and password and it will return 2 tokens [refresh and access]

AXIE
/axies/store-records -> It will fetch data from other source and save it to the database
/axies/get-all -> Get all records from Database and return via response
/axies/add -> Add an axie according to your information

Information needed to add:
id, name, stage, class, and current price


Changeable Variables under /utils/constant
TOKEN_SECRET 
MONGODB_URI

There is an issue regarding on current price in Axie Graphql, it produce an error when I tried to include "auction".

HOW TO RUN
Clone the repo and yarn install on root folder then "yarn dev" on terminal to run the program
