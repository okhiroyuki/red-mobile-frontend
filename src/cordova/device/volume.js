function validationVolume(volume) {
  if (volume < 0) {
    return 0;
  }
  if (volume > 100) {
    return 100;
  }
  return volume;
}

function sendError(json) {
  const msg = {
    id: json.id,
    method: json.method,
    payload: json.payload,
    status: false,
  };
  nodejs.channel.post("message", msg);
}

function set(json) {
  const volume = validationVolume(json.volume);
  const showToast = false;

  const success = () => {
    const msg = {
      id: json.id,
      method: "volume-set",
      payload: volume,
      status: true,
    };
    nodejs.channel.post("message", msg);
  };
  const error = () => {
    sendError(json);
  };

  if (json.target === "alarm") {
    window.androidVolume.setAlarm(volume, showToast, success, error);
  } else if (json.target === "dtmf") {
    window.androidVolume.setDTMF(volume, showToast, success, error);
  } else if (json.target === "music") {
    window.androidVolume.setMusic(volume, showToast, success, error);
  } else if (json.target === "ringer") {
    window.androidVolume.setRinger(volume, showToast, success, error);
  } else if (json.target === "system") {
    window.androidVolume.setSystem(volume, showToast, success, error);
  } else if (json.target === "voiceCall") {
    window.androidVolume.setVoiceCall(volume, showToast, success, error);
  } else if (json.target === "notification") {
    window.androidVolume.setNotification(volume, showToast, success, error);
  } else {
    window.androidVolume.setAll(volume, showToast, success, error);
  }
}

function get(json) {
  const success = (volume) => {
    const msg = {
      id: json.id,
      method: "volume-get",
      payload: volume,
      status: true,
    };
    nodejs.channel.post("message", msg);
  };
  const error = () => {
    sendError(json);
  };

  if (json.target === "alarm") {
    window.androidVolume.getAlarm(success, error);
  } else if (json.target === "dtmf") {
    window.androidVolume.getDTMF(success, error);
  } else if (json.target === "music") {
    window.androidVolume.getMusic(success, error);
  } else if (json.target === "ringer") {
    window.androidVolume.getRinger(success, error);
  } else if (json.target === "system") {
    window.androidVolume.getSystem(success, error);
  } else if (json.target === "voiceCall") {
    window.androidVolume.getVoiceCall(success, error);
  } else if (json.target === "notification") {
    window.androidVolume.getNotification(success, error);
  }
}

export default function startIfNeeded(json) {
  if (json.method === "volume-get") {
    get(json);
  }
  if (json.method === "volume-set") {
    set(json);
  }
}
