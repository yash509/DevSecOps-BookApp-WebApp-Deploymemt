#!/bin/bash
set -e

# Pull the Docker image from Docker Hub
docker pull sholly333/bookapp-store:latest

# Run the Docker image as a container
docker run -dit -p 8082:80 sholly333/bookapp-store
