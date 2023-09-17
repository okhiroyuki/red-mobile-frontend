function startScan(json) {
  cordova.plugins.barcodeScanner.scan((result) => {
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
  }, json.opts);
}

export default function startIfNeeded(json) {
  if (json.method === "qrcode-scan") {
    startScan(json);
  }
}
