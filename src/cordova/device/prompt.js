const method = "prompt";

function onPrompt(id, result) {
  const msg = {
    id,
    method,
    payload: {
      buttonIndex: result.buttonIndex,
      input1: result.input1,
    },
    status: true,
  };
  nodejs.channel.post("message", msg);
}

function show(_json) {
  const json = _json;
  if (json.payload.title === undefined) {
    json.payload.title = "Prompt";
  }
  if (json.payload.buttonLabels === undefined) {
    json.payload.buttonLabels = ["OK", "Cancel"];
  }
  if (json.payload.message === undefined) {
    json.payload.message = "";
  }
  if (json.payload.defaultText === undefined) {
    json.paylad.defaultText = "";
  }
  navigator.notification.prompt(
    json.payload.message,
    (result) => {
      onPrompt(json.id, result);
    },
    json.payload.title,
    json.payload.buttonLabels,
    json.payload.defaultText,
  );
}

export default function startIfNeeded(json) {
  if (json.method === method) {
    show(json);
  }
}
