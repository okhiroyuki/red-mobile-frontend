const method = "db";
let isStarted = false;
let canStop = true;
let dbs;
let timestamp;

const arrMin = (arr) => Math.min(...arr);
const arrMax = (arr) => Math.max(...arr);
const calcPowerAverage = (arr) => {
  let sum = 0;
  for (let i = 0; i < arr.length; i += 1) {
    sum += 10 ** (arr[i] / 10);
  }
  return 10 * Math.log10(sum / arr.length);
};

function stopSuccess(json) {
  const msg = {
    id: json.id,
    method,
    payload: {
      max: arrMax(dbs),
      min: arrMin(dbs),
      avg: calcPowerAverage(dbs),
      timestamp,
    },
    status: true,
  };
  nodejs.channel.post("message", msg);
  isStarted = false;
}

function sendError(error, json) {
  const msg = {
    id: json.id,
    method,
    payload: error.message,
    status: false,
  };
  nodejs.channel.post("message", msg);
  isStarted = false;
}
function stop(json) {
  DBMeter.stop(
    () => {
      stopSuccess(json);
    },
    (err) => {
      sendError(err, json);
    },
  );
}

function startSuccess(db, json) {
  if (!canStop) return;
  if (dbs.length > 10) {
    canStop = false;
    stop(json);
  } else if (db > 20) {
    dbs.push(db);
  }
}

function start(json) {
  dbs = [];
  timestamp = new Date().getTime();
  canStop = true;
  DBMeter.start(
    (db) => {
      startSuccess(db, json);
    },
    (err) => {
      sendError(err, json);
    },
  );
}

export default function startIfNeeded(json) {
  if (json.method === method && !isStarted) {
    isStarted = true;
    start(json);
  }
}
