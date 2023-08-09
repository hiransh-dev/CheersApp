<template>
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
</template>

<script>
import axios from "axios";
import { mapStores } from "pinia";
import usePageStore from "@/stores/page";

export default {
  data() {
    return {
      allUserInfo: []
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
  computed: {
    ...mapStores(usePageStore)
  }
};
</script>

<style scoped></style>
