<template>
  <v-dialog v-model="pageStore.dialogOrders" fullscreen transition="dialog-bottom-transition">
    <v-card class="bg-white">
      <v-toolbar class="bg-blue-darken-4">
        <v-toolbar-title class="site_font">Order History</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn icon dark @click="pageStore.dialogOrders = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <label class="site_font text-h4 text-center my-5 mx-5">View your Orders</label>
      <div class="container" v-if="ordersStore.userOrders">
        <v-card
          class="bg-grey-darken-4 ma-1"
          v-for="order in ordersStore.userOrders"
          :key="order"
          elevation="8"
        >
          <v-card-title>
            <div>Total: £{{ order.orderTotal }}</div>
          </v-card-title>
          <v-card-subtitle> {{ Date(order.createdAt) }}</v-card-subtitle>
          <v-card-text>
            <v-list class="bg-transparent">
              <v-list-item v-for="orderItem of order.orderItems" :key="orderItem">
                {{ orderItem.item.title }} (£{{ orderItem.item.price }}) x{{ orderItem.quantity }}
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </div>
      <div class="ma-2 mb-5">
        <v-btn class="bg-black w-100 site_font btn_font" size="x-large" rounded="lg" elevation="12">
          Load More
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapStores } from "pinia";
import usePageStore from "@/stores/page";
import useOrdersStore from "@/stores/orders";

export default {
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapStores(usePageStore),
    ...mapStores(useOrdersStore)
  },
  mounted() {
    this.ordersStore.fetchOrders();
  }
};
</script>

<style scoped></style>
