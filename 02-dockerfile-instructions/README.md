# Docker Book &mdash; Dockerfile Instructions
> collection of Dockerfile instructions with usage examples


## [`CMD` Instruction](./01-hello-dockerfile-instructions-cmd/)
The `CMD` instruction runs a command after the container has been launched.

## [`ENTRYPOINT` instruction](./02-hello-dockerfile-instructions-entrypoint/)
The `ENTRYPOINT` instruction specifies the default command for the container (its *entrypoint* command).

## [Using `ENTRYPOINT` and `CMD` together](./03-hello-dockerfile-instructions-cmd-entrypoint/)
A use-case scenario mixing both the `ENTRYPOINT` and `CMD` instruction to provide a default behavior for the container.

## [`WORKDIR` instruction](./04-hello-dockerfile-instructions-workdir/)
`WORKDIR` establishes the working directory for the container and, as a consequence, for the `ENTRYPOINT` and `CMD` instructions.

## [`ENV` instruction](./05-hello-dockerfile-instructions-env/)
`ENV` defines environment variables that will be available for other subsequent instructions, as well as for the processes running in the container.

## [`USER` instruction](./06-hello-dockerfile-instructions-user/)
`USER` establishes the user the image should be run as.

## [`VOLUME` instruction](./07-hello-dockerfile-instructions-volume/)
`VOLUME` adds a directory to a container that can be exposed outside of the container.

## [`ADD` instruction](./08-hello-dockerfile-instructions-add/)
`ADD` copies (and uncompresses) files and directories from the build environment to the container.

## [`COPY` instruction](./09-hello-dockerfile-instructions-copy/)
`COPY` is used to copy files and directories from the build environment to the container.

## [`LABEL` instruction](./10-hello-dockerfile-instructions-label/)
`LABEL` adds metadata to a container image in the form of key/value pairs.

## [`STOPSIGNAL` instruction](./11-hello-dockerfile-instructions-stopsignal/)
`STOPSIGNAL` configures the system call signal that will be sent to the container when you stop it using `docker run`.

## [`ARG` instruction](./12-hello-dockerfile-instructions-arg/)
`ARG` defines a configurable variable that can be used during the build phase, and overridden while using `docker build --build-arg` command.

## [`SHELL` instruction](./13-hello-dockerfile-instructions-shell/)
`SHELL` defines the default shell for the subsequent instructions and the container.

## [`HEALTHCHECK` instruction](./14-hello-dockerfile-instructions-healthcheck/)
`HEALTHCHECK` instruction is used to check the status of the applications running in the container.

## [`ONBUILD` instruction](./15-hello-dockerfile-instructions-onbuild/)
`ONBUILD` configures a trigger that is activated when an image is used as the basis for another image.

## [`RUN` instruction](./16-hello-dockerfile-instructions-run/)
`RUN` instruction executes a command on the image.

## [`EXPOSE` instruction](./17-hello-dockerfile-instructions-expose/)
Illustrates the usage of `EXPOSE` instruction to tell Docker what ports the application running inside the container use.