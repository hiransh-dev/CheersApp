import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeView.vue";
import Drinks from "@/views/DrinksView.vue";
import ManageMenu from "@/views/management/ManagementMenuView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/drinks",
    name: "drinks",
    component: Drinks
  },
  {
    path: "/manage/menu",
    name: "managemenu",
    component: ManageMenu
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
});

export default router;
