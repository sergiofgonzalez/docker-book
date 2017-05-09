FROM ubuntu:16.04
MAINTAINER Sergio F. Gonzalez "sergio.f.gonzalez@gmail.com"
ENV REFRESHED_AT 2017-05-08

# Install Redis BE and tools via custom Package Manager (to get latest version)
RUN apt-get -y update
RUN apt-get -y install software-properties-common python-software-properties
RUN add-apt-repository ppa:chris-lea/redis-server
RUN apt-get -y update
RUN apt-get -y install redis-server redis-tools

VOLUME [ "/var/lib/redis", "/var/log/redis" ]

EXPOSE 6379

# It does not feature either ENTRYPOINT or CMD because we won't run this image
# We will just build on top of it
CMD []
