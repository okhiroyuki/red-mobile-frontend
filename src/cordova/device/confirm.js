const method = "confirm";

function onConfirm(id, buttonIndex) {
  const msg = {
    id,
    method,
    payload: {
      buttonIndex,
    },
    status: true,
  };
  nodejs.channel.post("message", msg);
}

function show(_json) {
  const json = _json;
  if (json.payload.title === undefined) {
    json.payload.title = "Confirm";
  }
  if (json.payload.buttonLabels === undefined) {
    json.payload.buttonLabels = ["OK", "Cancel"];
  }
  if (json.payload.message === undefined) {
    json.payload.message = "";
  }
  navigator.notification.confirm(
    json.payload.message,
    (choice) => {
      onConfirm(json.id, choice);
    },
    json.payload.title,
    json.payload.buttonLabels,
  );
}

export default function startIfNeeded(json) {
  if (json.method === method) {
    show(json);
  }
}
