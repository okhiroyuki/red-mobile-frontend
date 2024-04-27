FROM mcr.microsoft.com/devcontainers/typescript-node:1-20

# renovate: datasource=github-release depName=hadolint/hadolint versioning=regex:^v(?<major>\d+)\.(?<minor>\d+)(\.(?<patch>\d+))?$
ENV HADOLINT_VERSION="v2.11.0"

RUN apt-get update && apt-get install -y --no-install-recommends \
        pre-commit \
        wget \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN wget -q -O /usr/local/bin/hadolint https://github.com/hadolint/hadolint/releases/download/${HADOLINT_VERSION}/hadolint-Linux-x86_64 \
    && chmod +x /usr/local/bin/hadolint
