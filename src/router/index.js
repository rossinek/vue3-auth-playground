import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: { name: "PublicPageOne" },
  },
  {
    path: "/login",
    name: "AuthLogin",
    component: () => import("@/views/AuthLogin.vue"),
  },
  {
    path: "/register",
    name: "AuthRegister",
    component: () => import("@/views/AuthRegister.vue"),
  },
  {
    path: "/public-page-one",
    name: "PublicPageOne",
    component: () => import("@/views/PublicPageOne.vue"),
  },
  {
    path: "/public-page-two",
    name: "PublicPageTwo",
    component: () => import("@/views/PublicPageTwo.vue"),
  },
  {
    path: "/private-page-one",
    name: "PrivatePageOne",
    component: () => import("@/views/PrivatePageOne.vue"),
  },
  {
    path: "/private-page-two",
    name: "PrivatePageTwo",
    component: () => import("@/views/PrivatePageTwo.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
