# Version 0.0.1
FROM ubuntu:16.04
MAINTAINER Sergio F. Gonzalez "sergio.f.gonzalez@gmail.com"
ENV REFRESHED_AT 2017-01-25

RUN apt-get -qq update
RUN apt-get install -y nginx
RUN echo 'Hi, I am in your NGINX running inside a container' \
    > /var/www/html/index.html
EXPOSE 80

ENTRYPOINT ["/usr/sbin/nginx"]
CMD ["-g",  "daemon off;"]

# Execute curl on localhost and return 1 if the command fails
HEALTHCHECK --interval=10s --timeout=1m --retries=5 \
 CMD curl http://localhost || exit 1
