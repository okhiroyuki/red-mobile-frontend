function permissions() {
  return cordova.plugins.permissions;
}

export function checkCameraPermission() {
  return new Promise((resolve) => {
    permissions().checkPermission(permissions().CAMERA, (status) => {
      resolve(status.hasPermission);
    });
  });
}

export function checkLocationPermission() {
  return new Promise((resolve) => {
    permissions().checkPermission(
      permissions().ACCESS_FINE_LOCATION,
      (status) => {
        resolve(status.hasPermission);
      },
    );
  });
}

export function checkStoragePermission() {
  return new Promise((resolve) => {
    permissions().checkPermission(
      permissions().READ_EXTERNAL_STORAGE,
      (status) => {
        resolve(status.hasPermission);
      },
    );
  });
}

export function checkMicPermission() {
  return new Promise((resolve) => {
    permissions().checkPermission(permissions().RECORD_AUDIO, (status) => {
      resolve(status.hasPermission);
    });
  });
}

export function checkBluetoothPermission() {
  return new Promise((resolve) => {
    permissions().checkPermission(
      permissions().BLUETOOTH_CONNECT,
      (connectStatus) => {
        permissions().checkPermission(
          permissions().BLUETOOTH_SCAN,
          (scanStatus) => {
            resolve(connectStatus.hasPermission && scanStatus.hasPermission);
          },
        );
      },
    );
  });
}

export function requestCameraPermission() {
  return new Promise((resolve) => {
    permissions().requestPermission(permissions().CAMERA, (status) => {
      resolve(status.hasPermission);
    });
  });
}

export function requestLocationPermission() {
  return new Promise((resolve) => {
    permissions().requestPermission(
      permissions().ACCESS_FINE_LOCATION,
      (status) => {
        resolve(status.hasPermission);
      },
    );
  });
}

export function requestStoragePermission() {
  return new Promise((resolve) => {
    permissions().requestPermission(
      permissions().READ_EXTERNAL_STORAGE,
      (status) => {
        resolve(status.hasPermission);
      },
    );
  });
}

export function requestMicPermission() {
  return new Promise((resolve) => {
    permissions().requestPermission(permissions().RECORD_AUDIO, (status) => {
      resolve(status.hasPermission);
    });
  });
}

export function requestBluetoothPermission() {
  return new Promise((resolve) => {
    permissions().requestPermission(
      permissions().BLUETOOTH_CONNECT,
      (connectStatus) => {
        permissions().requestPermission(
          permissions().BLUETOOTH_SCAN,
          (scanStatus) => {
            resolve(connectStatus.hasPermission && scanStatus.hasPermission);
          },
        );
      },
    );
  });
}
