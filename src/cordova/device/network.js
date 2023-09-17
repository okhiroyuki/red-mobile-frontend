let ip;
let callback;

function setCallback(_ip) {
  if (callback !== undefined) {
    callback(_ip);
  }
}

function error() {
  setCallback(ip);
}

function success(ipInformation) {
  if (ipInformation.ip !== "0.0.0.0") {
    ip = ipInformation.ip;
  } else if (ipInformation.WifiApIp !== "") {
    ip = ipInformation.WifiApIp;
  }
  setCallback(ip);
}

export function init(_callback) {
  ip = "127.0.0.1";
  callback = _callback;
  networkinterface.getWiFiIPAddress(success, error);
}

export function getIp() {
  return ip;
}
