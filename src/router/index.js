/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";
import LoginRouter from "../router/auth.router";
import HomeRouter from "../router/home.router";
import { isAuthenticated } from "../helpers/auth.helper";
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
    },
    LoginRouter,
    HomeRouter,
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.auth) {
    if (await isAuthenticated()) {
      next();
    } else next({ name: "login" });
  } else next();
});
export default router;

