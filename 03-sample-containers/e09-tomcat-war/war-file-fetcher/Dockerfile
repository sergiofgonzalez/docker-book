FROM ubuntu:16.04
MAINTAINER Sergio F. Gonzalez "sergio.f.gonzalez@gmail.com"
ENV REFRESHED_AT 2017-05-08

# Install wget tool
RUN apt-get -y update
RUN apt-get -y install wget

# Create volume that will hold the fetched war
VOLUME [ "/var/lib/tomcat7/webapps/" ]

# Establish Tomcat 7 webapps dir as the working dir
WORKDIR /var/lib/tomcat7/webapps/


# Run wget
ENTRYPOINT [ "wget" ]
CMD [ "-?" ]
