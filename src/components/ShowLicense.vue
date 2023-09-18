<template>
  <v-card>
    <v-list>
      <template v-for="(item, index) in items">
        <v-divider v-if="item.divider" :key="index" />
        <v-list-item v-else :key="item.title" :href="item.url" target="_blank">
          {{ item.title }}
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import { mdiOpenInNew } from "@mdi/js";

export default {
  data() {
    return {
      mdiOpenInNew,
      // <a href="https://raw.githubusercontent.com/motdotla/dotenv/master/LICENSE"
      // class="collection-item">dotenv</a>
      items: [
        {
          title: "cordova-android",
          url: "https://raw.githubusercontent.com/apache/cordova-android/master/LICENSE",
        },
        { divider: true },
        {
          title: "nodejs-mobile-cordova",
          url: "https://raw.githubusercontent.com/janeasystems/nodejs-mobile-cordova/unstable/LICENSE",
        },
        { divider: true },
        {
          title: "cordova-plugin-device-orientation",
          url: "https://raw.githubusercontent.com/apache/cordova-plugin-device-orientation/master/LICENSE",
        },
        { divider: true },
        {
          title: "cordova-plugin-device-motion",
          url: "https://raw.githubusercontent.com/apache/cordova-plugin-device-motion/master/LICENSE",
        },
        { divider: true },
        {
          title: "cordova-plugin-battery-status",
          url: "https://raw.githubusercontent.com/apache/cordova-plugin-battery-status/master/LICENSE",
        },
        { divider: true },
        {
          title: "cordova-plugin-geolocation",
          url: "https://raw.githubusercontent.com/apache/cordova-plugin-geolocation/master/LICENSE",
        },
        { divider: true },
        {
          title: "cordova-plugin-speechrecognition",
          url: "https://raw.githubusercontent.com/pbakondy/cordova-plugin-speechrecognition/master/LICENSE",
        },
        { divider: true },
        {
          title: "SpeechSynthesisPlugin",
          url: "https://raw.githubusercontent.com/macdonst/SpeechSynthesisPlugin/master/LICENSE",
        },
        { divider: true },
        {
          title: "Custom-URL-scheme",
          url: "https://raw.githubusercontent.com/EddyVerbruggen/Custom-URL-scheme/master/README.md",
        },
        { divider: true },
        {
          title: "cordova-plugin-dialogs",
          url: "https://raw.githubusercontent.com/apache/cordova-plugin-dialogs/master/LICENSE",
        },
        { divider: true },
        {
          title: "cordova-plugin-vibration",
          url: "https://raw.githubusercontent.com/apache/cordova-plugin-vibration/master/LICENSE",
        },
        { divider: true },
        {
          title: "cordova-plugin-inappbrowser",
          url: "https://raw.githubusercontent.com/apache/cordova-plugin-inappbrowser/master/LICENSE",
        },
        { divider: true },
        {
          title: "cordova-plugin-shortcuts-android",
          url: "https://raw.githubusercontent.com/avargaskun/cordova-plugin-shortcuts-android/master/LICENSE",
        },
        { divider: true },
        {
          title: "cordova-plugin-camera-preview",
          url: "https://raw.githubusercontent.com/cordova-plugin-camera-preview/cordova-plugin-camera-preview/master/LICENSE",
        },
        { divider: true },
        {
          title: "cordova-plugin-android-volume",
          url: "https://raw.githubusercontent.com/MCluck90/cordova-plugin-android-volume/master/LICENSE",
        },
        { divider: true },
        {
          title: "cordova-sqlite-storage",
          url: "https://raw.githubusercontent.com/xpbrew/cordova-sqlite-storage/dev/LICENSE.md",
        },
        { divider: true },
        {
          title: "cordova-plugin-camera",
          url: "https://raw.githubusercontent.com/apache/cordova-plugin-camera/master/LICENSE",
        },
        { divider: true },
        {
          title: "cordova-plugin-file",
          url: "https://raw.githubusercontent.com/apache/cordova-plugin-file/master/LICENSE",
        },
        { divider: true },
        {
          title: "cordova-plugin-firebasex",
          url: "https://raw.githubusercontent.com/dpa99c/cordova-plugin-firebasex/master/LICENSE",
        },
        { divider: true },
        {
          title: "darryncampbell-cordova-plugin-intent",
          url: "https://raw.githubusercontent.com/darryncampbell/darryncampbell-cordova-plugin-intent/master/LICENSE",
        },
        { divider: true },
        {
          title: "cordova-clipboard",
          url: "https://raw.githubusercontent.com/ihadeed/cordova-clipboard/master/LICENSE",
        },
        { divider: true },
        {
          title: "cordova-plugin-androidx-adapter",
          url: "https://raw.githubusercontent.com/dpa99c/cordova-plugin-androidx-adapter/master/README.md",
        },
        { divider: true },
        {
          title: "cordova-plugin-bluetoothle",
          url: "https://raw.githubusercontent.com/randdusing/cordova-plugin-bluetoothle/master/readme.md",
        },
        { divider: true },
        {
          title: "cordova-plugin-firebase-mlvision",
          url: "https://raw.githubusercontent.com/alon22/cordova-plugin-firebase-mlvision/master/LICENSE",
        },
        { divider: true },
        {
          title: "cordova-plugin-splashscreen",
          url: "https://raw.githubusercontent.com/apache/cordova-plugin-splashscreen/master/LICENSE",
        },
        { divider: true },
        {
          title: "cordova-plugin-chooser",
          url: "https://raw.githubusercontent.com/cyph/cordova-plugin-chooser/master/LICENSE",
        },
        { divider: true },
        {
          title: "express",
          url: "https://raw.githubusercontent.com/expressjs/express/master/LICENSE",
        },
        { divider: true },
        {
          title: "body-parser",
          url: "https://raw.githubusercontent.com/expressjs/body-parser/master/LICENSE",
        },
        { divider: true },
        {
          title: "node-red",
          url: "https://raw.githubusercontent.com/node-red/node-red/master/LICENSE",
        },
        { divider: true },
        {
          title: "node-red-nodes",
          url: "https://raw.githubusercontent.com/node-red/node-red-nodes/master/LICENSE",
        },
        { divider: true },
        {
          title: "qs",
          url: "https://raw.githubusercontent.com/ljharb/qs/master/LICENSE",
        },
        { divider: true },
        {
          title: "axios",
          url: "https://raw.githubusercontent.com/axios/axios/master/LICENSE",
        },
        { divider: true },
        {
          title: "cros",
          url: "https://raw.githubusercontent.com/expressjs/cors/master/LICENSE",
        },
        { divider: true },
        {
          title: "multer",
          url: "https://raw.githubusercontent.com/expressjs/multer/master/LICENSE",
        },
        { divider: true },
        {
          title: "node-fs-extra",
          url: "https://raw.githubusercontent.com/jprichardson/node-fs-extra/master/LICENSE",
        },
        { divider: true },
        {
          title: "ws",
          url: "https://raw.githubusercontent.com/websockets/ws/master/LICENSE",
        },
        { divider: true },
        {
          title: "bcrypt.js",
          url: "https://raw.githubusercontent.com/dcodeIO/bcrypt.js/master/LICENSE",
        },
        { divider: true },
        {
          title: "node-red-contrib-image-output",
          url: "https://raw.githubusercontent.com/rikukissa/node-red-contrib-image-output/master/LICENSE",
        },
        { divider: true },
        {
          title: "dotenv",
          url: "https://raw.githubusercontent.com/motdotla/dotenv/master/LICENSE",
        },
        { divider: true },
        {
          title: "vue",
          url: "https://raw.githubusercontent.com/vuejs/vue/dev/LICENSE",
        },
        { divider: true },
        {
          title: "vuetify",
          url: "https://raw.githubusercontent.com/vuetifyjs/vuetify/master/LICENSE.md",
        },
        { divider: true },
        {
          title: "vue-router",
          url: "https://raw.githubusercontent.com/vuejs/vue-router/dev/LICENSE",
        },
        { divider: true },
        {
          title: "vue-axios",
          url: "https://raw.githubusercontent.com/imcvampire/vue-axios/master/LICENSE",
        },
        { divider: true },
      ],
    };
  },
};
</script>
