# 10-hello-dockerfile-instructions-user
> specifying the user that the image should be run as

## Description
Use `USER` to specify the user that the image should be run as. You can specify also the group or gid using the syntax: `USER user:group`


The `USER` instruction can be easily overridden by passing the `-u` flag in the `docker run` command:
```bash
# This will override the USER instruction with `root`
$ sudo docker run -i -t -u root sergiofgonzalez/user-container-img
root
```

### Build Instructions
Type:
```bash
$ sudo docker build -t="sergiofgonzalez/user-container-img" .
```
### Run Instructions
Type:
```bash
# This will execute the default command (pwd) on the specified workdir
$ sudo docker run -i -t sergiofgonzalez/sergiofgonzalez/user-container-img
nobody
```

## Related Commands and Interactions
+ `CMD` &mdash; specifies a command to run when the container is launched.
+ `ENTRYPOINT` &mdash; specifies the default command when the container is launched.

