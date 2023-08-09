<template>
  <div class="d-flex flex-row flex-wrap">
    <v-card
      class="d-flex flex-column ma-2 pa-2 bg-blue-darken-4"
      v-for="order of orderHistory"
      :key="order._id"
    >
      <v-card-title>
        <label>Table no: {{ order.tableNo }}</label
        ><br />
        <label>Order Total: £{{ order.orderTotal }}</label>
      </v-card-title>
      <v-card-subtitle>{{ order._id }}</v-card-subtitle>
      <v-card-text>
        <v-divider thickness="4" color="black"></v-divider>
        Customer Name: {{ order.author.firstName }} {{ order.author.lastName }} <br />
        Phone Number: {{ order.author.phoneNumber }} <br />
        <v-divider thickness="4" color="black"></v-divider>
        Ordered on: {{ readDate(order.createdAt) }}
        <v-list rounded="lg" class="my-2 bg-black">
          <v-list-item v-for="orderItem of order.orderItems" :key="orderItem">
            <label>
              {{ orderItem.item.title }}
            </label>
            <label> x{{ orderItem.quantity }} </label>
          </v-list-item>
        </v-list>
      </v-card-text>
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
      orderHistory: []
    };
  },
  methods: {
    async getOrderHistory() {
      const OrderHistory = await axios.get("/api/order/allorders");
      this.orderHistory = OrderHistory.data;
    },
    readDate(date) {
      const fullDate = new Date(date);
      const readableDate = `${fullDate.toDateString()}, ${fullDate.getHours()}:${fullDate.getMinutes()}`;
      return readableDate;
    }
  },
  mounted() {
    this.getOrderHistory();
  },
  computed: {
    ...mapStores(usePageStore)
  }
};
</script>

<style scoped></style>
