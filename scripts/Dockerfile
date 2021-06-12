# This is the Dockerfile for ubautograding/devtools and can be extended as
# necessary. Currently it only contains the generateConfig utility.

# GenerateConfig can be used as follows:
#docker run -v $(pwd)/config:/config --rm ubautograding/devtools /generateConfig.sh config/default.yml

FROM ubuntu

RUN apt update && apt install -y \
  jq \
  python3 python3-pip \
  && rm -rf /var/lib/apt/lists/*
RUN pip3 install yq

COPY ./generateConfig.sh /generateConfig.sh