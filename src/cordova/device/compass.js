import { getFrequency } from "../util";
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

function onSuccess(id, heading) {
  const msg = {
    id,
    method: "ws-compass",
    type: "send",
    payload: heading.magneticHeading,
  };
  nodejs.channel.post("message", msg);
}

function onError(id, error) {
  const msg = {
    id,
    method: "ws-compass",
    type: "send",
    payload: error,
  };
  nodejs.channel.post("message", msg);
}

function canExec(json) {
  if (json.options) {
    return json.options.sensor === "compass";
  } else {
    return json.opts.sensor === "compass";
  }
}

export function startWatch(json) {
  if (canExec(json)) {
    const method = "sensor-subscribe";
    if (!watchId) {
      const options = {
        frequency: getFrequency(json),
      };
      watchId = navigator.compass.watchHeading(
        (heading) => {
          onSuccess(json.id, heading);
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
      navigator.compass.clearWatch(watchId);
      watchId = null;
      callbackSuccess(json.id, method);
    } else {
      callbackError(json.id, method, "Not subscribed");
    }
  }
}
