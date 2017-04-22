# 00 &mdash Some Useful Docker Scripts
> a collection of Docker scripts for house-keeping tasks

## Description

The directory contains the following scripts:

+ `cleanup-containers.sh` &mdash; removes all the containers with `status=exited`
+ `cleanup-containers+volumes.sh` &mdash; removes all the containers and associated volumes with `status=exited`
+ `cleanup-dangling-imgs.sh` &mdash; removes allbthe images with `dangling=true`

In the latests versions of Docker, the following interesting commands have also been enabled:
+ `docker system df` &mdash; display all the storage taken by Docker images and containers
+ `docker system prune` &mdash; purges all storage that is not currently used by Docker

