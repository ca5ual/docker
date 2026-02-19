#!/bin/bash 

# Responsible for creating volumes and networks

source .env.network
source .env.volume

if [ "$(docker volume ls -q -f name=$VOLUME_NAME)" ]; then
  echo "The volume with the name $VOLUME_NAME already exists."
else
  docker volume create $VOLUME_NAME
  echo "The volume with the name $VOLUME_NAME was successfully created."
fi

if [ "$(docker network ls -q -f name=$NETWORK_NAME)" ]; then
  echo "The network with the name $NETWORK_NAME already exists."
else
  docker network create $NETWORK_NAME
  echo "The network with the name $NETWORK_NAME was successfully created."
fi