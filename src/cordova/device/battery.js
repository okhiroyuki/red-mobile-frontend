let batteryStatus;
const method = "battery";

function onBatteryStatus(status) {
  batteryStatus = {
    level: status.level,
    isPlugged: status.isPlugged,
    timestamp: new Date().getTime(),
  };
}

function sendBatteryStatus(json) {
  const msg = {
    id: json.id,
    method: json.method,
  };
  if (batteryStatus !== undefined) {
    msg.payload = batteryStatus;
    msg.status = true;
  } else {
    msg.status = false;
  }
  nodejs.channel.post("message", msg);
}

export function init() {
  window.addEventListener("batterystatus", onBatteryStatus, false);
}

export function startIfNeeded(json) {
  if (json.method === method) {
    sendBatteryStatus(json);
  }
}
