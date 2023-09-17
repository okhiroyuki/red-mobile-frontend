import * as Util from "./util";

const ENV_FILE = "env";

export function write(data) {
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
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.log(error);
            });
        },
      );
    },
    (error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    },
  );
}

export function remove() {
  window.resolveLocalFileSystemURL(
    cordova.file.dataDirectory,
    (dirEntry) => {
      Util.removeFile(dirEntry, ENV_FILE)
        .then(() => {
          localStorage.removeItem("env");
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    },
    (error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    },
  );
}

export const hasEnv = () => window.localStorage.getItem("env") === "enable";
