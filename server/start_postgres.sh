#!/bin/bash

# Check if the PostgreSQL container is already running
if [ "$(docker ps -q -f name=postgres)" ]; then
    echo "PostgreSQL container is already running."
else
    # Check if the PostgreSQL image exists
    if ! docker images -q postgres:latest > /dev/null; then
        echo "PostgreSQL image not found. Pulling image..."
        docker pull postgres:latest
    fi

    # Start PostgreSQL container
    echo "Starting PostgreSQL container..."
    docker-compose up -d
fi

