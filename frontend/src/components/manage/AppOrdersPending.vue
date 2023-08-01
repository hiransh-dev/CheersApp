<template>
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
        <v-btn class="bg-green-darken-4" variant="tonal"> Accept Order </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      pendingOrders: []
    };
  },
  methods: {
    async getPendingOrders() {
      const allPendingOrders = await axios.get("/api/order/pending");
      this.pendingOrders = allPendingOrders.data;
    }
  },
  mounted() {
    this.getPendingOrders();
  }
};
</script>

<style scoped></style>
