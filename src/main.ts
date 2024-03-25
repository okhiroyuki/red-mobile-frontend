import axios from "axios";
import { createApp } from "vue";
import VueAxios from "vue-axios";
import App from "./App.vue";
import * as Main from "./cordova/main";
import * as Purchase from "./cordova/purchase";
import { isCordova } from "./cordova/util";
import vuetify from "./plugins/vuetify";
import router from "./router";

const init = () => {
  const app = createApp(App);
  app.use(VueAxios, axios);
  app.use(router);
  app.use(vuetify);
  app.provide("axios", axios);
  app.provide("Main", Main);
  app.provide("Purchase", Purchase);
  app.mount("#app");
};

if (isCordova()) {
  Main.init(() => {
    console.log("onDeviceReady");
    Purchase.init();
    init();
  });
} else {
  init();
}
