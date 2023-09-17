import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "RedMobile",
      icon: "mdi-menu",
      tab: false,
    },
  },
  {
    path: "/upload",
    name: "Upload",
    meta: {
      title: "Upload",
      icon: "mdi-arrow-left",
      tab: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/Upload.vue"),
  },
  {
    path: "/setting",
    name: "Setting",
    meta: {
      title: "Setting",
      icon: "mdi-arrow-left",
      tab: false,
    },
    component: () => import(/* webpackChunkName: "about" */ "../views/Setting.vue"),
  },
  {
    path: "/license",
    name: "License",
    meta: {
      title: "License",
      icon: "mdi-arrow-left",
      tab: false,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/License.vue"),
  },
  {
    path: "/forum",
    name: "Forum",
    meta: {
      title: "Forum",
      icon: "mdi-arrow-left",
      tab: false,
    },
    beforeEnter() {
      window.location = "https://groups.google.com/forum/?hl=ja#!forum/redmobile-apps";
    },
  },
  {
    path: "/policy",
    name: "Privacy Policy",
    meta: {
      title: "Privacy Policy",
      icon: "mdi-arrow-left",
      tab: false,
    },
    component: () => import(/* webpackChunkName: "about" */ "../views/Policy.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
