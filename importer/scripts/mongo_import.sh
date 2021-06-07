#!/bin/bash
echo "Start import of seed data into mongodb"
mongoimport --collection=countries --file=scripts/countries.json --jsonArray --drop --uri=$1
echo "Import of seed data done"

