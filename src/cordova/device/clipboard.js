function sendError(json) {
  const msg = {
    id: json.id,
    method: json.method,
    status: false,
  };
  nodejs.channel.post("message", msg);
}

function clear(json) {
  const success = () => {
    const msg = {
      id: json.id,
      method: "clipboard",
      payload: json.payload,
      status: true,
    };
    nodejs.channel.post("message", msg);
  };
  const error = () => {
    sendError(json);
  };
  cordova.plugins.clipboard.clear(success, error);
}

function paste(json) {
  cordova.plugins.clipboard.paste((text) => {
    const msg = {
      id: json.id,
      method: "clipboard",
      payload: text,
      status: true,
    };
    nodejs.channel.post("message", msg);
  });
}

function copy(json) {
  const success = () => {
    const msg = {
      id: json.id,
      method: "clipboard",
      payload: json.payload,
      status: true,
    };
    nodejs.channel.post("message", msg);
  };
  const error = () => {
    sendError(json);
  };
  cordova.plugins.clipboard.copy(json.payload, success, error);
}

function isCopy(json) {
  return json.options.mode === "copy";
}

function isPaste(json) {
  return json.options.mode === "paste";
}

function isClear(json) {
  return json.options.mode === "clear";
}

export default function startIfNeeded(json) {
  if (json.method === "clipboard") {
    if (isCopy(json)) {
      copy(json);
    } else if (isPaste(json)) {
      paste(json);
    } else if (isClear(json)) {
      clear(json);
    }
  }
}
