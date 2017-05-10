FROM ubuntu:16.04
MAINTAINER Sergio F. Gonzalez "sergio.f.gonzalez@gmail.com"
ENV REFRESHED_AT 2017-05-10

RUN apt-get -y update
RUN apt-get -y install curl unzip

ADD https://releases.hashicorp.com/consul/0.6.4/consul_0.6.4_linux_amd64.zip /tmp/consul.zip
RUN cd /usr/sbin; unzip /tmp/consul.zip; chmod +x /usr/sbin/consul; rm /tmp/consul.zip

RUN mkdir -p /webui/
ADD https://releases.hashicorp.com/consul/0.6.4/consul_0.6.4_web_ui.zip /webui/webui.zip
RUN cd /webui; unzip webui.zip; rm webui.zip

ADD consul.json /config/

#
# | Port       | Purpose        |
# |------------|----------------|
# | 53/udp     | DNS server     |
# | 8300       | Server RPC     |
# | 8301 + udp | Serf LAN port  |
# | 8302 + udp | Serf WAN port  |
# | 8400       | RPC endpoint   |
# | 8500       | HTTP API       |

EXPOSE 53/udp 8300 8301 8301/udp 8302 8302/udp 8400 8500

VOLUME [ "/data" ]

ENTRYPOINT [ "/usr/sbin/consul", "agent", "-config-dir=/config"]
CMD []