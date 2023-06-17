import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeView.vue";
import Menu from "@/views/MenuView.vue";
import ManageMenu from "@/views/management/ManagementMenuView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/menu/drinks",
    name: "drinksMenu",
    component: Menu
  },
  {
    path: "/manage/menu",
    name: "managemenu",
    component: ManageMenu
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  scrollBehavior() {
    return {
      el: "#searchbar",
      top: 90
    };
  }
});

export default router;
