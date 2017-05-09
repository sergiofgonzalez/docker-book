FROM ubuntu:16.04
MAINTAINER Sergio F. Gonzalez "sergio.f.gonzalez@gmail.com"
ENV REFRESHED_AT 2017-05-08

# Install logstash from elastic search
RUN apt-get -y update
RUN apt-get -y install wget
RUN wget -O - http://packages.elasticsearch.org/GPG-KEY-elasticsearch | apt-key add -
RUN echo 'deb http://packages.elasticsearch.org/logstash/1.5/debian stable main' > /etc/apt/sources.list.d/logstash.list
RUN apt-get -y update
RUN apt-get -y install logstash default-jdk

ADD logstash.conf /etc/

WORKDIR /opt/logstash

ENTRYPOINT [ "bin/logstash" ]
CMD [ "--config=/etc/logstash.conf" ]
