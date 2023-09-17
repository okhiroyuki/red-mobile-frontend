function onSuccess(json) {
  const msg = {
    id: json.id,
    method: json.method,
    status: true,
  };
  nodejs.channel.post("message", msg);
}

function onError(json) {
  const msg = {
    id: json.id,
    method: json.method,
    status: false,
  };
  nodejs.channel.post("message", msg);
}

function startActivity(json) {
  window.plugins.intentShim.startActivity(
    json.payload,
    () => {
      onSuccess(json);
    },
    () => {
      onError(json);
    },
  );
}

export default function startIfNeeded(json) {
  if (json.method === "intent-start-activity") {
    startActivity(json);
  }
}
