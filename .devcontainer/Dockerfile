FROM koalaman/shellcheck:v0.10.0 AS shellcheck
FROM hadolint/hadolint:v2.12.0-alpine AS dockerfile-lint

FROM mcr.microsoft.com/devcontainers/typescript-node:1-20

COPY --from=shellcheck /bin/shellcheck /usr/bin/
COPY --from=dockerfile-lint /bin/hadolint /usr/bin/hadolint

RUN apt-get update && apt-get install -y --no-install-recommends \
        pre-commit \
    && apt-get clean && rm -rf /var/lib/apt/lists/*
