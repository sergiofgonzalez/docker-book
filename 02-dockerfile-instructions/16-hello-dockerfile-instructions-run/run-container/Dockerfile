# Version 0.0.1
FROM ubuntu:16.04
MAINTAINER Sergio F. Gonzalez "sergio.f.gonzalez@gmail.com"
ENV REFRESHED_AT 2017-01-25

RUN apt-get -qq update; apt-get install -y vim
RUN ["mkdir",  "-p", "/tmp/custom-dir"]

ENTRYPOINT ["vi", "/etc/passwd"]
