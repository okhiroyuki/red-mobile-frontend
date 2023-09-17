const webSocketPort = 23456;

export function isCordova() {
  return window.cordova !== undefined;
}

export function validatePort(port) {
  return !(port.length === 0 || (port <= 0 || port === webSocketPort || port > 61000));
}

export function validateLogin(user, pass) {
  return (user.length > 0 && pass.length > 0) || (user.length === 0 && pass.length === 0);
}

export function generateMessage(user, pass, port) {
  if (user.length > 0 && pass.length > 0) {
    return {
      method: "start",
      username: user,
      password: pass,
      port,
      wsport: webSocketPort,
    };
  } if (user.length === 0 && pass.length === 0) {
    return {
      method: "start",
      port,
      wsport: webSocketPort,
    };
  } return {};
}

export function onError() {
  console.log("error");
}

export const getBooleanItem = (item) => {
  const val = window.localStorage.getItem(item);
  return val !== undefined && val === "true";
};

export const getItem = (item, defaultValue) => {
  const val = window.localStorage.getItem(item);
  if (val !== null) {
    return val;
  }
  return defaultValue;
};

export function getAutoStart() {
  return getBooleanItem("autostart");
}

export function setKeepAwake(val) {
  if (isCordova()) {
    if (val) {
      window.powerManagement.dim(() => {
        // eslint-disable-next-line no-console
        console.log("Wakelock acquired");
      }, () => {
        // eslint-disable-next-line no-console
        console.log("Failed to acquire wakelock");
      });
    } else {
      window.powerManagement.release(() => {
        // eslint-disable-next-line no-console
        console.log("Wakelock released");
      }, () => {
        // eslint-disable-next-line no-console
        console.log("Failed to release wakelock");
      });
    }
  }
}

export const initAutoStart = () => {
  // $("input[id="autostart"]").prop("checked", getAutoStart());
};

export function writeFile(fileEntry, dataObj, isAppend) {
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

export function removeFile(dirEntry, filename) {
  return new Promise((resolve, reject) => {
    dirEntry.getFile(filename, {
      create: false,
    }, (fileEntry) => {
      fileEntry.remove(() => {
        resolve();
      }, (error) => {
        reject(error);
      });
    });
  });
}

export function readFile(fileEntry) {
  return new Promise((resolve, reject) => {
    fileEntry.file((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(this.result);
      };
      reader.readAsText(file);
    }, (error) => {
      reject(error);
    });
  });
}

export function getFile(accept) {
  return chooser.getFileMetadata(accept);
}

export function requestReview() {
  const appId = "com.okhiroyuki.redmobile";
  LaunchReview.launch(() => {
    console.log("Successfully launched store app");
  }, (err) => {
    console.log(`Error launching store app: ${err}`);
  }, appId);
}
