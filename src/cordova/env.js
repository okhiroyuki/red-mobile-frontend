const ENV_FILE = "env";

function writeFile(fileEntry, dataObj, isAppend) {
  return new Promise((resolve, reject) => {
    fileEntry.createWriter((_fileWriter) => {
      const fileWriter = _fileWriter;
      fileWriter.onwriteend = () => {
        resolve(fileEntry);
      };

      fileWriter.onerror = (e) => {
        reject(e);
      };

      // If we are appending data to file, go to the end of the file.
      if (isAppend) {
        try {
          fileWriter.seek(fileWriter.length);
        } catch (e) {
          reject(e);
        }
      }
      fileWriter.write(dataObj);
    });
  });
}

function removeFile(dirEntry, filename) {
  return new Promise((resolve, reject) => {
    dirEntry.getFile(
      filename,
      {
        create: false,
      },
      (fileEntry) => {
        fileEntry.remove(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          },
        );
      },
    );
  });
}

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
            writeFile(fileEntry, data, false)
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
        removeFile(dirEntry, ENV_FILE)
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
  return window.localStorage.getItem("env") === "enable";
}
