function sendSuccess(json, result) {
  const msg = {
    id: json.id,
    method: json.method,
    payload: result,
    status: true,
  };
  nodejs.channel.post("message", msg);
}

function sendError(json, error) {
  const msg = {
    id: json.id,
    method: json.method,
    payload: error.message,
    status: false,
  };
  nodejs.channel.post("message", msg);
}

function startTextRecognizer(json) {
  MLKit.onDeviceTextRecognizer(
    json.payload,
    (result) => sendSuccess(json, result),
    (error) => sendError(json, error),
  );
}

function startBarcodeDetector(json) {
  MLKit.barcodeDetector(
    json.payload,
    (result) => sendSuccess(json, result),
    (error) => sendError(json, error),
  );
}

function startImageLabeler(json) {
  MLKit.imageLabeler(
    json.payload,
    (result) => sendSuccess(json, result),
    (error) => sendError(json, error),
  );
}

export default function startIfNeeded(json) {
  if (json.method === "barcode-detector") {
    startBarcodeDetector(json);
  } else if (json.method === "image-labeler") {
    startImageLabeler(json);
  } else if (json.method === "text-recognizer") {
    startTextRecognizer(json);
  }
}
