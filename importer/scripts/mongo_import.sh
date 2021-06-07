#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

echo "Start import of seed data into mongodb"
mongoimport --collection=countries --file=scripts/countries.json --jsonArray --drop --uri=$DB_URI
echo "Import of seed data done"

