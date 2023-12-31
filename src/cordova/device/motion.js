let watchId = null;

function callbackSuccess(id, method, message) {
  const msg = {
    id,
    method,
    payload: message,
    status: true,
  };
  nodejs.channel.post("message", msg);
}

function callbackError(id, method, message) {
  const msg = {
    id,
    method,
    payload: message,
    status: false,
  };
  nodejs.channel.post("message", msg);
}

function onSuccess(id, acceleration) {
  const msg = {
    id,
    method: "ws-motion",
    type: "send",
    payload: {
      x: acceleration.x,
      y: acceleration.y,
      z: acceleration.z,
    },
  };
  nodejs.channel.post("message", msg);
}

function onError(id, error) {
  const msg = {
    id,
    method: "ws-motion",
    type: "send",
    payload: error,
  };
  nodejs.channel.post("message", msg);
}

function canExec(json) {
  return json.options.sensor === "motion";
}

export function startWatch(json) {
  if (canExec(json)) {
    const method = "sensor-subscribe";
    if (!watchId) {
      const options = {
        frequency: Number(json.options.freq),
      };
      watchId = navigator.accelerometer.watchAcceleration(
        (acceleration) => {
          onSuccess(json.id, acceleration);
        },
        (error) => {
          onError(json.id, error);
        },
        options,
      );
      callbackSuccess(json.id, method);
    } else {
      callbackError(json.id, method, "Already subscribed");
    }
  }
}

export function stopWatch(json) {
  if (canExec(json)) {
    const method = "sensor-unsubscribe";
    if (watchId) {
      navigator.accelerometer.clearWatch(watchId);
      watchId = null;
      callbackSuccess(json.id, method);
    } else {
      callbackError(json.id, method, "Not subscribed");
    }
  }
}
