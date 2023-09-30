import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import * as Main from "./cordova/main";
import { isCordova } from "./cordova/util";
import * as Purchase from "./cordova/purchase";
import vuetify from "./plugins/vuetify";
import router from "./router";

const init = () => {
  const app = createApp(App);
  app.config.productionTip = false;
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
