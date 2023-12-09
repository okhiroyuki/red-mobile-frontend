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
        for (const element of view) {
          // if we received a \n, the message is complete, display it
          if (element === 13) {
            lastReadString = str;
            sendWs(json.id, lastReadString);
            str = "";
          } else if (element !== 10) {
            const tempStr = String.fromCharCode(element);
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

function getBaudRate(json) {
  if (json.options) {
    return Number(json.options.baudRate);
  } else {
    return Number(json.opts.baudRate);
  }
}

function getDataBits(json) {
  if (json.options) {
    return Number(json.options.dataBits);
  } else {
    return Number(json.opts.dataBits);
  }
}

function getStopBits(json) {
  if (json.options) {
    return Number(json.options.stopBits);
  } else {
    return Number(json.opts.stopBits);
  }
}

function getParity(json) {
  const parity = json.options ? json.options.parity : json.opts.parity;
  if (parity === "odd") {
    return 1;
  } else if (parity === "even") {
    return 2;
  } else {
    return 0;
  }
}

function getDTR(json) {
  const dtr = json.options ? json.options.dtr : json.opts.dtr;
  return dtr === "true";
}

function getRTS(json) {
  const rts = json.options ? json.options.rts : json.opts.rts;
  return rts === "true";
}

function getoptions(json) {
  return {
    baudRate: getBaudRate(json),
    dataBits: getDataBits(json),
    stopBits: getStopBits(json),
    parity: getParity(json),
    dtr: getDTR(json),
    rts: getRTS(json),
    sleepOnPause: true,
  };
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
