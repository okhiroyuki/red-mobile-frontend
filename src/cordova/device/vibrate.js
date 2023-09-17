const method = "vibrate";
function start(json) {
  navigator.vibrate(json.payload);
  const msg = {
    id: json.id,
    method: json.method,
    status: true,
  };
  nodejs.channel.post("message", msg);
}

export default function startIfNeeded(json) {
  if (json.method === method) {
    start(json);
  }
}
