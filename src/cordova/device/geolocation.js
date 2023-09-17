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

function onSuccess(id, position) {
  const msg = {
    id,
    method: "ws-geolocation",
    type: "send",
    payload: {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
      timestamp: position.timestamp,
    },
  };
  nodejs.channel.post("message", msg);
}

function onError(id, error) {
  const msg = {
    id,
    method: "ws-geolocation",
    type: "send",
    payload: error,
  };
  nodejs.channel.post("message", msg);
}

function canExec(json) {
  return json.opts.sensor === "geolocation";
}

export function startWatch(json) {
  if (canExec(json)) {
    const method = "sensor-subscribe";
    if (!watchId) {
      watchId = navigator.geolocation.watchPosition((position) => {
        onSuccess(json.id, position);
      }, (error) => {
        onError(json.id, error);
      });
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
      navigator.geolocation.clearWatch(watchId);
      watchId = null;
      callbackSuccess(json.id, method);
    } else {
      callbackError(json.id, method, "Not subscribed");
    }
  }
}
