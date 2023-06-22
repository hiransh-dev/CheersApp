import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeView.vue";
import Menu from "@/views/MenuView.vue";
import ManageMenu from "@/views/manage/ManagementMenuView.vue";
import Manage from "@/views/manage/ManagementView.vue";

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
    path: "/manage",
    name: "manage",
    component: Manage
  },
  {
    path: "/manage/menu",
    name: "manageMenu",
    component: ManageMenu
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
