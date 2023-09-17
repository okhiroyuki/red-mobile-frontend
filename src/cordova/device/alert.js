const method = "alert";

function onDismissed(id) {
  const msg = {
    id,
    method,
    status: true,
  };
  nodejs.channel.post("message", msg);
}

function show(_json) {
  const json = _json;
  if (json.payload.title === undefined) {
    json.payload.title = "Alert";
  }
  if (json.payload.buttonName === undefined) {
    json.payload.buttonName = "OK";
  }
  if (json.payload.message === undefined) {
    json.payload.message = "";
  }
  navigator.notification.alert(
    json.payload.message,
    () => {
      onDismissed(json.id);
    },
    json.payload.title,
    json.payload.buttonName,
  );
}

export default function startIfNeeded(json) {
  if (json.method === method) {
    show(json);
  }
}
