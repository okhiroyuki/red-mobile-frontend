FROM mcr.microsoft.com/devcontainers/typescript-node:1-20

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        pre-commit \
    && apt-get clean && rm -rf /var/lib/apt/lists/*
