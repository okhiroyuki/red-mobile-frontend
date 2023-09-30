export function init() {
  cordova.plugins.backgroundMode.setDefaults({
    title: "Node-RED is running in background",
    text: "If you want to stop, please quit the app.",
  });
  cordova.plugins.backgroundMode.enable();
  // cordova.plugins.backgroundMode.overrideBackButton();
  cordova.plugins.backgroundMode.on("activate", () => {
    cordova.plugins.backgroundMode.disableWebViewOptimizations();
  });
}

export function moveToBackground() {
  cordova.plugins.backgroundMode.moveToBackground();
}
