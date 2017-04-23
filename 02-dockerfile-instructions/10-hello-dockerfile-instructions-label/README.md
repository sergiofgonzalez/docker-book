# `LABEL` instruction
> adding key/value metadata to a Docker image

## Description
Use `LABEL` instruction to add metadata to a Docker image in the form of key/value pairs.

It is recommended to use a single `LABEL` instruction to all metadata to avoid creating multiple layers with each `LABEL` instruction received.

The key/value pairs can be later browsed using `docker inspect` command on the image.

```bash
$ sudo docker inspect sergiofgonzalez/label-container-img
```

Note that the labels will not be inherited by the container.

### Build Instructions
Type:
```bash
$ sudo docker build -t="sergiofgonzalez/label-container-img" .
```
