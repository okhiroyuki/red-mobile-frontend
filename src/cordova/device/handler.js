import Alert from "./alert";
import * as Battery from "./battery";
import Beep from "./beep";
import * as Ble from "./ble";
import * as Camera from "./camera";
import Clipboard from "./clipboard";
import * as Compass from "./compass";
import Confirm from "./confirm";
import DB from "./db";
import * as Fcm from "./fcm";
import * as GeoLocation from "./geolocation";
import * as Gyroscope from "./gyroscope";
import * as InAppBrowser from "./inAppBrowser";
import Intent from "./intent";
import * as Light from "./light";
import * as Magnetic from "./magnetic";
import MLKit from "./mlkit";
import * as Motion from "./motion";
import * as Network from "./network";
import Prompt from "./prompt";
import * as Proximity from "./proximity";
import QRCode from "./qrcode";
import Recognition from "./recognition";
import Serial from "./serial";
import Speech from "./speech";
import SQLite from "./sqlite";
import Vibrate from "./vibrate";
import Volume from "./volume";
import * as NFC from "./nfc";

export function sensorManager(json) {
  if (json.method === "sensor-subscribe") {
    Compass.startWatch(json);
    GeoLocation.startWatch(json);
    Gyroscope.startWatch(json);
    Light.startWatch(json);
    Magnetic.startWatch(json);
    Motion.startWatch(json);
    Proximity.startWatch(json);
    NFC.startWatch(json);
  }
  if (json.method === "sensor-unsubscribe") {
    Compass.stopWatch(json);
    GeoLocation.stopWatch(json);
    Gyroscope.stopWatch(json);
    Light.stopWatch(json);
    Magnetic.stopWatch(json);
    Motion.stopWatch(json);
    Proximity.stopWatch(json);
    NFC.stopWatch(json);
  }
}

export function start(json) {
  Battery.startIfNeeded(json);
  Recognition(json);
  Speech(json);
  InAppBrowser.startIfNeeded(json);
  Vibrate(json);
  Beep(json);
  Confirm(json);
  Alert(json);
  Prompt(json);
  DB(json);
  Camera.startIfNeeded(json);
  Serial(json);
  Volume(json);
  Intent(json);
  SQLite(json);
  Ble.startIfNeeded(json);
  Clipboard(json);
  Fcm.startIfNeeded(json);
  QRCode(json);
  MLKit(json);
  sensorManager(json);
}

export function init() {
  Battery.init();
  Network.init();
  Ble.init();
  Fcm.init();
}
