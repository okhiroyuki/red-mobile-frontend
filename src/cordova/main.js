import Alert from "./device/alert";
import * as Background from "./device/background";
import * as Battery from "./device/battery";
import Beep from "./device/beep";
import * as Ble from "./device/ble";
import * as Camera from "./device/camera";
import Clipboard from "./device/clipboard";
import * as Compass from "./device/compass";
import Confirm from "./device/confirm";
import DB from "./device/db";
import * as Fcm from "./device/fcm";
import * as GeoLocation from "./device/geolocation";
import * as Gyroscope from "./device/gyroscope";
import * as InAppBrowser from "./device/inAppBrowser";
import Intent from "./device/intent";
import * as Light from "./device/light";
import * as Magnetic from "./device/magnetic";
import MLKit from "./device/mlkit";
import * as Motion from "./device/motion";
import * as Network from "./device/network";
import Prompt from "./device/prompt";
import * as Proximity from "./device/proximity";
import QRCode from "./device/qrcode";
import Recognition from "./device/recognition";
import Serial from "./device/serial";
import * as Shortcut from "./device/shortcut";
import Speech from "./device/speech";
import SQLite from "./device/sqlite";
import Vibrate from "./device/vibrate";
import Volume from "./device/volume";
import * as NFC from "./device/nfc";

import * as Util from "./util";
import * as Purchase from "./purchase";
import * as Modules from "./modules";

let Vue;

function getIpCallback(ip) {
  console.log("getIp");
  Vue.$root.ip = ip;
}

function sendStarted(ip) {
  Vue.$root.ip = ip;
  Vue.$root.status = "started";
}

function onResume() {
  console.log("onResume");
  Network.init(getIpCallback);
  Camera.enable();
}

function onPause() {
  console.log("onPause");
  Camera.disable();
}

function postMessage(msg) {
  if (Util.isCordova()) {
    nodejs.channel.post("message", msg);
  }
}

export function start(username, password, port) {
  console.log("start");
  const msg = Util.generateMessage(username, password, port);
  if (msg !== undefined) {
    Vue.$root.status = "start";
    postMessage(msg);
    if (!Util.isCordova()) {
      sendStarted("10.0.1.10");
    }
  }
}

export function openDashboard() {
  if (Vue.$root.status === "started") {
    const port = Util.getItem("port", 1880);
    InAppBrowser.openDashboard(port);
  }
}

function setHandlerOpenUrl() {
  window.handleOpenURL = (url) => {
    console.log(url);
    if (url === "redmobile://dashboard/show") {
      openDashboard();
    } else if (url === "redmobile://dashboard/pin") {
      Shortcut.pin("dashboard");
    }
  };
}

function sendCheckCommand() {
  const msg = {
    method: "check",
  };
  nodejs.channel.post("message", msg);
}

function sensorManager(json) {
  if (json.method === "sensor-subscribe") {
    Compass.startWatch(json);
    GeoLocation.startWatch(json);
    Gyroscope.startWatch(json);
    Light.startWatch(json);
    Magnetic.startWatch(json);
    Motion.startWatch(json);
    Proximity.startWatch(json);
    NFC.startWatch(json);
  }
  if (json.method === "sensor-unsubscribe") {
    Compass.stopWatch(json);
    GeoLocation.stopWatch(json);
    Gyroscope.stopWatch(json);
    Light.stopWatch(json);
    Magnetic.stopWatch(json);
    Motion.stopWatch(json);
    Proximity.stopWatch(json);
    NFC.stopWatch(json);
  }
}

function logEvent(name, params) {
  if (!name) {
    return;
  }
  // console.log(JSON.stringify(params));
  if (params.event) {
    // colon + space+ -
    const replaceName = params.event.replaceAll(/\.|\s|-/gi, "_");
    FirebasePlugin.logEvent(replaceName, params);
  } else {
    FirebasePlugin.logEvent(name, params);
  }
}

function massageListener(msg) {
  if (msg === null || msg === "Engine already started") {
    return;
  }
  const json = JSON.parse(msg);
  if (json.method === undefined || json.method === null) {
    return;
  }
  if (json.method === "check") {
    if (json.payload) {
      Vue.$root.status = "started";
    } else {
      Vue.$root.status = "prepare";
    }
  } else if (json.method === "log") {
    logEvent("node_red_log", json.log);
  } else if (json.method === "started") {
    sendStarted(Network.getIp());
  } else if (json.method === "error") {
    Util.onError();
  } else {
    Battery.startIfNeeded(json);
    Recognition(json);
    Speech(json);
    InAppBrowser.startIfNeeded(json);
    Vibrate(json);
    Beep(json);
    Confirm(json);
    Alert(json);
    Prompt(json);
    DB(json);
    Camera.startIfNeeded(json);
    Serial(json);
    Volume(json);
    Intent(json);
    SQLite(json);
    Ble.startIfNeeded(json);
    Clipboard(json);
    Fcm.startIfNeeded(json);
    QRCode(json);
    MLKit(json);
    sensorManager(json);
  }
}

function startNodeProject() {
  console.log("startNodeProject");
  nodejs.channel.on("message", massageListener);
  nodejs.start("main.js", massageListener, {
    redirectOutputToLogcat: true,
  });
  sendCheckCommand();
}

export function reset() {
  nodejs.reset();
}

export function launchNodeRED(url) {
  if (Util.isCordova()) {
    InAppBrowser.launchNodeRED(url);
  } else {
    window.open(url, "_blank");
  }
}

export function order() {
  return Purchase.order();
}

export function canPurchase() {
  return Purchase.canPurchase();
}

// Handle the back button
function onBackKeyDown() {
  if (Vue.$root.sidebar) {
    Vue.$root.sidebar = false;
  } else if (Vue.$route.path === "/") {
    Background.moveToBackground();
  } else {
    window.history.back();
  }
}

const app = {
  initialize() {
    console.log("initialize");
    document.addEventListener("deviceready", this.onDeviceReady, false);
  },
  onDeviceReady() {
    console.log("onDeviceReady");
    // Workaround for Main not rendering in Android
    Vue.$router.push({ path: "/" });
    document.addEventListener("resume", onResume, false);
    document.addEventListener("pause", onPause, false);
    document.addEventListener("backbutton", onBackKeyDown, false);
    Purchase.init(Vue);
    Modules.hasModules(Vue);
    Battery.init();
    Background.init();
    Shortcut.init();
    setHandlerOpenUrl();
    Network.init();
    Ble.init();
    Fcm.init();
    startNodeProject();
  },
};

export function init(_this) {
  Vue = _this;
  app.initialize();
}
