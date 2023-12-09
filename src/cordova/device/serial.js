let isConnected = false;
let str = "";
let lastReadString = "";

function sendWs(id, readString) {
  const msg = {
    id,
    method: "ws-serial",
    type: "send",
    payload: readString,
  };
  nodejs.channel.post("message", msg);
}

function registerReadCallback(json) {
  str = "";
  lastReadString = "";
  serial.registerReadCallback(
    (data) => {
      const view = new Uint8Array(data);
      if (view.length >= 1) {
        for (let i = 0; i < view.length; i += 1) {
          // if we received a \n, the message is complete, display it
          if (view[i] === 13) {
            lastReadString = str;
            sendWs(json.id, lastReadString);
            str = "";
          } else if (view[i] !== 10) {
            const tempStr = String.fromCharCode(view[i]);
            const strEsc = escape(tempStr);
            str += unescape(strEsc);
          }
        }
      }
    },
    () => {
      console.log("error");
    },
  );
}

function onError(json) {
  const msg = {
    id: json.id,
    method: json.method,
    payload: json.payload,
    status: false,
  };
  nodejs.channel.post("message", msg);
}

function successOpen(json) {
  isConnected = true;
  const msg = {
    id: json.id,
    method: "serial-open",
    payload: json.payload,
    status: true,
  };
  nodejs.channel.post("message", msg);
  registerReadCallback(json);
}

function getoptions(json) {
  const options = {
    baudRate: Number(json.options.baudRate),
    dataBits: Number(json.options.dataBits),
    stopBits: Number(json.options.stopBits),
    parity: 0,
    dtr: false,
    rts: false,
    sleepOnPause: true,
  };
  if (json.options.parity === "odd") {
    options.parity = 1;
  } else if (json.options.parity === "even") {
    options.parity = 2;
  }
  if (json.options.dtr === "true") {
    options.dtr = true;
  }
  if (json.options.rts === "true") {
    options.rts = true;
  }
  return options;
}

function open(_json) {
  const json = _json;
  serial.open(
    getoptions(json),
    (message) => {
      json.payload = message;
      successOpen(json);
    },
    (message) => {
      json.payload = message;
      onError(json);
    },
  );
}

function successClose(json) {
  const msg = {
    id: json.id,
    method: "serial-close",
    payload: json.payload,
    status: true,
  };
  nodejs.channel.post("message", msg);
}

function close(_json) {
  const json = _json;
  if (isConnected) {
    serial.close(
      (message) => {
        json.payload = message;
        successClose(json);
      },
      (message) => {
        json.payload = message;
        onError(json);
      },
    );
    isConnected = false;
  } else {
    json.payload = "Port is closed.";
    onError(json);
  }
}

function successWrite(json) {
  const msg = {
    id: json.id,
    method: "serial-write",
    payload: json.payload,
    status: true,
  };
  nodejs.channel.post("message", msg);
}

function write(_json) {
  const json = _json;
  if (isConnected) {
    if (json.dataType === "hex") {
      serial.writeHex(
        json.payload,
        (message) => {
          json.payload = message;
          successWrite(json);
        },
        (message) => {
          json.payload = message;
          onError(json);
        },
      );
    } else {
      serial.write(
        json.payload,
        (message) => {
          json.payload = message;
          successWrite(json);
        },
        (message) => {
          json.payload = message;
          onError(json);
        },
      );
    }
  } else {
    json.payload = "Port is closed.";
    onError(json);
  }
}

function requestPermission(_json) {
  const json = _json;
  serial.requestPermission(
    () => {
      open(json);
    },
    (message) => {
      json.payload = message;
      onError(json);
    },
  );
}

export default function startIfNeeded(json) {
  if (json.method === "serial-open") {
    requestPermission(json);
  } else if (json.method === "serial-write") {
    write(json);
  } else if (json.method === "serial-close") {
    close(json);
  }
}
