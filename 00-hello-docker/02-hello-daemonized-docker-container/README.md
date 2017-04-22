# 02 &mdash; Hello Daemonized Docker Container
> your first daemonized Docker container explained in detail

## Description
The following `run` command creats a *daemonized* Docker container from Ubuntu's latest official image:

```bash
# create an interactive Docker container
$ sudo docker run --name my-ubuntu-daemonized-container -d ubuntu /bin/sh -c "while true; do echo hello world; sleep 10; done"
```

The parameters mean the following:
+ `--name` &mdash; optional argument that lets you name your container
+ `-d` &mdash; detach the container to the background
+ `ubuntu` &mdash; use the latest official *Ubuntu* Docker image
+ `bin/sh -c "..."` &mdash; run the shell taking arguments from the string rather than from the stdin


You can also reattach to a daemonized container, but it won't let you interact with it (in this case, you will only be able to see the log message every 10 seconds)

```bash
# attach to the daemonized container
$ sudo docker attach my-ubuntu-container
```

After exiting the session the container will be stopped again.