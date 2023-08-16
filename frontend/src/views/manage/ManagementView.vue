<template>
  <v-layout class="rounded rounded-md w-100 mt-2">
    <v-app-bar class="bg-yellow-darken-3" title="Management">
      <v-card class="bg-transparent d-flex justify-end" v-if="screenSmall" elevation="0">
        <v-btn v-show="!fullscreenMenu" @click.prevent="burgerClicked" icon>
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        <v-btn v-show="fullscreenMenu" @click.prevent="burgerClicked" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card>
    </v-app-bar>
    <v-navigation-drawer class="bg-black">
      <AppSidebar :managementLogout="managementLogout" :changeMainComponent="changeMainComponent">
        <template v-slot:nameCard>
          <v-card class="bg-yellow-darken-3" elevation="8">
            <v-card-title class="text-center">
              {{ authStore.username }}
            </v-card-title>
          </v-card>
        </template>
      </AppSidebar>
    </v-navigation-drawer>
    <!-- MINI MENU  -->
    <v-navigation-drawer
      v-model="fullscreenMenu"
      scrim="false"
      location="top"
      style="height: 30rem"
      temporary
    >
      <AppSidebar :managementLogout="managementLogout" :changeMainComponent="changeMainComponent">
        <template v-slot:nameCard>
          <v-card class="bg-yellow-darken-3" elevation="8">
            <v-card-title class="text-center">
              {{ authStore.username }}
            </v-card-title>
          </v-card>
        </template>
      </AppSidebar>
    </v-navigation-drawer>
    <!-- MAIN WINDOW  -->
    <v-main class="d-flex align-start justify-start ma-5" style="min-height: 100vh">
      <v-fade-transition mode="out-in" hide-on-leave="true">
        <component :is="mainContentComponent"></component>
      </v-fade-transition>
    </v-main>
  </v-layout>
</template>

<script>
import { mapStores } from "pinia";
import useauthStore from "@/stores/auth";
import axios from "axios";

import AppSidebar from "@/components/manage/AppSidebar.vue";
import AppOrdersPending from "@/components/manage/AppOrdersPending.vue";
import AppOrdersHistory from "@/components/manage/AppOrdersHistory.vue";
import AppOrdersCancelled from "@/components/manage/AppOrdersCancelled.vue";
import AppMenuManage from "@/components/manage/AppMenuManage.vue";
import AppUsers from "@/components/manage/AppUsers.vue";
import AppStaff from "@/components/manage/AppStaff.vue";

export default {
  name: "managementView",
  data() {
    return {
      screenSmall: false,
      fullscreenMenu: false,
      mainContentComponent: "AppOrdersPending",
      noOfAllPendingOrders: ""
    };
  },
  components: {
    AppSidebar,
    AppOrdersPending,
    AppOrdersHistory,
    AppOrdersCancelled,
    AppMenuManage,
    AppUsers,
    AppStaff
  },
  methods: {
    checkScreen() {
      if (window.innerWidth <= 1280) {
        this.screenSmall = true;
      } else {
        this.screenSmall = false;
        this.fullscreenMenu = false;
      }
    },
    burgerClicked() {
      this.fullscreenMenu = !this.fullscreenMenu;
    },
    async managementLogout() {
      const logoutStatus = await axios.get("/api/user/logout");
      if (logoutStatus.status === 200) {
        this.authStore.clearAuth();
        this.$router.push("/manage/login");
      }
    },
    changeMainComponent(to) {
      this.mainContentComponent = to;
    },
    changeNoOfAllPendingOrders(to) {
      this.noOfAllPendingOrders = to;
    }
  },
  computed: {
    ...mapStores(useauthStore)
  },
  mounted() {
    /* Could use CSS media Queries with "display: contents/none" for this, but this help me check if the fullscreenMenu is open/close */
    window.addEventListener("load", this.checkScreen);
    window.addEventListener("resize", this.checkScreen);
    this.authStore.checkLogin();
  },
  updated() {
    this.authStore.checkLogin();
  }
};
</script>

<style scoped></style>
