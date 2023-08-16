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
        <v-divider thickness="4" color="black"></v-divider>
        <v-card-text>
          Phone Number: {{ user.phoneNumber }} <br />
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
          <v-btn
            v-if="user.isStaff === true && user.isAdmin === false && authStore.isAdmin === true"
            class="bg-red-darken-3"
            variant="tonal"
            @click="openDeleteDialog(user)"
          >
            Delete Account
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <v-dialog v-model="dialogDelete" persistent width="auto">
      <v-card>
        <v-card-title class="text-h5">
          Are you sure you want to delete this staff account? This is irreversible.
        </v-card-title>
        <v-card-text>
          Name: {{ dialogDeleteUser.firstName }}{{ dialogDeleteUser.lastName }} <br />
          Email: {{ dialogDeleteUser.email }} <br />
          Created: {{ readDate(dialogDeleteUser.createdAt) }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green-darken-3" variant="text" @click="dialogDelete = false">
            Cancel
          </v-btn>
          <v-btn color="red-darken-3" @click="deleteStaffAcc(dialogDeleteUser._id)"> Delete </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      dialogAddNew: false,
      dialogDelete: false,
      dialogDeleteUser: {}
    };
  },
  methods: {
    async getAllUsers() {
      const allUserInfo = await axios.get("/api/user/managementusers");
      this.allUserInfo = allUserInfo.data;
    },
    async deleteStaffAcc(id) {
      const deletedStaff = await axios.post(
        "/api/user/deletestaff",
        { id },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );
      if (deletedStaff.status === 200 && deletedStaff.data) {
        this.pageStore.setGlobalSnackbar("Account Deleted Status", deletedStaff.data);
      } else {
        this.pageStore.setGlobalSnackbar("Account Deleted Status", "Error deleting staff account.");
      }
      this.dialogDelete = false;
    },
    readDate(date) {
      const fullDate = new Date(date);
      const readableDate = `${fullDate.toDateString()}, ${fullDate.getHours()}:${fullDate.getMinutes()}`;
      return readableDate;
    },
    openDeleteDialog(user) {
      this.dialogDeleteUser = user;
      this.dialogDelete = true;
    }
  },
  mounted() {
    this.getAllUsers();
    this.authStore.checkLogin();
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
