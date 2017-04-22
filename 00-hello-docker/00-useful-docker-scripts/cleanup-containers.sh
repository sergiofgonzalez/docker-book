#!/bin/bash

# docker ps -a -q -f status=exited
# list all the containers, display only containerid, filtered

# docker rm 
# Remove containers

echo Removing containers whose status=exited
docker rm $(docker ps -a -q -f status=exited)