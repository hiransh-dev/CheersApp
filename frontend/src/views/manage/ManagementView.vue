<template>
  <v-layout class="rounded rounded-md w-100 mt-2">
    <v-app-bar class="bg-yellow-darken-3" title="Management"></v-app-bar>
    <v-navigation-drawer class="bg-black">
      <v-list>
        <v-list-item>
          <v-btn @click="mainContentComponent = 'AppOrdersPending'" variant="outlined" block>
            Pending Orders
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn @click="mainContentComponent = 'AppOrdersHistory'" variant="outlined" block>
            Orders History
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn @click="mainContentComponent = 'AppUsers'" variant="outlined" block> Users </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn @click="mainContentComponent = 'AppStaff'" variant="outlined" block> Staff </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn @click="mainContentComponent = 'AppMenuManage'" variant="outlined" block>
            Menu
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="d-flex align-start justify-start ma-5" style="min-height: 100vh">
      <v-fade-transition>
        <component :is="mainContentComponent"></component>
      </v-fade-transition>
    </v-main>
  </v-layout>
</template>

<script>
import AppMenuManage from "@/components/manage/AppMenuManage.vue";
import AppOrdersPending from "@/components/manage/AppOrdersPending.vue";
import AppOrdersHistory from "@/components/manage/AppOrdersHistory.vue";
import AppStaff from "@/components/manage/AppStaff.vue";
import AppUsers from "@/components/manage/AppUsers.vue";

export default {
  name: "managementView",
  data() {
    return {
      mainContentComponent: "AppOrdersPending"
    };
  },
  components: {
    AppMenuManage,
    AppOrdersPending,
    AppOrdersHistory,
    AppStaff,
    AppUsers
  }
};
</script>

<style scoped></style>
