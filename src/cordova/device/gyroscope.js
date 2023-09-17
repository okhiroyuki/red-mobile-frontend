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

function onSuccess(id, result) {
  const msg = {
    id,
    method: "ws-gyroscope",
    type: "send",
    payload: {
      x: result.x,
      y: result.y,
      z: result.z,
    },
  };
  nodejs.channel.post("message", msg);
}

function onError(id, error) {
  const msg = {
    id,
    method: "ws-gyroscope",
    type: "send",
    payload: error,
  };
  nodejs.channel.post("message", msg);
}

function canExec(json) {
  return json.opts.sensor === "gyroscope";
}

export function startWatch(json) {
  if (canExec(json)) {
    const method = "sensor-subscribe";
    if (!watchId) {
      const options = {
        frequency: Number(json.opts.freq),
      };
      watchId = navigator.gyroscope.watchGyroscope((result) => {
        onSuccess(json.id, result);
      }, (error) => {
        onError(json.id, error);
      }, options);
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
      navigator.gyroscope.clearWatch(watchId);
      watchId = null;
      callbackSuccess(json.id, method);
    } else {
      callbackError(json.id, method, "Not subscribed");
    }
  }
}
