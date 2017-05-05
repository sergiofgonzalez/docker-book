# 05 &mdash; Basic Docker Network
> running processes in already running containers

## Description

Prior to Docker 1.9, linking Docker containers consisted on inspecting the IP addresses assigned to containers and carefully orchestrate container binding. This worked perfectly well for small installations, but did not scale for clusters, autoscaling, etc. 

From Docker 1.9, *Docker Networking* was introduced and now you can set up your own network through which containers can communicate. This networking mode is also integrated with *Docker Compose and Docker Swarm*.

To use this new functionality, you have to use:
```bash
# creates a bridge network called "app"
$ sudo docker network create app

# lists existing networks
$ sudo docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
b6b0755ff1fd        app                 bridge              local
6c1f0240cff3        bridge              bridge              local
a43e1e45fef0        host                host                local
67bf8da7bc13        none                null                local

# inspect the bridge "app"
$ sudo docker network inspect app
        "Created": "2017-05-05T12:26:07.34984713+02:00",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "172.18.0.0/16",
                    "Gateway": "172.18.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Containers": {},
        "Options": {},
        "Labels": {}
    }
]

# remove a docker network
$ sudo docker network rm app
```
*Note:*
+ We can see that the recently created network is a local, bridged network much like the prior `docker0` network.
+ No containers are currently running inside the network
+ In addition to bridge networks, which can span a single host, *Docker networking* can also span multiple hosts using *overlay networks*.

### Adding the Redis container to a Docker network

```bash

```