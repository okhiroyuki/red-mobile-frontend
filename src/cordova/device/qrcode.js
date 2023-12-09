function getOptions(json) {
  if (json.options) {
    return json.options;
  } else {
    return json.opts;
  }
}

function startScan(json) {
  cordova.plugins.barcodeScanner.scan(
    (result) => {
      const msg = {
        id: json.id,
        method: json.method,
        status: true,
        payload: result,
      };
      nodejs.channel.post("message", msg);
    },
    (error) => {
      const msg = {
        id: json.id,
        method: json.method,
        status: false,
        payload: error.message,
      };
      nodejs.channel.post("message", msg);
    },
    getOptions(json),
  );
}

export default function startIfNeeded(json) {
  if (json.method === "qrcode-scan") {
    startScan(json);
  }
}
