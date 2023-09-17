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
    }, () => {
      // eslint-disable-next-line no-console
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

function getOpts(json) {
  const opts = {
    baudRate: Number(json.opts.baudRate),
    dataBits: Number(json.opts.dataBits),
    stopBits: Number(json.opts.stopBits),
    parity: 0,
    dtr: false,
    rts: false,
    sleepOnPause: true,
  };
  if (json.opts.parity === "odd") {
    opts.parity = 1;
  } else if (json.opts.parity === "even") {
    opts.parity = 2;
  }
  if (json.opts.dtr === "true") {
    opts.dtr = true;
  }
  if (json.opts.rts === "true") {
    opts.rts = true;
  }
  return opts;
}

function open(_json) {
  const json = _json;
  serial.open(getOpts(json), (message) => {
    json.payload = message;
    successOpen(json);
  }, (message) => {
    json.payload = message;
    onError(json);
  });
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
    serial.close((message) => {
      json.payload = message;
      successClose(json);
    }, (message) => {
      json.payload = message;
      onError(json);
    });
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
      serial.writeHex(json.payload, (message) => {
        json.payload = message;
        successWrite(json);
      }, (message) => {
        json.payload = message;
        onError(json);
      });
    } else {
      serial.write(json.payload, (message) => {
        json.payload = message;
        successWrite(json);
      }, (message) => {
        json.payload = message;
        onError(json);
      });
    }
  } else {
    json.payload = "Port is closed.";
    onError(json);
  }
}

function requestPermission(_json) {
  const json = _json;
  serial.requestPermission(() => {
    open(json);
  }, (message) => {
    json.payload = message;
    onError(json);
  });
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
