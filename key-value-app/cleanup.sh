#!/bin/bash

source .env.network
source .env.volume
source .env.db

if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
  docker kill $CONTAINER_NAME # && docker rm $CONTAINER_NAME
else
  echo "The container with the name $CONTAINER_NAME doesn't exist. Skip removing"
fi

if [ "$(docker volume ls -q -f name=$VOLUME_NAME)" ]; then
  docker volume rm $VOLUME_NAME
else
  echo "The volume doesn't exist. Skip removing"
fi

if [ "$(docker network ls -q -f name=$NETWORK_NAME)" ]; then
  docker network rm $NETWORK_NAME
else
  echo "The network doesn't exist. Skip removing"
fi