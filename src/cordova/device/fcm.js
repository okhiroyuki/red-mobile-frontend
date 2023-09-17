function setMessageReceived() {
  FirebasePlugin.onMessageReceived((message) => {
    const msg = {
      id: "dummy",
      method: "ws-fcm",
      type: "send",
      payload: message,
    };
    nodejs.channel.post("message", msg);
  }, (error) => {
    // eslint-disable-next-line no-console
    console.error(error);
  });
}

function onTokenRefresh() {
  FirebasePlugin.onTokenRefresh((fcmToken) => {
    const msg = {
      id: "dummy",
      method: "ws-firebase-token",
      type: "send",
      payload: {
        token: fcmToken,
      },
    };
    nodejs.channel.post("message", msg);
  }, (error) => {
    // eslint-disable-next-line no-console
    console.error(error);
  });
}

function getToken(json) {
  const msg = {
    id: json.id,
    method: json.method,
  };
  FirebasePlugin.getToken((fcmToken) => {
    msg.payload = fcmToken;
    msg.status = true;
    nodejs.channel.post("message", msg);
  }, (error) => {
    msg.payload = error.message;
    msg.status = false;
    nodejs.channel.post("message", msg);
  });
}

export function init() {
  FirebasePlugin.setAnalyticsCollectionEnabled(true);
  FirebasePlugin.setPerformanceCollectionEnabled(true);
  FirebasePlugin.setCrashlyticsCollectionEnabled(true);
  setMessageReceived();
  onTokenRefresh();
}

export function startIfNeeded(json) {
  if (json.method === "fcm-token") {
    getToken(json);
  }
}
