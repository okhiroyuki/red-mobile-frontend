import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import { mdiMenu, mdiArrowLeft } from "@mdi/js";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Upload.vue"),
  },
  {
    path: "/setting",
    name: "Setting",
    meta: {
      title: "Setting",
      icon: mdiArrowLeft,
      tab: false,
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Setting.vue"),
  },
  {
    path: "/license",
    name: "License",
    meta: {
      title: "License",
      icon: mdiArrowLeft,
      tab: false,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/License.vue"),
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
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Policy.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
