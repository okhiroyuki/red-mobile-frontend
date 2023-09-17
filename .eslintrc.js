module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["eslint:recommended", "plugin:vue/essential", "airbnb-base"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    parser: "babel-eslint",
  },
  plugins: ["vue"],
  rules: {
    quotes: ["error", "double"],
    "comma-dangle": ["error", "only-multiline"],
    "operator-linebreak": ["error", "after"],
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
