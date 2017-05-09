# 04 &mdash; Basic Docker Commands
> running processes in already running containers

## Description

| Command                                  | Description                                                            |
|------------------------------------------|------------------------------------------------------------------------|
| `docker info`                            | displays general information about the Docker installation and runtime |
| `docker ps`                              | lists currently running Docker containers                              |
| `docker ps -a`                           | lists all Docker containers independently of their state               |
| `docker top [container]`                 | inspects the processes running in a daemonized container               |
| `docker stats [container1] [container2]` | displays general statistics (CPU/MEM/NET...) for a list of containers  |
| `docker exec`                            | runs a process inside an already running container (see [03 &mdash; Running Processes in a Running Container](../03-running-processes-in-already-running-containers/)) |
| `docker run`                             | sends commands to the *Docker engine* in order to start a container from an image |
| `docker stop [container]`                | stops a running container |
| `docker logs [container]`                | fetches the logs of a container (see [Seeing What's Happening Inside Our Container Using `docker logs`](#seeing-whats-happening-inside-our-container-using-docker-logs)) |
| `docker inspect [container]`             | etrieves all the information of a container (see [Finding Out All Information of a Container using `docker inspect`](#finding-out-all-information-of-a-container-using-docker-inspect)) |
| `docker rm [container]`                  | deletes a container (use `-f` to delete a running container) |
| `docker images`                          | lists available images on the local file system |
| `docker history [image]`                 | lists the steps and layers that make up the given image |
| `docker kill -s [signal] [container]`    | sends the given signal (e.g. HUP) to the container |


### Seeing What's Happening Inside Our Container Using `docker logs`

You can use `docker logs` to fetch the logs from a container.

```bash
# create a daemonized container that echoes some messages in stdout
$ sudo docker run --name my-ubuntu-daemonized-container -d ubuntu /bin/sh -c "while true; do echo hello world; sleep 10; done"
$ sudo docker logs my-ubuntu-daemonized-container
```

The command supports similar functionality much like what `tail` provides:
```bash
# tail the logs with -f
$ sudo docker logs -f my-ubuntu-daemonized-container
```

And you can prefix the fetched log lines with timestamps using `-t`:
```bash
# tail the logs with -ft to prefix entries with the timestamp
$ sudo docker logs -ft my-ubuntu-daemonized-container
```



The following `run` command creats a *daemonized* Docker container from Ubuntu's latest official image:

```bash
# create an interactive Docker container
$ sudo docker run --name my-ubuntu-daemonized-container -d ubuntu /bin/sh -c "while true; do echo hello world; sleep 10; done"
```

In this running container, we can use the `docker exec` command to run processes in that container such as:
```bash
# create a file in the running container
$ sudo docker exec my-ubuntu-daemonized-container touch /etc/some_new_config_file
```

This approach can also be used to create an interactive shell session in a daemonized container:
```bash
$ sudo docker exec my-ubuntu-daemonized-container -it /bin/bash
```

### Finding Out All Information of a Container using `docker inspect`

You can use `docker inspect [container]` to retrieve a *JSON* document with all the information related to the given container. The command allows you to filter specific information using the `--format` flag:

For example, to retrieve the value of the key `Running` inside the `State` object, you'd use:
```bash
$ sudo docker inspect --format="{{ .State.Running }}" my-ubuntu-daemonized-container
```

To retrieve the IP Address you'd use:
```bash
$ sudo docker inspect --format="{{ .NetworkSettings.IPAddress }}" my-ubuntu-daemonized-container
```

The format can be used with multiple containers and contain several entries in the format:
```bash
$ sudo docker inspect --format="{{ .Name }} {{ .State.Running }}" my-ubuntu-daemonized-container my-ubuntu-interactive-container
```

Below is JSON document returned by a `docker inspect` command:
```json
[
    {
        "Id": "2376b9f8c80c83772f6305434617af38fa48fce9dd94917a980891cec0c1fa79",
        "Created": "2017-04-22T20:11:00.548265654Z",
        "Path": "/bin/sh",
        "Args": [
            "-c",
            "while true; do echo 2017-04-22T22:10:56+02:00 hello world; sleep 10; done"
        ],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 6954,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2017-04-22T20:17:41.327972476Z",
            "FinishedAt": "2017-04-22T20:15:06.763535742Z"
        },
        "Image": "sha256:6a2f32de169d14e6f8a84538eaa28f2629872d7d4f580a303b296c60db36fbd7",
        "ResolvConfPath": "/var/lib/docker/containers/2376b9f8c80c83772f6305434617af38fa48fce9dd94917a980891cec0c1fa79/resolv.conf",
        "HostnamePath": "/var/lib/docker/containers/2376b9f8c80c83772f6305434617af38fa48fce9dd94917a980891cec0c1fa79/hostname",
        "HostsPath": "/var/lib/docker/containers/2376b9f8c80c83772f6305434617af38fa48fce9dd94917a980891cec0c1fa79/hosts",
        "LogPath": "/var/lib/docker/containers/2376b9f8c80c83772f6305434617af38fa48fce9dd94917a980891cec0c1fa79/2376b9f8c80c83772f6305434617af38fa48fce9dd94917a980891cec0c1fa79-json.log",
        "Name": "/my-ubuntu-daemonized-container",
        "RestartCount": 0,
        "Driver": "aufs",
        "MountLabel": "",
        "ProcessLabel": "",
        "AppArmorProfile": "",
        "ExecIDs": null,
        "HostConfig": {
            "Binds": null,
            "ContainerIDFile": "",
            "LogConfig": {
                "Type": "json-file",
                "Config": {}
            },
            "NetworkMode": "default",
            "PortBindings": {},
            "RestartPolicy": {
                "Name": "no",
                "MaximumRetryCount": 0
            },
            "AutoRemove": false,
            "VolumeDriver": "",
            "VolumesFrom": null,
            "CapAdd": null,
            "CapDrop": null,
            "Dns": [],
            "DnsOptions": [],
            "DnsSearch": [],
            "ExtraHosts": null,
            "GroupAdd": null,
            "IpcMode": "",
            "Cgroup": "",
            "Links": null,
            "OomScoreAdj": 0,
            "PidMode": "",
            "Privileged": false,
            "PublishAllPorts": false,
            "ReadonlyRootfs": false,
            "SecurityOpt": null,
            "UTSMode": "",
            "UsernsMode": "",
            "ShmSize": 67108864,
            "Runtime": "runc",
            "ConsoleSize": [
                0,
                0
            ],
            "Isolation": "",
            "CpuShares": 0,
            "Memory": 0,
            "NanoCpus": 0,
            "CgroupParent": "",
            "BlkioWeight": 0,
            "BlkioWeightDevice": null,
            "BlkioDeviceReadBps": null,
            "BlkioDeviceWriteBps": null,
            "BlkioDeviceReadIOps": null,
            "BlkioDeviceWriteIOps": null,
            "CpuPeriod": 0,
            "CpuQuota": 0,
            "CpuRealtimePeriod": 0,
            "CpuRealtimeRuntime": 0,
            "CpusetCpus": "",
            "CpusetMems": "",
            "Devices": [],
            "DiskQuota": 0,
            "KernelMemory": 0,
            "MemoryReservation": 0,
            "MemorySwap": 0,
            "MemorySwappiness": -1,
            "OomKillDisable": false,
            "PidsLimit": 0,
            "Ulimits": null,
            "CpuCount": 0,
            "CpuPercent": 0,
            "IOMaximumIOps": 0,
            "IOMaximumBandwidth": 0
        },
        "GraphDriver": {
            "Name": "aufs",
            "Data": null
        },
        "Mounts": [],
        "Config": {
            "Hostname": "2376b9f8c80c",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
            ],
            "Cmd": [
                "/bin/sh",
                "-c",
                "while true; do echo 2017-04-22T22:10:56+02:00 hello world; sleep 10; done"
            ],
            "Image": "ubuntu",
            "Volumes": null,
            "WorkingDir": "",
            "Entrypoint": null,
            "OnBuild": null,
            "Labels": {}
        },
        "NetworkSettings": {
            "Bridge": "",
            "SandboxID": "ae121f4db9e02afadf82e5b61e2a1dccd71d6248dc19b79d7ca9f1f5f8c9b77a",
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "Ports": {},
            "SandboxKey": "/var/run/docker/netns/ae121f4db9e0",
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "b2ab46d6688d064b30097afb233bdd617c9425f68c72704c6c69e581749d1ddc",
            "Gateway": "172.17.0.1",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "IPAddress": "172.17.0.2",
            "IPPrefixLen": 16,
            "IPv6Gateway": "",
            "MacAddress": "02:42:ac:11:00:02",
            "Networks": {
                "bridge": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": null,
                    "NetworkID": "b9ab981f6be22259e58389e8c171bac36e042dd7c658e8b2b95561f8bed7a07e",
                    "EndpointID": "b2ab46d6688d064b30097afb233bdd617c9425f68c72704c6c69e581749d1ddc",
                    "Gateway": "172.17.0.1",
                    "IPAddress": "172.17.0.2",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "MacAddress": "02:42:ac:11:00:02"
                }
            }
        }
    }
]
```