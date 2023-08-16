<template>
  <div class="d-flex flex-row flex-wrap" v-if="userOrderHistoryCard === false">
    <v-card
      class="d-flex flex-column ma-2 pa-2 bg-blue-darken-4"
      v-for="user of allUserInfo"
      :key="user._id"
    >
      <v-card-title>
        <label class="site_font">Name: {{ user.firstName }} {{ user.lastName }}</label
        ><br />
        <label class="site_font">Email: {{ user.email }}</label>
      </v-card-title>
      <v-card-subtitle>{{ user._id }}</v-card-subtitle>
      <v-card-text class="site_font">
        Phone Number: {{ user.phoneNumber }} <br />
        Created on: {{ readDate(user.createdAt) }} <br />
        Total Orders : {{ user.orderHistory.length }}
      </v-card-text>
      <v-card-actions class="align-self-end">
        <v-btn
          class="bg-yellow-darken-3"
          v-if="user.isStaff === true || user.isAdmin === true"
          variant="tonal"
        >
          Management Account
        </v-btn>
        <div v-else>
          <v-btn variant="tonal" @click="showUserOrders(user._id, user.firstName)">
            View Order History
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </div>
  <v-card v-else class="w-100 h-100" style="background-color: #11111150">
    <v-toolbar class="bg-black">
      <v-toolbar-title>{{ userFname }}'s Order History</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon dark @click="userOrderHistoryCard = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-fade-transition mode="out-in" hide-on-leave="true">
      <AppUserOrderHistory :userOrderId="userId"></AppUserOrderHistory>
    </v-fade-transition>
  </v-card>
</template>

<script>
import AppUserOrderHistory from "@/components/manage/AppUserOrderHistory.vue";

import axios from "axios";
import { mapStores } from "pinia";
import usePageStore from "@/stores/page";

export default {
  data() {
    return {
      allUserInfo: [],
      userOrderHistoryCard: false,
      userId: 0,
      userFname: ""
    };
  },
  methods: {
    async getAllUsers() {
      const allUserInfo = await axios.get("/api/user/allusers");
      if (allUserInfo.status === 200 && allUserInfo.data) {
        this.allUserInfo = allUserInfo.data;
      }
    },
    readDate(date) {
      const fullDate = new Date(date);
      const readableDate = `${fullDate.toDateString()}, ${fullDate.getHours()}:${fullDate.getMinutes()}`;
      return readableDate;
    },
    showUserOrders(id, fname) {
      this.userId = id;
      this.userFname = fname;
      this.userOrderHistoryCard = true;
    }
  },
  mounted() {
    this.getAllUsers();
  },
  computed: {
    ...mapStores(usePageStore)
  },
  components: {
    AppUserOrderHistory
  },
  beforeUnmount() {
    this.userOrderHistoryCard = false;
  }
};
</script>

<style scoped></style>
