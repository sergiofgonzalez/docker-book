FROM sergiofgonzalez/redis-base
MAINTAINER Sergio F. Gonzalez "sergio.f.gonzalez@gmail.com"
ENV REFRESHED_AT 2017-05-08

# Start Redis server as replica, sending logs to volume defined on base
ENTRYPOINT [ "redis-server", "--protected-mode no", "--logfile /var/log/redis/redis-replica.log", "--slaveof redis-primary 6379" ]
