<template>
  <div class="d-flex flex-column w-100">
    <div class="d-flex flex-row">
      <v-date-picker
        class="ma-2 bg-black"
        v-model="date"
        label="Date"
        @click="getOrderHistory(userOrderId)"
        required
      ></v-date-picker>
      <div class="d-flex flex-column">
        <v-card class="ma-2 pa-2 bg-black align-self-baseline">
          <v-card-subtitle>Total amount of Orders on {{ date.getDate() }}:</v-card-subtitle>
          <v-card-title>{{ noOrders }}</v-card-title>
        </v-card>
        <v-card class="ma-2 pa-2 bg-black align-self-baseline">
          <v-card-subtitle>Total spendings on {{ date.getDate() }}:</v-card-subtitle>
          <v-card-title>£ {{ ordersTotal }}</v-card-title>
        </v-card>
      </div>
    </div>
    <div class="d-flex flex-row flex-wrap">
      <v-card
        class="d-flex flex-column ma-2 pa-2"
        :style="checkOrderStatusColor(order.orderStatus, order.orderCancel)"
        rounded="lg"
        v-for="order of orderHistory"
        :key="order._id"
      >
        <v-card-title>
          <label>Table no: {{ order.tableNo }}</label
          ><br />
          <label>Order Total: £{{ order.orderTotal }}</label>
        </v-card-title>
        <v-card-subtitle>{{ order._id }}</v-card-subtitle>
        <v-card-subtitle>
          <div class="d-flex flex-row align-center mt-4">
            <v-icon class="mx-3">
              {{ checkOrderStatusIcon(order.orderStatus, order.orderCancel) }}
            </v-icon>
            {{ checkOrderStatus(order.orderStatus, order.orderCancel) }}
          </div>
        </v-card-subtitle>
        <v-card-text>
          Ordered on: {{ readDate(order.createdAt) }} <br />
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
      userId: this.userOrderId,
      orderHistory: [],
      noOrders: 0,
      noOrdersTemp: 0,
      ordersTotal: 0,
      ordersTotalTemp: 0,
      date: new Date(),
      orderTotalChart: []
    };
  },
  components: {
    VDatePicker
  },
  methods: {
    async getOrderHistory(userId) {
      const orderHistory = await axios.get(`/api/order/userOrders?id=${userId}&date=${this.date}`);
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
    },
    checkOrderStatus(status, cancel) {
      if (status === false && cancel === false) {
        return "Processing";
      } else if (status === true && cancel === false) {
        return "Completed";
      } else if (status === false && cancel === true) {
        return "Cancelled";
      }
    },
    checkOrderStatusColor(status, cancel) {
      if (status === false && cancel === false) {
        return "background-color:#1565C0";
      } else if (status === true && cancel === false) {
        return "background-color:#2E7D32;";
      } else if (status === false && cancel === true) {
        return "background-color:#C62828;";
      }
    },
    checkOrderStatusIcon(status, cancel) {
      if (status === false && cancel === false) {
        return "mdi-chef-hat";
      } else if (status === true && cancel === false) {
        return "mdi-check-all";
      } else if (status === false && cancel === true) {
        return "mdi-cancel";
      }
    }
  },
  mounted() {
    this.getOrderHistory(this.userId);
  },
  props: ["userOrderId"]
};
</script>

<style scoped></style>
