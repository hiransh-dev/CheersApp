import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeView.vue";
import Menu from "@/views/MenuView.vue";
import Manage from "@/views/manage/ManagementView.vue";
import ManageLogin from "@/views/manage/ManagementLogin.vue";
import Error from "@/views/ErrorView.vue";
import axios from "axios";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  /* MENU ROUTE */
  {
    path: "/menu/:category",
    name: "menu",
    component: Menu
  },
  /* MANAGEMENT ROUTES */
  {
    path: "/manage/login",
    name: "manageLogin",
    component: ManageLogin,
    beforeEnter: async () => {
      const isManagement = await axios.get("/api/user/check");
      if (isManagement.data.isAdmin === true || isManagement.data.isStaff === true) {
        return { name: "manage" };
      } else {
        return true;
      }
    }
  },
  {
    path: "/manage",
    name: "manage",
    component: Manage,
    beforeEnter: async () => {
      const isManagement = await axios.get("/api/user/check");
      if (isManagement.data.isAdmin === true || isManagement.data.isStaff === true) {
        return true;
      } else {
        return { name: "manageLogin" };
      }
    }
  },
  {
    path: "/:pathMatch(.*)",
    name: "error",
    component: Error
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  scrollBehavior(to) {
    if (to.path.includes("/menu/"))
      return {
        el: "#searchbar",
        top: 90
      };
  }
});

export default router;
