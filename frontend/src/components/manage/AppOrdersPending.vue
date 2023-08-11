<template>
  <div class="d-flex flex-column">
    <div class="d-flex flex-row">
      <div class="d-flex flex-column">
        <v-card class="ma-2 pa-2 bg-black">
          <v-card-subtitle>Total Pending Orders:</v-card-subtitle>
          <v-card-title>{{ noOrders }}</v-card-title>
        </v-card>
      </div>
    </div>
    <div class="d-flex flex-row flex-wrap">
      <v-card
        class="d-flex flex-column ma-2 pa-2 bg-blue-darken-4"
        v-for="order of pendingOrders"
        :key="order._id"
      >
        <v-card-title>
          <label>Table no: {{ order.tableNo }}</label
          ><br />
          <label>Order Total: £{{ order.orderTotal }}</label>
        </v-card-title>
        <v-card-subtitle>{{ order._id }}</v-card-subtitle>
        <v-card-text>
          Customer Name: {{ order.author.firstName }} {{ order.author.lastName }} <br />
          Phone Number: {{ order.author.phoneNumber }}
          <v-list rounded="lg" class="my-2 bg-black">
            <v-list-item v-for="orderItem of order.orderItems" :key="orderItem">
              <label>
                {{ orderItem.item.title }}
              </label>
              <label> x{{ orderItem.quantity }} </label>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions class="align-self-end">
          <v-btn variant="tonal"> View Order </v-btn>
          <v-btn class="bg-green-darken-4" variant="tonal" @click="acceptPendingOrder(order._id)">
            Order Fulfilled
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapStores } from "pinia";
import usePageStore from "@/stores/page";

export default {
  data() {
    return {
      pendingOrders: [],
      noOrders: 0,
      noOrdersTemp: 0,
      timerFunc: null
    };
  },
  methods: {
    timerPendingOrders() {
      this.timerFunc = setInterval(() => {
        this.getPendingOrders();
      }, 3000);
    },
    async getPendingOrders() {
      const allPendingOrders = await axios.get("/api/order/pending");
      this.pendingOrders = allPendingOrders.data;
      // this.pendingOrders = [];
      this.noOrdersTemp = 0;
      this.pendingOrders.forEach(() => {
        this.noOrdersTemp++;
      });
      if (this.noOrders !== this.noOrdersTemp) {
        this.noOrders = this.noOrdersTemp;
      }
    },
    async acceptPendingOrder(id) {
      const acceptedOrder = await axios.post(
        "/api/order/accept",
        { id },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );
      this.pageStore.setGlobalSnackbar("Order Status", acceptedOrder.data);
      this.pendingOrders = [];
      this.getPendingOrders();
    }
  },
  mounted() {
    this.getPendingOrders();
    this.timerPendingOrders();
  },
  computed: {
    ...mapStores(usePageStore)
  },
  beforeUnmount() {
    clearInterval(this.timerFunc);
  }
};
</script>

<style scoped></style>
