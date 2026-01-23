#!/bin/bash

MONGO_DB_IMAGE="mongodb/mongodb-community-server"
MONGO_DB_TAG="7.0-ubuntu2204"
source .env.db

# Key-value credentials
ROOT_USER="root-user"
ROOT_PASSWORD="root-password"

# Connectivity 
source .env.network
LOCALHOST_PORT=27017
CONTAINER_PORT=27017

# Storage
source .env.volume
VOLUME_CONTAINER_PATH="/data/db" 

source setup.sh

if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
  echo "The container with the name $CONTAINER_NAME is already exists".
  echo "Stop container to remove: docker kill $CONTAINER_NAME"
  exit 1
fi

docker run -d --rm --name $CONTAINER_NAME \
    -e MONGODB_INITDB_ROOT_USERNAME=$ROOT_USER \
    -e MONGODB_INITDB_ROOT_PASSWORD=$ROOT_PASSWORD \
    -e KEY_VALUE_DB=$KEY_VALUE_DB \
    -e KEY_VALUE_USER=$KEY_VALUE_USER \
    -e KEY_VALUE_PASSWORD=$KEY_VALUE_PASSWORD \
    -p $LOCALHOST_PORT:$CONTAINER_PORT \
    -v $VOLUME_NAME:$VOLUME_CONTAINER_PATH \
    -v ./db-config/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro \
    --network $NETWORK_NAME \
    $MONGO_DB_IMAGE:$MONGO_DB_TAG
