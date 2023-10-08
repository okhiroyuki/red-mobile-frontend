require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-prettier",
    "@vue/eslint-config-typescript",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  globals: {
    cordova: true,
    nodejs: true,
    networkinterface: true,
    bluetoothle: true,
    FirebasePlugin: true,
    serial: true,
    DBMeter: true,
    CameraPreview: true,
    FirebaseVisionPlugin: true,
    webkit: true,
    device: true,
    store: true,
    chooser: true,
    LaunchReview: true,
    nfc: true,
    ndef: true,
    CdvPurchase: true,
  },
};
