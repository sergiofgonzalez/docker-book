# `HEALTHCHECK` instruction
> configure a healthcheck command to verify that a container is working correctly

## Description
Use the `HEALTHCHECK` instruction to configure a command to verify that the application running in the container is working as expected. For example, you can use it to verify that a web server is correctly serving the web pages.

You will be able to see the healt status of your container when using `docker ps` and also running
```bash
$ sudo docker inspect --format '{{.State.Health.Status}}' health_checked_container
unhealthy
```

You can have a look at the log of health checks running:
```bash
$ sudo docker inspect --format '{{range .State.Health.Log}} {{.ExitCode}} {{.Output}} {{end}}' health_checked_container
 1 /bin/sh: 1: curl: not found
  1 /bin/sh: 1: curl: not found
  1 /bin/sh: 1: curl: not found
  1 /bin/sh: 1: curl: not found
  1 /bin/sh: 1: curl: not found
```

You can disable any health checks inherited in any base images with the instruction:
```
HEALTHCHECK NONE
```

### Build Instructions
To use the default value type:
```bash
$ sudo docker build -t="sergiofgonzalez/healthcheck-container-img" .
```

### Run Instructions
Type:
```bash
$ sudo docker run --name health_checked_container -d sergiofgonzalez/healtcheck-container-img 
```
