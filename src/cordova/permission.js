function permissions() {
  return cordova.plugins.permissions;
}

export function checkCameraPermission(callback) {
  permissions().checkPermission(permissions().CAMERA, (status) => {
    callback(status.hasPermission);
  });
}

export function checkLocationPermission(callback) {
  permissions().checkPermission(
    permissions().ACCESS_FINE_LOCATION,
    (status) => {
      callback(status.hasPermission);
    },
  );
}

export function checkStoragePermission(callback) {
  permissions().checkPermission(
    permissions().READ_EXTERNAL_STORAGE,
    (status) => {
      callback(status.hasPermission);
    },
  );
}

export function checkMicPermission(callback) {
  permissions().checkPermission(permissions().RECORD_AUDIO, (status) => {
    callback(status.hasPermission);
  });
}

export function checkBluetoothPermission(callback) {
  permissions().checkPermission(
    permissions().BLUETOOTH_CONNECT,
    (connectStatus) => {
      permissions().checkPermission(
        permissions().BLUETOOTH_SCAN,
        (scanStatus) => {
          callback(connectStatus.hasPermission && scanStatus.hasPermission);
        },
      );
    },
  );
}

export function requestCameraPermission(callback) {
  permissions().requestPermission(permissions().CAMERA, (status) => {
    callback(status.hasPermission);
  });
}

export function requestLocationPermission(callback) {
  permissions().requestPermission(
    permissions().ACCESS_FINE_LOCATION,
    (status) => {
      callback(status.hasPermission);
    },
  );
}

export function requestStoragePermission(callback) {
  permissions().requestPermission(
    permissions().READ_EXTERNAL_STORAGE,
    (status) => {
      callback(status.hasPermission);
    },
  );
}

export function requestMicPermission(callback) {
  permissions().requestPermission(permissions().RECORD_AUDIO, (status) => {
    callback(status.hasPermission);
  });
}

export function requestBluetoothPermission(callback) {
  permissions().requestPermission(
    permissions().BLUETOOTH_CONNECT,
    (connectStatus) => {
      permissions().requestPermission(
        permissions().BLUETOOTH_SCAN,
        (scanStatus) => {
          callback(connectStatus.hasPermission && scanStatus.hasPermission);
        },
      );
    },
  );
}
