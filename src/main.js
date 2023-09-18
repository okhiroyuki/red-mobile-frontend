import { createApp, h } from "vue";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import * as Main from "./cordova/main";
import * as Util from "./cordova/util";
import * as Env from "./cordova/env";
import * as Version from "./cordova/version";
import * as Modules from "./cordova/modules";
import vuetify from "./plugins/vuetify";
import router from "./router";

let ip;
let status;
let selectTab;
let owned;
let hasModules;
let sidebar;

const permission = {
  camera: false,
  mic: false,
  location: false,
  storage: false,
  bluetooth: false,
};

const app = createApp({
  data: () => ({
    ip,
    status,
    selectTab,
    owned,
    hasModules,
    permission,
    sidebar,
  }),

  beforeCreate() {
    sidebar = false;
    Main.init(this);
  },
  methods: {
    start(user, pass, port) {
      this.status = "start";
      Main.start(user, pass, port);
    },
    validatePort(port) {
      return Util.validatePort(port);
    },
    validateLogin(user, pass) {
      return Util.validateLogin(user, pass);
    },
    setKeepAwake(val) {
      Util.setKeepAwake(val);
    },
    launchNodeRED(url) {
      Main.launchNodeRED(url);
    },
    openDashboard() {
      Main.openDashboard();
    },
    envWrite(data) {
      Env.write(data);
    },
    envRemove() {
      Env.remove();
    },
    getItem(item, defaultValue) {
      const val = window.localStorage.getItem(item);
      if (val !== null) {
        return val;
      }
      return defaultValue;
    },
    getBooleanItem(item, defaultValue) {
      const val = window.localStorage.getItem(item);
      if (val === "true") {
        return true;
      }
      return defaultValue;
    },
    getVersion() {
      return Version.get();
    },
    hasEnv() {
      return this.getItem("env", null) === "enable";
    },
    requestPermission(val) {
      Main.requestPermission(val);
    },
    copyNodeModules(src) {
      return Modules.copy(src);
    },
    removeNodeModules() {
      return Modules.remove();
    },
    order() {
      return Main.order();
    },
    canPurchase() {
      return Main.canPurchase();
    },
    getFile(accept) {
      return Util.getFile(accept);
    },
    reset() {
      return Main.reset();
    },
    requestReview() {
      return Util.requestReview();
    },
  },
  render() {
    return h(App);
  },
});

app.config.productionTip = false;

app.use(VueAxios, axios);
app.use(router);
app.use(vuetify);

app.mount("#app");
