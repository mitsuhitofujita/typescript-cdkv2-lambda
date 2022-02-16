FROM node:16-bullseye

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
        docker.io \
        locales \
        tzdata 
RUN apt-get autoremove -y && \
    apt-get clean && \
	rm -rf /var/lib/apt/lists/*
RUN ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    sed -i -E 's/# (ja_JP.UTF-8)/\1/' /etc/locale.gen && \
    locale-gen && \
    update-locale LANG=ja_JP.UTF-8
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install && \
    rm -rf aws awscliv2.zip
RUN curl -L "https://github.com/aws/aws-sam-cli/releases/latest/download/aws-sam-cli-linux-x86_64.zip" -o "aws-sam-cli.zip" && \
    unzip aws-sam-cli.zip -d sam-installation && \
    ./sam-installation/install && \
    rm -rf sam-installation aws-sam-cli.zip
RUN npm install -g \
    cdk \
    typescript
ARG CDK_GID=1000
ARG CDK_UID=1000
ARG CDK_USER=cdk
ARG CDK_GROUP=cdk
ARG CDK_HOME=/home/cdk
ARG DOCKER_GID=998
ARG DOCKER_GROUP=docker
RUN groupmod -g ${DOCKER_GID} ${DOCKER_GROUP} && \
    usermod -aG ${DOCKER_GROUP} -l ${CDK_USER} -d ${CDK_HOME} node && \
    mkhomedir_helper ${CDK_USER} && \
    groupmod -n ${CDK_GROUP} node
