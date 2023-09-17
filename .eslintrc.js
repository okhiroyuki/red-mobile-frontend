module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-essential"],
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false,
  },
  rules: {},
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
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [["@", "./src/"]],
        extensions: [".js", ".vue"],
      },
    },
  },
};
