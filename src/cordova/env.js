import * as Util from "./util";

const ENV_FILE = "env";

export function write(data) {
  return new Promise((resolve, reject) => {
    window.resolveLocalFileSystemURL(
      cordova.file.dataDirectory,
      (dirEntry) => {
        dirEntry.getFile(
          ENV_FILE,
          {
            create: true,
          },
          (fileEntry) => {
            Util.writeFile(fileEntry, data, false)
              .then(() => {
                window.localStorage.setItem("env", "enable");
                resolve();
              })
              .catch((error) => {
                reject(error);
              });
          },
        );
      },
      (error) => {
        reject(error);
      },
    );
  });
}

export function remove() {
  return new Promise((resolve, reject) => {
    window.resolveLocalFileSystemURL(
      cordova.file.dataDirectory,
      (dirEntry) => {
        Util.removeFile(dirEntry, ENV_FILE)
          .then(() => {
            localStorage.removeItem("env");
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      },
      (error) => {
        reject(error);
      },
    );
  });
}

export function hasEnv() {
  if (window.localStorage.getItem("env") === "enable") {
    return true;
  } else {
    return false;
  }
}
