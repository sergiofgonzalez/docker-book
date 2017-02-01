#!/bin/bash

# docker images -q -f
# list image ids filtered

# docker rmi
# Remove images

echo Removing images with dangling=true
docker rmi $(docker images -q -f "dangling=true")