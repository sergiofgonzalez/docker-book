# 02 &mdash; Tips on Debugging the Image Creation Process
> debugging the image creation process

## Description
Illustrates how to debug the image creation process when the `Dockerfile` contains incorrect commands.

In the example, instead of installing the `nginx` module `ngin` is used instead, which causes the build process to fail.

When that happens, you can create a container from the latest successful state of the image and debug from there:
```bash
$ sudo docker images
EPOSITORY                TAG                 IMAGE ID            CREATED             SIZE
<none>                   <none>              567d6b058b8d        2 minutes ago      129 MB
...
$ sudo docker run -i -t 567d6b058b8d /bin/bash
```

After that, you can modify the `Dockerfile` and try again.
