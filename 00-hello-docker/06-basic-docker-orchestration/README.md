# 06 &mdash; Basic Docker Orchestration
> introducing Docker orchestration options

## Description

This section will discuss three tools that help build and orchestrate containers:
+ **Docker Compose** &mdash; for simple container orchestration
+ **Consul** &mdash; distributed, highly available service discovery that can be applied to Docker
+ **Swarm** &mdash; for orchestration and clustering of Docker containers

Prior to Docker 1.9, linking Docker containers consisted on inspecting the IP addresses assigned to containers and carefully orchestrate container binding. This worked perfectly well for small installations, but did not scale for clusters, autoscaling, etc. 

### Docker Compose
+ `docker-compose up` &mdash; starts the services interactively (i.e. the console will display the logs, pressing CTRL+C will stop the services) specified in the `docker-compose.yml` from where the command is launched.
+ `docker-compose up -d` &mdash; starts the services in a daemonized way.
+ `docker-compose ps` &mdash; lists all of the currently running services from the local `docker-compose.yml` file.
+ `docker-compose logs` &mdash; shows the logs from the currently running services from the local `docker-compose.yml` file.
+ `docker-compose logs -f` &mdash; shows and follows the logs from the currently running services from the local `docker-compose.yml` file.
+ `docker-compose help <command>` &mdash; shows the help page for a particular command
+ `docker-compose stop` &mdash; sends the stop signal to the currently running services.
+ `docker-compose kill` &mdash; sends the kill signal to forcefully stop the currently running services
+ `docker-compose start` &mdash; restart the services found in the local `docker-compose.yml` file
+ `docker-compose rm` &mdash; removes the services found in the local `docker-compose.yml` file

### Consul for Service Discovery
Service Discovery allows components providing or consuming services to find each other when they want to interact. Docker containers can register its running services with the Service Discovery tool (such as IP address and port) to allow interaction between services.

*Consul* is a service discovery tool that uses the [Raft](https://en.wikipedia.org/wiki/Raft_(computer_science)) consensus algorithm to require a quorum for writes. It features an HA, fault-tolerant key-value store and service catalog.

Services can register themselves with Consul and share that registration information in an highly available and distributed manner.