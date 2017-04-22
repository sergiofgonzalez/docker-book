# 01-hello-interactive-docker-container
> your first interactive Docker container

## Description
The following `run` command creats a Docker container from Ubuntu's latest official image:

```bash
# create an interactive Docker container
$ sudo docker run --name my-ubuntu-container -i -t ubuntu /bin/bash
```

The parameters mean the following:
+ `--name` &mdash; optional argument that lets you name your container
+ `-i` &mdash; keeps STDIN open from the container, even when not attached to it
+ `-t` &mdash; assign a pseudo-tty to the container
+ `ubuntu` &mdash; use the latest official *Ubuntu* Docker image
+ `bin/bash` &mdash; run the *Bash* shell as the entry point for the container

An interactive container will be automatically stopped once you `exit` from the *Bash* shell.

Once stopped, you can restart it using `sudo docker start my-ubuntu-container`, but you will not get an interactive session into it. Thus if you want to interact again with it you will have to type:

```bash
# reattach to the interactive session inside the container
$ sudo docker attach my-ubuntu-container
```

After exiting the session the container will be stopped again.