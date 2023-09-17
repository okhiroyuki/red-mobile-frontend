let permissions;
let Vue;

function setPermission(_params, _status) {
  Vue.$set(Vue.$root.permission, _params, _status.hasPermission);
}

function checkCameraPermission() {
  permissions.checkPermission(permissions.CAMERA, (status) => {
    setPermission("camera", status);
  });
}

function checkStoragePermission() {
  permissions.checkPermission(permissions.READ_EXTERNAL_STORAGE, (status) => {
    setPermission("storage", status);
  });
}

function checkMicPermission() {
  permissions.checkPermission(permissions.RECORD_AUDIO, (status) => {
    setPermission("mic", status);
  });
}

function checkBluetoothPermission() {
  permissions.checkPermission(permissions.BLUETOOTH_CONNECT, (connectStatus) => {
    permissions.checkPermission(permissions.BLUETOOTH_SCAN, (scanStatus) => {
      setPermission("bluetooth", connectStatus && scanStatus);
    });
  });
}

function checkLocationPermission() {
  permissions.checkPermission(permissions.ACCESS_FINE_LOCATION, (status) => {
    setPermission("location", status);
  });
}

export function requestCameraPermission() {
  permissions.requestPermission(permissions.CAMERA, (status) => {
    setPermission("camera", status);
  });
}

export function requestLocationPermission() {
  permissions.requestPermission(permissions.ACCESS_FINE_LOCATION, (status) => {
    setPermission("location", status);
  });
}

export function requestStoragePermission() {
  permissions.requestPermission(permissions.READ_EXTERNAL_STORAGE, (status) => {
    setPermission("storage", status);
  });
}

export function requestMicPermission() {
  permissions.requestPermission(permissions.RECORD_AUDIO, (status) => {
    setPermission("mic", status);
  });
}

export function requestBluetoothPermission() {
  permissions.requestPermission(permissions.BLUETOOTH_CONNECT, (connectStatus) => {
    permissions.requestPermission(permissions.BLUETOOTH_SCAN, (scanStatus) => {
      setPermission("bluetooth", connectStatus && scanStatus);
    });
  });
}

export function init(_vue, _permissions) {
  Vue = _vue;
  permissions = _permissions;
  checkCameraPermission();
  checkStoragePermission();
  checkLocationPermission();
  checkMicPermission();
  checkBluetoothPermission();
}
