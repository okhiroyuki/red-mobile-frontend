let isStarted = false;
let canTakePicture = true;

export function enable() {
  canTakePicture = true;
}

function onError(json) {
  if (json !== undefined) {
    const msg = {
      id: json.id,
      method: json.method,
      payload: "error",
      status: false,
    };
    nodejs.channel.post("message", msg);
  }
}

function successStart(json) {
  isStarted = true;
  const msg = {
    id: json.id,
    method: "camera-open",
    payload: "opened",
    status: true,
  };
  nodejs.channel.post("message", msg);
}

function getPicture(json) {
  navigator.camera.getPicture((imageData) => {
    let result;
    if (Number(json.options.destinationType) === 0) {
      result = `data:image/jpeg;base64,${imageData}`;
    } else {
      result = imageData;
    }
    const msg = {
      id: json.id,
      method: json.method,
      payload: result,
      status: true,
    };
    nodejs.channel.post("message", msg);
  }, (error) => {
    const msg = {
      id: json.id,
      method: json.method,
      payload: error.message,
      status: false,
    };
    nodejs.channel.post("message", msg);
  }, json.options);
}

function getToBack(json) {
  if (json.options.toBack === "true") {
    return true;
  }
  return false;
}

function getDirection(json) {
  if (json.options.direction === "front") {
    return CameraPreview.CAMERA_DIRECTION.FRONT;
  }
  return CameraPreview.CAMERA_DIRECTION.BACK;
}

function start(json) {
  if (canTakePicture) {
    const options = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      toBack: false,
      tapPhoto: false,
      tapFocus: false,
      previewDrag: false,
      storeToFile: false,
      disableExifHeaderStripping: false,
    };
    options.toBack = getToBack(json);
    options.camera = getDirection(json);
    CameraPreview.startCamera(options, () => {
      successStart(json);
    });
  } else {
    onError(json);
  }
}

function successClose(json) {
  isStarted = false;
  if (json !== undefined) {
    const msg = {
      id: json.id,
      method: "camera-close",
      payload: "camera closed",
      status: true,
    };
    nodejs.channel.post("message", msg);
  }
}

function close(json) {
  if (isStarted) {
    CameraPreview.stopCamera(successClose(json));
  } else {
    onError(json);
  }
}

export function disable() {
  close();
  canTakePicture = false;
}

function switchCamera(json) {
  if (isStarted) {
    CameraPreview.switchCamera(() => {
      const msg = {
        id: json.id,
        method: "camera-switch",
        payload: "switched",
        status: true,
      };
      nodejs.channel.post("message", msg);
    });
  } else {
    onError(json);
  }
}

function takePicture(json) {
  if (isStarted) {
    CameraPreview.takePicture((base64PictureData) => {
      const msg = {
        id: json.id,
        method: "camera-take-picture",
        payload: `data:image/png;base64,${base64PictureData}`,
        status: true,
      };
      nodejs.channel.post("message", msg);
    });
  } else {
    onError(json);
  }
}

export function startIfNeeded(json) {
  if (json.method === "camera-open") {
    start(json);
  } else if (json.method === "camera-take-picture") {
    takePicture(json);
  } else if (json.method === "camera-close") {
    close(json);
  } else if (json.method === "camera-switch") {
    switchCamera(json);
  } else if (json.method === "camera") {
    getPicture(json);
  }
}
