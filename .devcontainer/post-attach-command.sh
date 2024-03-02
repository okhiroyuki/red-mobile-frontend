#!/bin/sh

npm ci

cd src-cordova
npm ci
echo $GOOGLE_SERVICES_JSON > google-services.json
echo $BUILD_JSON > build.json
echo $ANDROID_KEYSTORE | base64 -d > android.keystore

cd www/nodejs-project
npm i --omit=dev


