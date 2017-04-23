# `STOPSIGNAL` instruction
> set the system call signal that will be sent when the container is stopped

## Description
Use `STOPSIGNAL` instruction to configure the call signal that will be sent to the container when it is stopped by the `docker stop` command.

This signal can be a valid number from the kernel syscall table, or a signal name like `SIGKILL`.


### Build Instructions
Type:
```bash
$ sudo docker build -t="sergiofgonzalez/stopsignal-container-img" .
```
