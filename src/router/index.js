import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      layout: "main",
      auth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      layout: "auth",
    },
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () => import("../components/Auth/SignUp"),
    meta: {
      layout: "auth",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth;
  if (requireAuth && store.getters["auth/isAuthenticated"]) {
    next();
  } else if (requireAuth && !store.getters["auth/isAuthenticated"]) {
    next("/auth?message=auth");
  } else {
    next();
  }
});

export default router;
