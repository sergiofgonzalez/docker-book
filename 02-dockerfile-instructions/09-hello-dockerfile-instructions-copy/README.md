# `COPY` instruction
> copying files and directories from the build directory into the image

## Description
Use `COPY` instruction to copy a directory or file from the build environment to a directory within the container. If the destination doesn't exist, Docker will create the full path for the added file.

No extra functionality (like decompressing, etc.) is performed by the `COPY` instruction.

### Build Instructions
Type:
```bash
$ sudo docker build -t="sergiofgonzalez/copy-container-img" .
```
### Run Instructions
Type:
```bash
# This will run bash in the container and will let you check the added files and directories
$ sudo docker run -i -t sergiofgonzalez/copy-container-img
nobody
```

## Related Commands and Interactions
+ `ADD` &mdash; Add directories or files performing extra functionality like the extraction of *tar* archives.
