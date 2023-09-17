const method = "text-to-speech";
let isStarted = false;

function error(id, message) {
  const msg = {
    id,
    method,
    payload: message,
    status: false,
  };
  nodejs.channel.post("message", msg);
  isStarted = false;
}

function start(json) {
  if (
    json.payload !== undefined &&
    json.payload.text !== undefined &&
    json.payload.lang !== undefined
  ) {
    const u = new SpeechSynthesisUtterance();
    u.text = json.payload.text;
    u.lang = json.payload.lang;
    speechSynthesis.speak(u);
    const msg = {
      id: json.id,
      method: json.method,
      status: true,
    };
    nodejs.channel.post("message", msg);
    isStarted = false;
  } else {
    error(json.id, "parameter error");
  }
}

export default function startIfNeeded(json) {
  if (json.method === method && !isStarted) {
    isStarted = true;
    start(json);
  }
}
