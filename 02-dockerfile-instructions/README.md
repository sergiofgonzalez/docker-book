# Docker Book &mdash; Dockerfile Instructions
> Examples on Dockerfile instructions


## 01-hello-dockerfile-instructions-cmd
Illustrates a use-case scenario for the `CMD` instruction, which runs a command after the container has been launched.

## 02-hello-dockerfile-instructions-entrypoint
Illustrates a use-case scenario for the `ENTRYPOINT` instruction, which specifies the default command for the container (it's *entrypoint* command).

## 03-hello-dockerfile-instructions-cmd-entrypoint
Illustrates a use-case scenario mixing both the `ENTRYPOINT` and `CMD` instruction to provide a default behavior for the container.

## 04-hello-dockerfile-instructions-workdir
Illustrates the usage of `WORKDIR` to establish the working directory for the container and therefore for the `ENTRYPOINT` and `CMD` instructions.

## 05-hello-dockerfile-instructions-env
Illustrates the usage of `ENV` to define environment variables that will be available for other subsequent instructions, as well as for the processes running in the container.

## 06-hello-dockerfile-instructions-user
Illustrates the usage of `USER` to establish the user the image should be run as.

## 07-hello-dockerfile-instructions-volume
Illustrates the usage of `VOLUME` to add a directory to a container that can be exposed outside of the container.

## 08-hello-dockerfile-instructions-add
Illustrates the usage of `ADD` instruction to copy (and uncompress) files and directories from the build environment to the container.

## 09-hello-dockerfile-instructions-copy
Illustrates the usage of `COPY` instruction to copy files and directories from the build environment to the container.

## 10-hello-dockerfile-instructions-label
Illustrates the usage of `LABEL` instruction to add metadata to a container image in the form of key/value pairs.

## 11-hello-dockerfile-instructions-stopsignal
Illustrates the usage of `STOPSIGNAL` instruction to configure the system call signal that will be sent to the container when you stop it using `docker run`.

## 12-hello-dockerfile-instructions-arg
Illustrates the usage of `ARG` instruction to define a configurable variable that can be used during the build phase, and overridden while using `docker build --build-arg` command.

## 13-hello-dockerfile-instructions-shell
Illustrates the usage of `SHELL` instruction to define default shell for the subsequent instructions and the container.

## 14-hello-dockerfile-instructions-healthcheck
Illustrates the usage of `HEALTHCHECK` instruction to checking the status of the applications running in the container.

## 15-hello-dockerfile-instructions-onbuild
Illustrates the usage of `ONBUILD` instruction to configure a trigger that is activated when an image is used as the basis for another image.

## 16-hello-dockerfile-instructions-run
Illustrates the usage of `RUN` instruction to execute a command on the image.

## 17-hello-dockerfile-instructions-expose
Illustrates the usage of `EXPOSE` instruction to tell Docker what ports the application running inside the container use.