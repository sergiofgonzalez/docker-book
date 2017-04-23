# The `CMD` instruction
> the `CMD` instruction runs a command inside the container, when the container has launched

## Description
The `CMD` instruction is used to run a command inside the container, when the container has launched, pretty much in the same way that the `docker run` command does.

In the example, a container is created with a `CMD` instruction that tells the container to run the *bash* shell once it is launched. As a result, you won't have to include that command when running the container.

In the example below, once you use the run instructions you'll see how you get a shell prompt in the container that has been launched without including `/bin/bash` in the `docker run` command.

**Note**
The `CMD` instruction can be overridden specifying a command in the command line:
```bash
# instead of /bin/bash, ps will be executed
$ sudo docker run -i -t sergiofgonzalez/cmd-container-img /bin/ps -aux
```

### Build Instructions
Type:
```bash
$ sudo docker build -t="sergiofgonzalez/cmd-container-img" .
```
### Run Instructions
Type:
```bash
$ sudo docker run -i -t sergiofgonzalez/cmd-container-img
```

## Related Commands and Interactions
+ `RUN` &mdash; executes a command on the current image
+ `ENTRYPOINT` &mdash; specifies the default command to run when starting the container
