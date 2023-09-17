import * as Util from "./util";

let version;

export function init() {
  cordova.getAppVersion.getVersionNumber().then((val) => {
    version = val;
  });
}

export function get() {
  if (Util.isCordova()) {
    return version;
  }
  return "1.0.0";
}
