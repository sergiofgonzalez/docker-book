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

### Starting a container in a Docker network

To add a container to an existing network use:

```bash
$ sudo docker run -d --network=${docker-network-name} --name ${container-name} ${image-name}
```

For example:
```bash
$ sudo docker run -d --network=app --name redis-db sergiofgonzalez/redis-ubuntu
```

Once successfully started, you can use `inspect` to check that the container has been added to the network.
In the following example, the `app` network features two containers `redis-db` and `express-app`. The `express-app` is a Node.js *Express* based application that needs a live connection to a *Redis* key-value store backend.
Inside the *Docker network*, the *Express* application configures such connection using the name `redis-db` rather than its IP address. 

```bash
$ sudo docker network inspect app
[
    {
        "Name": "app",
        "Id": "c958fd8313e98a82984831e17c02ecb0ea3863d8ea053c043843e0ef12d8eafe",
        "Created": "2017-05-08T08:30:58.949783878+02:00",
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
        "Containers": {
            "3ab9a30ddc66782f092713a1f248da795e0dcc58e480361a41b17240bd5b281a": {
                "Name": "redis-db",
                "EndpointID": "02fd74bac5e7cf72df09a065f1ef7866d32628f4e796f3c0f4853e30c94be090",
                "MacAddress": "02:42:ac:12:00:02",
                "IPv4Address": "172.18.0.2/16",
                "IPv6Address": ""
            },
            "f4964833f82f6d3b651e973285272253d6a50e61ea9f4c060995ddc5b97d7a0e": {
                "Name": "express-app",
                "EndpointID": "575398335c2ec3ce1bf46caf6599c9c62ab50a88f49981da8508d2aa5d2a3b79",
                "MacAddress": "02:42:ac:12:00:03",
                "IPv4Address": "172.18.0.3/16",
                "IPv6Address": ""
            }
        },
        "Options": {},
        "Labels": {}
    }
]
```

### Connecting a running container to a Docker network

You can also use the `docker connect` command to add an already running container to a network:

```bash
$ sudo docker network connect ${docker-network} ${container-name}
```

For example, for a network `app` and container `redis-db2`:
```bash
$ sudo docker network connect app redis-db2
```

### Disconnecting a container from a Docker network

You can also use the `docker disconnect` command to add an already running container to a network:

```bash
$ sudo docker network disconnect ${docker-network} ${container-name}
```

For example, for a network `app` and container `redis-db2`:
```bash
$ sudo docker network disconnect app redis-db2
```