# Version 0.0.1
FROM ubuntu:16.04
MAINTAINER Sergio F. Gonzalez "sergio.f.gonzalez@gmail.com"
ENV REFRESHED_AT 2017-01-25

RUN apt-get -qq update; apt-get install -y apache2
RUN ["mkdir",  "-p", "/var/lock/apache2"]

ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_LOG_DIR /var/log/apache2
ENV APACHE_LOCK_DIR /var/lock/apache2

ONBUILD ADD . /var/www/html

EXPOSE 80


ENTRYPOINT ["/usr/sbin/apache2"]
CMD ["-D",  "FOREGROUND"]
