#!/bin/sh

git config --global url.https://x-access-token:${GITHUB_TOKEN}@github.com/.insteadOf ssh://git@github.com/
git config --global url.https://x-access-token:${GITHUB_TOKEN}@github.com/.insteadOf git@github.com/
git config --global url.https://x-access-token:${GITHUB_TOKEN}@github.com/.insteadOf git@github.com:
git submodule update --init --recursive
