#!/bin/bash

sudo chown node .pre-commit-cache
sudo chown node .npm
sudo chown node node_modules

npm ci
