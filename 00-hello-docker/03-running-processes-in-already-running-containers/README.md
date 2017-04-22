# 03 &mdash; Running Processes in a Running Container
> running processes in already running containers

## Description
The following `run` command creats a *daemonized* Docker container from Ubuntu's latest official image:

```bash
# create a daemonized Docker container
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
