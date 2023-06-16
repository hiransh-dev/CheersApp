import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeView.vue";
import Drinks from "@/views/DrinksView.vue";
import ManageDrinks from "@/views/management/ManagementDrinksView.vue";

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
    path: "/manage/drinks",
    name: "managedrinks",
    component: ManageDrinks
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
  // scrollBehavior() {
  //   // always scroll to top
  //   return { top: 0 };
  // }
});

export default router;
