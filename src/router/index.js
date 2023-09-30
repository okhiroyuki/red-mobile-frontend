import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UploadView from "../views/UploadView.vue";
import SettingView from "../views/SettingView.vue";
import LicenseView from "../views/LicenseView.vue";
import PolicyView from "../views/PolicyView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/upload",
      name: "Upload",
      component: UploadView,
    },
    {
      path: "/setting",
      name: "Setting",
      component: SettingView,
    },
    {
      path: "/license",
      name: "License",
      component: LicenseView,
    },
    {
      path: "/forum",
      name: "Forum",
      beforeEnter() {
        window.location =
          "https://groups.google.com/forum/?hl=ja#!forum/redmobile-apps";
      },
    },
    {
      path: "/policy",
      name: "Privacy Policy",
      component: PolicyView,
    },
  ],
});

export default router;
