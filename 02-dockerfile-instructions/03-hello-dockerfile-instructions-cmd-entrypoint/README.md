# Using `ENTRYPOINT` and `CMD` together
> using `CMD` and `ENTRYPOINT` to provide a default behavior for the entrypoint of a container.

## Description
By using `ENTRYPOINT` and `CMD` together you can provide the default behavior for a container's entrypoint.

In the example, a container is created with an `ENTRYPOINT` instruction that tells the container to run the `ls` command and `CMD` is used to provide the default command for the *entrypoint* as `-la` so that the default behavior when running the container is to execute `ls -la`.

This default behavior can be easily overridden by passing an argument in the `docker run` command:
```bash
# This will override the default command (ls -la) and execute ls --classify instead
$ sudo docker run -i -t sergiofgonzalez/default-cmd-container-img --classify
```

### Build Instructions
Type:
```bash
$ sudo docker build -t="sergiofgonzalez/default-cmd-container-img" .
```
### Run Instructions
Type:
```bash
# This will execute the default command (ls -la)
$ sudo docker run -i -t sergiofgonzalez/default-cmd-container-img
```

## Related Commands and Interactions
+ `RUN` &mdash; executes a command on the current image
+ `CMD` &mdash; specifies a command to run when the container is launched.
+ `ENTRYPOINT` &mdash; specifies the default command when the container is launched.

