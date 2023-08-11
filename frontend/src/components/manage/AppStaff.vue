<template>
  <div class="d-flex flex-column w-100">
    <v-card
      v-if="authStore.isAdmin === true"
      class="my-2 mx-2 bg-black d-flex justify-center align-center"
      style="height: 8rem; width: auto; padding: 1rem"
      @click="dialogAddNew = true"
    >
      <v-icon size="x-large">mdi-plus</v-icon>
      <label class="text-h4">Add new Management Account</label>
    </v-card>
    <v-dialog
      v-model="dialogAddNew"
      class="bg-grey-lighten-2"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <v-card class="container">
        <v-toolbar class="bg-black" dark>
          <v-toolbar-title class="site_font">Register Staff</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn variant="text" @click="dialogAddNew = false"> Close </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <label class="site_font text-h4 text-center my-5 mx-5">Add new Management Account</label>
        <div class="desktop_container w-100">
          <AppStaffNew></AppStaffNew>
        </div>
      </v-card>
    </v-dialog>
    <div class="d-flex flex-row flex-wrap">
      <v-card
        class="d-flex flex-column ma-2 pa-2 bg-blue-darken-4"
        v-for="user of allUserInfo"
        :key="user._id"
      >
        <v-card-title>
          <label>Name: {{ user.firstName }} {{ user.lastName }}</label
          ><br />
          <label>Email: {{ user.email }}</label>
        </v-card-title>
        <v-card-subtitle>{{ user._id }}</v-card-subtitle>
        <v-card-text>
          <v-divider thickness="4" color="black"></v-divider>
          Phone Number: {{ user.phoneNumber }} <br />
          <v-divider thickness="4" color="black"></v-divider>
          Created on: {{ readDate(user.createdAt) }}
        </v-card-text>
        <v-card-actions class="align-self-end">
          <v-btn
            class="bg-yellow-darken-3"
            v-if="user.isStaff === true || user.isAdmin === true"
            variant="tonal"
          >
            Management Account
          </v-btn>
          <v-btn v-else variant="tonal"> View Order History </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapStores } from "pinia";
import usePageStore from "@/stores/page";
import useAuthStore from "@/stores/Auth";
import AppStaffNew from "@/components/manage/AppStaffNew.vue";

export default {
  data() {
    return {
      allUserInfo: [],
      dialogAddNew: false
    };
  },
  methods: {
    async getAllUsers() {
      const allUserInfo = await axios.get("/api/user/managementusers");
      this.allUserInfo = allUserInfo.data;
    },
    readDate(date) {
      const fullDate = new Date(date);
      const readableDate = `${fullDate.toDateString()}, ${fullDate.getHours()}:${fullDate.getMinutes()}`;
      return readableDate;
    }
  },
  mounted() {
    this.getAllUsers();
  },
  updated() {
    this.getAllUsers();
  },
  computed: {
    ...mapStores(usePageStore),
    ...mapStores(useAuthStore)
  },
  components: {
    AppStaffNew
  }
};
</script>

<style scoped></style>
