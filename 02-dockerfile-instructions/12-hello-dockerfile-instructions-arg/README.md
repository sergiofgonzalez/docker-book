# 16-hello-dockerfile-instructions-arg
> define variables that can be passed at build time to the image building process

## Description
Use `ARG` instruction to configure the variables that can be passed at build-time via the `docker build` command using the `--build-arg` flag.

The configured variables can be used in the subsequent Dockerfile instructions.

In the example, we use `ARG` to establish a default value for an environment variable:
```
ARG CONFIGURABLE_ENV_VAR=default-value
ENV CONTAINER_ENV_VAR=$CONFIGURABLE_ENV_VAR
```

Thus, when executing the container, we'll get:
```
CONTAINER_ENV_VAR=default-value
```

However, if you use 
```bash
$ sudo docker build --build-arg CONFIGURABLE_ENV_VAR=overridden-value -t="sergiofgonzalez/arg-container-img" .
```

then you'll get:
```
CONTAINER_ENV_VAR=overridden-value
```


### Build Instructions
To use the default value type:
```bash
$ sudo docker build -t="sergiofgonzalez/arg-container-img" .
```

and to override the value on the building phase:

```bash
$ sudo docker build --build-arg CONFIGURABLE_ENV_VAR=overridden-value -t="sergiofgonzalez/arg-container-img" .
```