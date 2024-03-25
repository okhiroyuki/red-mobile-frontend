import * as Background from "./background";
import * as Camera from "./device/camera";
import * as Handler from "./device/handler";
import * as InAppBrowser from "./device/inAppBrowser";
import * as Network from "./device/network";
import * as Util from "./util";

let ip;
let status;
let statusCallback = null;
let deviceReadyCallback = null;
let backKeyDownCallback = null;

function setIp(_ip) {
  ip = _ip;
}

export function getIp() {
  return ip;
}

export function getStatus() {
  return status;
}

function setStatus(_status) {
  status = _status;
  if (statusCallback) {
    statusCallback(status);
  }
}

function sendStarted(ip) {
  setIp(ip);
  setStatus("started");
}

function onResume() {
  console.log("onResume");
  Network.init((ip) => {
    console.log("getIp");
    setIp(ip);
  });
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
    setStatus("start");
    postMessage(msg);
    if (!Util.isCordova()) {
      sendStarted("10.0.1.10");
    }
  }
}

export function openDashboard() {
  if (status === "started") {
    const port = Util.getItem("port", 1880);
    InAppBrowser.openDashboard(port);
  }
}

function sendCheckCommand() {
  const msg = {
    method: "check",
  };
  nodejs.channel.post("message", msg);
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
      setStatus("started");
    } else {
      setStatus("prepare");
    }
  } else if (json.method === "log") {
    logEvent("node_red_log", json.log);
  } else if (json.method === "started") {
    sendStarted(Network.getIp());
  } else if (json.method === "error") {
    Util.onError();
  } else {
    Handler.start(json);
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

// Handle the back button
function onBackKeyDown() {
  if (backKeyDownCallback) {
    backKeyDownCallback();
  }
}

const cordovaApp = {
  initialize() {
    console.log("initialize");
    document.addEventListener("deviceready", this.onDeviceReady, false);
  },
  onDeviceReady() {
    document.addEventListener("resume", onResume, false);
    document.addEventListener("pause", onPause, false);
    document.addEventListener("backbutton", onBackKeyDown, false);
    Handler.init();
    Background.init();
    startNodeProject();
    deviceReadyCallback();
  },
};

export function setStatusCallback(callback) {
  statusCallback = callback;
}

export function setBackKeyDownCallback(_callback) {
  backKeyDownCallback = _callback;
}

export function init(_callback) {
  deviceReadyCallback = _callback;
  cordovaApp.initialize();
}
