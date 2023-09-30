import * as Util from "./util";

export function getVersion() {
  return new Promise((resolve) => {
    if (Util.isCordova()) {
      cordova.getAppVersion.getVersionNumber((version) => {
        resolve(version);
      });
    } else {
      resolve("1.0.0");
    }
  });
}
