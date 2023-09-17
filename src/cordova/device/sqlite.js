function sendMessage(msg) {
  nodejs.channel.post("message", msg);
}

function sendError(json, err) {
  const msg = {
    id: json.id,
    method: json.method,
    payload: err.message,
    status: false,
  };
  sendMessage(msg);
}

function openDatabase(json, successCallback) {
  window.sqlitePlugin.openDatabase({
    name: json.dbname,
    location: "default",
    androidDatabaseProvider: "system",
  }, (db) => {
    successCallback(db);
  }, (err) => {
    sendError(json, err);
  });
}

function getRows(resultSet) {
  if (resultSet.rows.length === 0) {
    return null;
  }
  const items = [];
  for (let i = 0; i < resultSet.rows.length; i += 1) {
    items.push(resultSet.rows.item(i));
  }
  return items;
}

function exec(json) {
  openDatabase(json, (db) => {
    db.executeSql(json.payload, json.params, (resultSet) => {
      const msg = {
        id: json.id,
        method: json.method,
        payload: {
          insertId: resultSet.insertId,
          rowsAffected: resultSet.rowsAffected,
          length: resultSet.rows.length,
          rows: getRows(resultSet),
        },
        status: true,
      };
      sendMessage(msg);
    }, (err) => {
      sendError(json, err);
    });
  });
}

function batch(json) {
  openDatabase(json, (db) => {
    db.sqlBatch(json.payload, () => {
      const msg = {
        id: json.id,
        method: json.method,
        payload: "",
        status: true,
      };
      sendMessage(msg);
    }, (err) => {
      sendError(json, err);
    });
  });
}

function closeDatabase(json) {
  openDatabase(json, (db) => {
    db.close(() => {
      const msg = {
        id: json.id,
        method: json.method,
        payload: "success",
        status: true,
      };
      sendMessage(msg);
    }, (err) => {
      sendError(json, err);
    });
  });
}

function deleteDatabase(json) {
  window.sqlitePlugin.deleteDatabase({ name: json.dbname, location: "default" }, () => {
    const msg = {
      id: json.id,
      method: json.method,
      payload: "deleted",
      status: true,
    };
    sendMessage(msg);
  }, (err) => {
    sendError(json, err);
  });
}

export default function startIfNeeded(json) {
  if (json.method === "sqlite-all") {
    exec(json);
  }
  if (json.method === "sqlite-exec") {
    batch(json);
  }
  if (json.method === "sqlite-delete") {
    deleteDatabase(json);
  }
  if (json.method === "sqlite-close") {
    closeDatabase(json);
  }
}
