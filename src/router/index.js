import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { mdiMenu, mdiArrowLeft } from "@mdi/js";
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
      meta: {
        title: "RedMobile",
        icon: mdiMenu,
        tab: false,
      },
    },
    {
      path: "/upload",
      name: "Upload",
      component: UploadView,
      meta: {
        title: "Upload",
        icon: mdiArrowLeft,
        tab: true,
      },
    },
    {
      path: "/setting",
      name: "Setting",
      component: SettingView,
      meta: {
        title: "Setting",
        icon: mdiArrowLeft,
        tab: false,
      },
    },
    {
      path: "/license",
      name: "License",
      component: LicenseView,
      meta: {
        title: "License",
        icon: mdiArrowLeft,
        tab: false,
      },
    },
    {
      path: "/forum",
      name: "Forum",
      meta: {
        title: "Forum",
        icon: mdiArrowLeft,
        tab: false,
      },
      beforeEnter() {
        window.location =
          "https://groups.google.com/forum/?hl=ja#!forum/redmobile-apps";
      },
    },
    {
      path: "/policy",
      name: "Privacy Policy",
      component: PolicyView,
      meta: {
        title: "Privacy Policy",
        icon: mdiArrowLeft,
        tab: false,
      },
    },
  ],
});

export default router;
