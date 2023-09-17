let shortcuts = {};

const defaultShortcuts = [{
  id: "show-dashboard",
  shortLabel: "Dashboard",
  longLabel: "Show Node-RED Dashboard",
  iconFromResource: "ic_dashboard",
  intent: {
    action: "android.intent.action.VIEW",
    categories: [
      "android.intent.category.DEFAULT",
    ],
    flags: 67108864,
    data: "redmobile://dashboard/show",
  },
}];

function onError(e) {
  // eslint-disable-next-line no-console
  console.log(`Error: ${e}`);
}

const pinShortcuts = [{
  id: "pin-dashboard",
  shortLabel: "pin Dashboard",
  longLabel: "Pin Node-RED Dashboard",
  iconFromResource: "ic_dashboard",
  intent: {
    action: "android.intent.action.VIEW",
    categories: [
      "android.intent.category.DEFAULT",
    ],
    flags: 67108864,
    data: "redmobile://dashboard/pin",
  },
}];

function setDynamicShortcutIfAbaialbe() {
  window.plugins.Shortcuts.supportsDynamic((supported) => {
    if (supported) {
      window.plugins.Shortcuts.setDynamic(shortcuts, () => {
      }, (e) => {
        onError(e);
      });
    }
  }, (e) => {
    onError(e);
  });
}

function checkPinSupport() {
  window.plugins.Shortcuts.supportsPinned((supported) => {
    if (supported) {
      for (let i = 0; i < pinShortcuts.length; i += 1) {
        shortcuts.push(pinShortcuts[i]);
      }
      setDynamicShortcutIfAbaialbe();
    } else {
      setDynamicShortcutIfAbaialbe();
    }
  }, (e) => {
    onError(e);
    setDynamicShortcutIfAbaialbe();
  });
}

function pinDashboard() {
  const shortcut = {
    id: "show-dashboard",
    shortLabel: "Dashboard",
    longLabel: "Show Node-RED Dashboard",
    iconFromResource: "ic_dashboard",
    intent: {
      action: "android.intent.action.VIEW",
      categories: [
        "android.intent.category.DEFAULT",
      ],
      flags: 67108864,
      data: "redmobile://dashboard/show",
    },
  };
  window.plugins.Shortcuts.addPinned(shortcut, () => {
  }, (e) => {
    onError(e);
  });
}

export function init() {
  shortcuts = defaultShortcuts;
  checkPinSupport();
}
export function pin(params) {
  if (params === "dashboard") {
    pinDashboard();
  }
}
