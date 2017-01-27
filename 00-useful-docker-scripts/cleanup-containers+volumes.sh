#!/bin/bash

# docker ps -a -q -f status=exited
# list all the containers, display only containerid, filtered

# docker rm -v 
# Remove containers and associated volumes

echo Removing containers whose status=exited
docker rm -v $(docker ps -a -q -f status=exited)