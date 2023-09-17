const method = "speech-to-text";
let isStarted = false;

function sendSuccess(id, results) {
  const msg = {
    id,
    method,
    payload: results,
    status: true,
  };
  nodejs.channel.post("message", msg);
  isStarted = false;
}

function sendError(id, error) {
  const msg = {
    id,
    method,
    payload: error.message,
    status: false,
  };
  nodejs.channel.post("message", msg);
  isStarted = false;
}

function start(json) {
  const options = json.payload;
  options.showPartial = false;
  window.plugins.speechRecognition.requestPermission(() => {
    window.plugins.speechRecognition.isRecognitionAvailable(
      () => window.plugins.speechRecognition.startListening((results) => {
        sendSuccess(json.id, results);
      }, (error) => {
        sendError(json.id, error);
      }, options),
      (error) => {
        sendError(json.id, error);
      },
    );
  }, (error) => {
    sendError(json.id, error);
  });
}

export default function startIfNeeded(json) {
  if (json.method === method && !isStarted) {
    isStarted = true;
    start(json);
  }
}
