let ref;

function open(_json) {
  const json = _json;
  if (json.target === "_blank") {
    ref = cordova.InAppBrowser.open(json.payload, json.target, json.options);
    ref.addEventListener("loadstop", () => {
      const msg = {
        id: json.id,
        method: json.method,
        payload: json.payload,
        status: true,
      };
      nodejs.channel.post("message", msg);
    });
    ref.addEventListener("loaderror", (error) => {
      ref.close();
      const msg = {
        id: json.id,
        method: json.method,
        payload: error.message,
        status: false,
      };
      nodejs.channel.post("message", msg);
    });
    ref.addEventListener("exit", () => {
      ref = undefined;
    });
  } else {
    cordova.InAppBrowser.open(json.payload, json.target);
    const msg = {
      id: json.id,
      method: json.method,
      payload: json.payload,
      status: true,
    };
    nodejs.channel.post("message", msg);
  }
}

function close(json) {
  if (ref) {
    ref.close();
    ref = undefined;
    const msg = {
      id: json.id,
      method: json.method,
      payload: "closed",
      status: true,
    };
    nodejs.channel.post("message", msg);
  } else {
    const msg = {
      id: json.id,
      method: json.method,
      payload: "Not Closed",
      status: false,
    };
    nodejs.channel.post("message", msg);
  }
}

export function openDashboard(port) {
  cordova.InAppBrowser.open(
    `http://127.0.0.1:${port}/api/ui/`,
    "_blank",
    "location=no,zoom=no,presentationstyle=fullscreen,toolbar=no",
  );
}

export function launchNodeRED(url) {
  cordova.InAppBrowser.open(url, "_system");
}

export function startIfNeeded(json) {
  if (json.method === "browser-open") {
    open(json);
  } else if (json.method === "browser-close") {
    close(json);
  }
}
