# Version 0.0.1
FROM ubuntu:16.04
MAINTAINER Sergio F. Gonzalez "sergio.f.gonzalez@gmail.com"
ENV REFRESHED_AT 2017-09-16

RUN apt update
RUN apt install -y openjdk-8-jdk wget rsync ssh
RUN wget http://www.apache.org/dist/spark/spark-2.2.0/spark-2.2.0-bin-hadoop2.7.tgz
RUN tar xvzf spark-2.2.0-bin-hadoop2.7.tgz
RUN mkdir -p /usr/local/spark
RUN mv spark-2.2.0-bin-hadoop2.7 /usr/local/spark

ENV SPARK_HOME=/usr/local/spark/spark-2.2.0-bin-hadoop2.7

VOLUME ["/media/shared-spark"]
EXPOSE 7077

WORKDIR $SPARK_HOME

CMD tail -f $(./sbin/start-master.sh | cut -f5 -d" ")
