FROM node:25-alpine

RUN apk add --no-cache \
    git \
    curl \
    openssh \
    build-base \
    python3

RUN mkdir -p /var/run/sshd \
    && sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin yes/' /etc/ssh/sshd_config \
    && sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication yes/' /etc/ssh/sshd_config

EXPOSE 22 3000

WORKDIR /var/www/html

ARG TYPESENSE_COLLECTION_NAME
ARG TYPESENSE_HOST
ARG TYPESENSE_PORT
ARG TYPESENSE_PROTOCOL
ARG TYPESENSE_SEARCH_API_KEY

ENV TYPESENSE_COLLECTION_NAME=$TYPESENSE_COLLECTION_NAME
ENV TYPESENSE_HOST=$TYPESENSE_HOST
ENV TYPESENSE_PORT=$TYPESENSE_PORT
ENV TYPESENSE_PROTOCOL=$TYPESENSE_PROTOCOL
ENV TYPESENSE_SEARCH_API_KEY=$TYPESENSE_SEARCH_API_KEY

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT [ "/usr/local/bin/docker-entrypoint.sh" ]