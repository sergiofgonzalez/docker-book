# `WORKDIR` instruction
> establishing the working directory for a container and `ENTRYPOINT` and `CMD` instructions

## Description
Use `WORKDIR` to establish the working directory for a container and `ENTRYPOINT` and `CMD` commands.

In the example, a container is created with an `ENTRYPOINT` instruction that executes `pwd`. By using `WORKDIR`, we set the working directory for the *entrypoint* to `/var/log`. 


The `WORKDIR` can be easily overridden by passing the `-w` flag in the `docker run` command:
```bash
# This will override the WORKDIR instruction with `/usr`
$ sudo docker run -i -t -w /usr sergiofgonzalez/workdir-container-img
/usr
```

### Build Instructions
Type:
```bash
$ sudo docker build -t="sergiofgonzalez/workdir-container-img" .
```
### Run Instructions
Type:
```bash
# This will execute the default command (pwd) on the specified workdir
$ sudo docker run -i -t sergiofgonzalez/sergiofgonzalez/workdir-container-img
/var/log
```

## Related Commands and Interactions
+ `CMD` &mdash; specifies a command to run when the container is launched.
+ `ENTRYPOINT` &mdash; specifies the default command when the container is launched.

