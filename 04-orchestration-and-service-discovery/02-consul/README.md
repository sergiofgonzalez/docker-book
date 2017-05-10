# 02 &mdash; Service Discovery with Consul
> setting up a HA, fault-tolerant service discovery tool with Consul

## Description
We'll run distributed Consul inside Docker containers. We're then going to register services from Docker containers to Consul and query that data from other Docker containers. We'll be doing this across multiple Docker hosts.


+ Create a Docker image for the Consul service
+ Build three hosts running Docker and then run Consul on each (this illustrates how resiliency and failover works with Consul).
+ Build services that we'll register with Consul and then query that data from another service


### Running a Consul cluster in Docker
**in-progress**
Consul is a distributed service, so we'd normally create 3+ hosts to run in separate data centers or cloud regions.
To simulate this we can:
+ Create three hosts with a Docker daemon to run Consul: larry, curly and moe.
+ Each host features Ubuntu 16.04 and the Docker daemon and the consul image `sergiofgonzalez/consul`.
+ On each host we're going to run a Docker container with that image.
+ We will bind the services with $PUBLIC_IP



## Run Instructions
n/a