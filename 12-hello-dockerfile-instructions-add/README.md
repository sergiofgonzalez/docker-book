# 12-hello-dockerfile-instructions-add
> adding files and directories from the build directory into the image

## Description
Use `ADD` instruction to copy a directory or file from the build environment to a directory within the container. If the destination doesn't exist, Docker will create the full path for the added file.

It's also interesting to note that if the file to copy is a tar archive, Docker will add the content of the archive *unpacked* in the container.


### Build Instructions
Type:
```bash
$ sudo docker build -t="sergiofgonzalez/add-container-img" .
```
### Run Instructions
Type:
```bash
# This will run bash in the container and will let you check the added files and directories
$ sudo docker run -i -t sergiofgonzalez/add-container-img
```

## Related Commands and Interactions
+ `COPY` &mdash; Add directories or files without performing any extra functionality
