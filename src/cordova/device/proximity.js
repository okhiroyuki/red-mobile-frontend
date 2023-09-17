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
    method: "ws-proximity",
    type: "send",
    payload: result.distance,
  };
  nodejs.channel.post("message", msg);
}

function onError(id, error) {
  const msg = {
    id,
    method: "ws-proximity",
    type: "send",
    payload: error.message,
  };
  nodejs.channel.post("message", msg);
}

function canExec(json) {
  return json.opts.sensor === "proximity";
}

export function startWatch(json) {
  if (canExec(json)) {
    const method = "sensor-subscribe";
    if (!watchId) {
      const options = {
        frequency: Number(json.opts.freq),
      };
      watchId = navigator.proximity.watchProximity((result) => {
        onSuccess(json.id, result);
      }, (err) => {
        onError(json.id, err);
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
      navigator.proximity.clearWatch(watchId);
      watchId = null;
      callbackSuccess(json.id, method);
    } else {
      callbackError(json.id, method, "Not subscribed");
    }
  }
}
