# 00-useful-docker-scripts
> collection of useful docker scripts

## Description

+ `cleanup-containers.sh` &mdash; removes all the containers with `status=exited`
+ `cleanup-containers+volumes.sh` &mdash; removes all the containers and associated volumes with `status=exited`
+ `cleanup-dangling-imgs.sh` &mdash; removes allthe images with `dangling=true`


docker system prune --> comando para borrar toda la mierda de docker
docker system df --> comando para ver lo que ocupa la mierda de docker
yo en mi máquina de ovh lo voy a poner en un cron
el docker system prune
