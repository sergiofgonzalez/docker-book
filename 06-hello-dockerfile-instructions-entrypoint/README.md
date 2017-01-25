# 06-hello-dockerfile-instructions-entrypoint
> the `ENTRYPOINT` instruction specifies the default command to run when starting the container

## Description
The `ENTRYPOINT` instruction is used to specify the default command to run when starting the container, so that it is not needed to include it as part of the `docker run`.
When specifying `ENTRYPOINT`, additional commands passed with `docker run` will end up being passed to the `ENTRYPOINT` command.

In the example, a container with *NGINX* installed on it is created, and `ENTRYPOINT` is used to make `usr/sbin/nginx` the entrypoint for the container.

Because of that, when running the container, you'll be concerned only with the parameters to be passed to the *entrypoint*;
```bash
# no need to invoke `nginx`, the "-g daemon off;" will be passed to entrypoint
$ sudo docker run -d -p 8080:80 sergiofgonzalez/entrypoint-container-img -g "daemon off;"
$ url http://localhost:8080
Hi, I am in your NGINX running inside a container
```

**Note**
+ The `ENTRYPOINT` instruction is supposed to be overridden by the `--entrypoint` flag in the `docker run`command, but i couldn't make it work:
```bash
$ sudo docker run -i -t sergiofgonzalez/entrypoint-container-img --entrypoint "/bin/bash"
nginx: invalid option: "-"
```

+ You can use `ENTRYPOINT` with `CMD` to provide a default behavior for the container (see next 07-hello-dockerfile-instructions-cmd-entrypoint)

### Build Instructions
Type:
```bash
$ sudo docker build -t="sergiofgonzalez/entrypoint-container-img" .
```
### Run Instructions
Type:
```bash
$ sudo docker run -d -p 8080:80 sergiofgonzalez/entrypoint-container-img -g "daemon off;
```

## Related Commands and Interactions
+ `RUN` &mdash; specifies a command to run when the container is launched. Can be used with `ENTRYPOINT` to provide a default behavior.
+ `CMD` &mdash;
