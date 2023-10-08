const webSocketPort = 23456;

export function isCordova() {
  return window.cordova !== undefined;
}

export function validatePort(port) {
  return !(
    port.length === 0 ||
    port <= 0 ||
    port === webSocketPort ||
    port > 61000
  );
}

export function validateLogin(user, pass) {
  return (
    (user.length > 0 && pass.length > 0) ||
    (user.length === 0 && pass.length === 0)
  );
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
  }
  if (user.length === 0 && pass.length === 0) {
    return {
      method: "start",
      port,
      wsport: webSocketPort,
    };
  }
  return {};
}

export function onError() {
  console.log("error");
}

export const getBooleanItem = (item) => {
  const val = window.localStorage.getItem(item);
  return val != undefined && val === "true";
};

export const getItem = (item, defaultValue) => {
  const val = window.localStorage.getItem(item);
  if (val !== null) {
    return val;
  } else {
    return defaultValue;
  }
};

export function setKeepAwake(val) {
  if (isCordova()) {
    if (val) {
      window.powerManagement.dim(
        () => {
          console.log("Wakelock acquired");
        },
        () => {
          console.log("Failed to acquire wakelock");
        },
      );
    } else {
      window.powerManagement.release(
        () => {
          console.log("Wakelock released");
        },
        () => {
          console.log("Failed to release wakelock");
        },
      );
    }
  }
}

export function readAsText(uri) {
  return new Promise((resolve, reject) => {
    window.resolveLocalFileSystemURL(
      uri,
      (fileEntry) => {
        fileEntry.file(
          (file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve(reader.result);
            };
            reader.onerror = () => {
              reject(reader.error);
            };
            reader.readAsText(file);
          },
          (error) => {
            reject(error);
          },
        );
      },
      (error) => {
        reject(error);
      },
    );
  });
}

export function getFile(accept) {
  if (isCordova()) {
    return chooser.getFileMetadata(accept);
  } else {
    return null;
  }
}

export function requestReview() {
  const appId = "com.okhiroyuki.redmobile";
  if (isCordova()) {
    LaunchReview.launch(
      () => {
        console.log("Successfully launched store app");
      },
      (err) => {
        console.log(`Error launching store app: ${err}`);
      },
      appId,
    );
  } else {
    console.log("call requestReview");
  }
}
