# `ENV` instruction
> setting environment variables in your container

## Description
Use `ENV` to set environment variables in your container during the image build process. The variables defined will available for subsequent Dockerfile instructions, as well as for the processes running within the container.


You can also define environment variables with the `-e` flag of the `docker run` command:
```bash
$ sudo docker run -i -t -e "PROGRAM_VERSION=0.0.1" --entrypoint env /usr sergiofgonzalez/env-container-img
/usr
```

### Build Instructions
Type:
```bash
$ sudo docker build -t="sergiofgonzalez/env-container-img" .
```
### Run Instructions
Type:
```bash
# This will execute the default command (pwd) on the specified workdir
$ sudo docker run -i -t sergiofgonzalez/sergiofgonzalez/env-container-img
someValue mysql 3306
```
