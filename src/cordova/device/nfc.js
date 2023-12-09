function canExec(json) {
  return json.options.sensor === "nfc";
}

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

function onSuccess(id, nfcTag) {
  const msg = {
    id,
    method: "ws-nfc",
    type: "send",
    payload: nfcTag,
  };
  nodejs.channel.post("message", msg);
}

function onError(id, error) {
  const msg = {
    id,
    method: "ws-nfc",
    type: "send",
    payload: error,
  };
  nodejs.channel.post("message", msg);
}

export function startWatch(json) {
  if (canExec(json)) {
    callbackSuccess(json.id, "sensor-subscribe");
    nfc.readerMode(
      nfc.FLAG_READER_NFC_A || nfc.FLAG_READER_NO_PLATFORM_SOUNDS,
      (nfcTag) => {
        onSuccess(json, nfcTag);
      },
      (error) => {
        onError(json.id, error);
      },
    );
  }
}

export function stopWatch(json) {
  if (canExec(json)) {
    const method = "sensor-unsubscribe";
    nfc.disableReaderMode(
      () => {
        callbackSuccess(json.id, method);
      },
      () => {
        callbackError(json.id, method, "Not subscribed");
      },
    );
  }
}
