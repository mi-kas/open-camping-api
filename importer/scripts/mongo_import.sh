#!/bin/bash
echo "Start import of seed data into mongodb"
mongoimport --collection=countries --file=scripts/countries.json --jsonArray --drop --uri="mongodb+srv://api:redJZkcjvJTJNIb7@camping-api.ft2dq.mongodb.net/camping-api?retryWrites=true&w=majority"
echo "Import of seed data done"

