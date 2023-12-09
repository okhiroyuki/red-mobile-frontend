let devices = [];

function sendWs(id, data) {
  const msg = {
    id,
    method: "ws-ble",
    type: "send",
    payload: data,
  };
  nodejs.channel.post("message", msg);
}

function getAddress(json) {
  return json.options.address;
}

function getService(json) {
  return json.options.service;
}

function getCharacteristic(json) {
  return json.options.characteristic;
}

function enable(resolve, reject) {
  bluetoothle.isEnabled((result) => {
    if (result.isEnabled) {
      resolve();
    } else {
      reject({
        message: "Bluetooth is disabled",
      });
    }
  });
}

function sendError(json, message) {
  if (json !== undefined) {
    const msg = {
      id: json.id,
      method: json.method,
      payload: message,
      status: false,
    };
    nodejs.channel.post("message", msg);
  }
}

function sendSuccess(json, payload) {
  const msg = {
    id: json.id,
    method: json.method,
    payload,
    status: true,
  };
  nodejs.channel.post("message", msg);
}

function scan(json) {
  bluetoothle.isScanning((result) => {
    if (result.isScanning) {
      sendError(json, "isScanning");
    } else {
      const timeout = json.options.timeout * 1000 || 5000;
      devices = [];
      bluetoothle.startScan(
        (_result) => {
          if (_result.status === "scanStarted") {
            console.log("scanStarted");
          } else if (_result.status === "scanResult") {
            if (!devices.some((device) => device.address === _result.address)) {
              devices.push(_result);
            }
          }
        },
        (err) => {
          console.log(err);
        },
        {
          services: [],
          allowDuplicates: false,
        },
      );
      setTimeout(
        bluetoothle.stopScan,
        timeout,
        () => {
          sendSuccess(json, devices);
        },
        (err) => {
          sendError(json, err.message);
        },
      );
    }
  });
}

function discover(json, resolve, reject) {
  bluetoothle.discover(
    (result) => {
      resolve(result);
    },
    (err) => {
      reject(err);
    },
    {
      address: getAddress(json),
      clearCache: true,
    },
  );
}

function isDiscover(json, resolve, reject) {
  bluetoothle.isDiscovered(
    (result) => {
      if (!result.isDiscovered) {
        discover(json, resolve, reject);
      } else {
        resolve({ message: "connected" });
      }
    },
    (err) => {
      reject(err);
    },
    {
      address: getAddress(json),
    },
  );
}

function reconnect(json, resolve, reject) {
  bluetoothle.reconnect(
    (result) => {
      if (result.status === "connected") {
        resolve(result);
      } else {
        reject({
          message: "connect failure",
        });
      }
    },
    (err) => {
      reject(err);
    },
    {
      address: getAddress(json),
    },
  );
}

function close(json, reject) {
  bluetoothle.close(
    () => {
      reject({
        message: "Please try again",
      });
    },
    (err) => {
      reject(err);
    },
    {
      address: getAddress(json),
    },
  );
}

function connect(json) {
  return new Promise((resolve, reject) => {
    bluetoothle.connect(
      (result) => {
        if (result.status === "connected") {
          isDiscover(json, resolve, reject);
        } else {
          reconnect(json, resolve, reject);
        }
      },
      () => {
        close(json, reject);
      },
      {
        address: getAddress(json),
      },
    );
  });
}

function write(json) {
  const params = {
    value: json.payload,
    address: getAddress(json),
    service: getService(json),
    characteristic: getCharacteristic(json),
  };
  bluetoothle.write(
    (result) => {
      sendSuccess(json, result);
    },
    (err) => {
      sendError(json, err.message);
    },
    params,
  );
}

function read(json) {
  bluetoothle.read(
    (result) => {
      sendSuccess(json, result);
    },
    (err) => {
      sendError(json, err.message);
    },
    {
      address: getAddress(json),
      service: getService(json),
      characteristic: getCharacteristic(json),
    },
  );
}

function unsubscribe(json) {
  bluetoothle.unsubscribe(
    (result) => {
      sendSuccess(json, result);
    },
    (err) => {
      sendError(json, err.message);
    },
    {
      address: getAddress(json),
      service: getService(json),
      characteristic: getCharacteristic(json),
    },
  );
}

function subscribe(json) {
  bluetoothle.subscribe(
    (result) => {
      if (result.status === "subscribed") {
        sendSuccess(json, result);
      } else {
        sendWs(json.id, result);
      }
    },
    (err) => {
      sendError(json, err.message);
    },
    {
      address: getAddress(json),
      service: getService(json),
      characteristic: getCharacteristic(json),
    },
  );
}

function disconnect(json) {
  bluetoothle.disconnect(
    (result) => {
      sendSuccess(json, result);
    },
    (err) => {
      sendError(json, err.message);
    },
    {
      address: getAddress(json),
    },
  );
}

export function init() {
  bluetoothle.initialize(
    () => {
      // console.log(JSON.stringify(result1));
      bluetoothle.getAdapterInfo(() => {
        // console.log(JSON.stringify(result2));
      });
    },
    {
      request: false,
      statusReceiver: false,
      restoreKey: "bluetoothleplugin",
    },
  );
}

function prepare() {
  return new Promise((resolve, reject) => {
    bluetoothle.hasPermission(
      (result1) => {
        if (result1.hasPermission) {
          enable(resolve, reject);
        } else {
          bluetoothle.requestPermission(
            (result2) => {
              if (result2.requestPermission) {
                enable(resolve, reject);
              } else {
                reject(new Error("No permission"));
              }
            },
            (err) => {
              reject(err);
            },
          );
        }
      },
      (err) => {
        reject(err);
      },
    );
  });
}

export function startIfNeeded(json) {
  if (json.method === "ble-scan") {
    prepare()
      .then(() => {
        scan(json);
      })
      .catch((err) => {
        sendError(json, err.message);
      });
  } else if (json.method === "ble-connect") {
    prepare()
      .then(() => {
        connect(json)
          .then((result) => {
            sendSuccess(json, result);
          })
          .catch((err) => {
            sendError(json, err.message);
          });
      })
      .catch((err) => {
        sendError(json, err.message);
      });
  } else if (json.method === "ble-disconnect") {
    prepare()
      .then(() => {
        disconnect(json);
      })
      .catch((err) => {
        sendError(json, err.message);
      });
  } else if (json.method === "ble-write") {
    write(json);
  } else if (json.method === "ble-read") {
    read(json);
  } else if (json.method === "ble-subscribe") {
    prepare()
      .then(() => {
        subscribe(json);
      })
      .catch((err) => {
        sendError(json, err.message);
      });
  } else if (json.method === "ble-unsubscribe") {
    prepare()
      .then(() => {
        unsubscribe(json);
      })
      .catch((err) => {
        sendError(json, err.message);
      });
  }
}
