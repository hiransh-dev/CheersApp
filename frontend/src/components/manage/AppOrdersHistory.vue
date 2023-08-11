<template>
  <div class="d-flex flex-column">
    <div class="d-flex flex-row">
      <v-date-picker
        class="ma-2 bg-black"
        v-model="date"
        label="Date"
        @click="getOrderHistory()"
        required
      ></v-date-picker>
      <div class="d-flex flex-column">
        <v-card class="ma-2 pa-2 bg-black">
          <v-card-subtitle>Total Earnings:</v-card-subtitle>
          <v-card-title>£ {{ ordersTotal }}</v-card-title>
        </v-card>
        <v-card class="ma-2 pa-2 bg-black">
          <v-card-subtitle>Total Orders:</v-card-subtitle>
          <v-card-title>{{ noOrders }}</v-card-title>
        </v-card>
      </div>
    </div>
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
  </div>
</template>

<script>
import { VDatePicker } from "vuetify/labs/VDatePicker";

import axios from "axios";

export default {
  data() {
    return {
      orderHistory: [],
      noOrders: 0,
      noOrdersTemp: 0,
      ordersTotal: 0,
      ordersTotalTemp: 0,
      date: new Date(),
      timerFunc: null
    };
  },
  components: {
    VDatePicker
  },
  methods: {
    timerOrderHistory() {
      this.timerFunc = setInterval(() => {
        this.getOrderHistory();
      }, 3000);
    },
    async getOrderHistory() {
      const orderHistory = await axios.get(`/api/order/allorders/${this.date}`);
      // this.orderHistory = [];
      this.orderHistory = orderHistory.data;
      this.noOrdersTemp = 0;
      this.ordersTotalTemp = 0;
      this.orderHistory.forEach((item) => {
        this.noOrdersTemp++;
        this.ordersTotalTemp = parseFloat(this.ordersTotalTemp + item.orderTotal);
      });
      if (this.noOrders !== this.noOrdersTemp && this.ordersTotal !== this.ordersTotalTemp) {
        this.noOrders = this.noOrdersTemp;
        this.ordersTotal = this.ordersTotalTemp;
      }
    },
    readDate(date) {
      const fullDate = new Date(date);
      const readableDate = `${fullDate.toDateString()}, ${fullDate.getHours()}:${fullDate.getMinutes()}`;
      return readableDate;
    }
  },
  mounted() {
    this.getOrderHistory();
    this.timerOrderHistory();
  },
  beforeUnmount() {
    clearInterval(this.timerFunc);
  }
};
</script>

<style scoped></style>
