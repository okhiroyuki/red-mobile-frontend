const method = "beep";

function start(json) {
  navigator.notification.beep(json.payload);
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
