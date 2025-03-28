#!/bin/bash

# Define the container name and the database credentials
CONTAINER_NAME="DOCKER_CONTAINER_NAME"
POSTGRES_PASSWORD="DATABASE_PASSWORD"
POSTGRES_DB="DATABASE_NAME"
POSTGRES_USER="DATABASE_USER"
POSTGRES_PORT="DATABASE_PORT"

# Check if the container is already running
if [ $(docker ps -q -f name=$CONTAINER_NAME) ]; then
    echo "Container '$CONTAINER_NAME' is already running."
else
    # If the container is not running, check if it exists
    if [ $(docker ps -aq -f status=exited -f name=$CONTAINER_NAME) ]; then
        # If the container exists but is stopped, restart it
        echo "Container '$CONTAINER_NAME' exists but is stopped. Restarting..."
        docker start $CONTAINER_NAME
    else
        # If the container doesn't exist, run a new one
        echo "Starting a new PostgreSQL container..."
        docker run --name $CONTAINER_NAME -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD -e POSTGRES_DB=$POSTGRES_DB -e POSTGRES_USER=$POSTGRES_USER -p $POSTGRES_PORT:5432 -d postgres
    fi
fi

# Confirm that the container is running
echo "PostgreSQL container is now running on localhost:$POSTGRES_PORT"
