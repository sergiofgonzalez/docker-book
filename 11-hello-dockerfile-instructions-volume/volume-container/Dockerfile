# Version 0.0.1
FROM ubuntu:16.04
MAINTAINER Sergio F. Gonzalez "sergio.f.gonzalez@gmail.com"
ENV REFRESHED_AT 2017-01-25

# These directories will be created inside the container
VOLUME ["/opt/custom-dir", "/data"]

# Now we put some data in them to check that you can access them from the outside if mapped
RUN echo 'Hi, I am message living in your container' \
    > /data/hello.txt
ENTRYPOINT ["/bin/bash"]
