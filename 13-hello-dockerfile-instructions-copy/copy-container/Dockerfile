# Version 0.0.1
FROM ubuntu:16.04
MAINTAINER Sergio F. Gonzalez "sergio.f.gonzalez@gmail.com"
ENV REFRESHED_AT 2017-01-25

# Add file
COPY disclaimer.md /opt/my-app/DISCLAIMER.md

# Add and uncompress
COPY hello-files.tgz /tmp/info/hello/

ENTRYPOINT ["/bin/bash"]
