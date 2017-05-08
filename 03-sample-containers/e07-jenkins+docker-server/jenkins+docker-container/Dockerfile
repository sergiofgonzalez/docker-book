# Version 0.0.1
FROM jenkins
MAINTAINER Sergio F. Gonzalez "sergio.f.gonzalez@gmail.com"
ENV REFRESHED_AT 2017-05-08

# Set user to root, install sudo, configure jenkens user as sudoer and install Docker
USER root
RUN apt-get -y update; apt-get install -y sudo
RUN echo "jenkins ALL=NOPASSWD: ALL" >> /etc/sudoers
RUN wget http://get.docker.com/builds/Linux/x86_64/docker-latest.tgz
RUN tar xvzf docker-latest.tgz
RUN mv docker/* /usr/bin/

# Set user to jenkins (needed to run jenkins correctly) and install Jenkins plugins
USER jenkins
RUN /usr/local/bin/install-plugins.sh junit git git-client ssh-slaves greenballs chucknorris ws-cleanup
