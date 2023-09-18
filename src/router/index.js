import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { mdiMenu, mdiArrowLeft } from "@mdi/js";

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
      meta: {
        title: "Upload",
        icon: mdiArrowLeft,
        tab: true,
      },
      component: () => import("../views/UploadView.vue"),
    },
    {
      path: "/setting",
      name: "Setting",
      meta: {
        title: "Setting",
        icon: mdiArrowLeft,
        tab: false,
      },
      component: () => import("../views/SettingView.vue"),
    },
    {
      path: "/license",
      name: "License",
      meta: {
        title: "License",
        icon: mdiArrowLeft,
        tab: false,
      },
      component: () => import("../views/LicenseView.vue"),
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
      meta: {
        title: "Privacy Policy",
        icon: mdiArrowLeft,
        tab: false,
      },
      component: () => import("../views/PolicyView.vue"),
    },
  ],
});

export default router;
