FROM sergiofgonzalez/redis-base
MAINTAINER Sergio F. Gonzalez "sergio.f.gonzalez@gmail.com"
ENV REFRESHED_AT 2017-05-08

# Start Redis sending logs to a volume defined on redis-base
ENTRYPOINT [ "redis-server", "--protected-mode no", "--logfile /var/log/redis/redis-server.log" ]
