<template>
  <v-dialog v-model="pageStore.dialogOrders" fullscreen transition="dialog-bottom-transition">
    <v-card class="container bg-white">
      <v-toolbar class="bg-blue-darken-4">
        <v-toolbar-title class="site_font">Order History</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn icon dark @click="pageStore.dialogOrders = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <label class="site_font text-h4 text-center ma-5">View your Orders</label>
      <div class="desktop_container w-100 px-2" v-if="ordersStore.userOrders.length !== 0">
        <v-card
          class="my-1"
          :style="checkOrderStatusColor(order.orderStatus, order.orderCancel)"
          rounded="lg"
          v-for="order in ordersStore.userOrders"
          :key="order"
          elevation="8"
          opacity="0.5"
        >
          <div style="z-index: 1">
            <v-card-title>
              <div>Total: £{{ order.orderTotal }}</div>
            </v-card-title>
            <v-card-subtitle> {{ readDate(order.createdAt) }}</v-card-subtitle>
            <v-card-subtitle>
              <div class="d-flex flex-row align-center mt-4">
                <v-icon class="mx-3">
                  {{ checkOrderStatusIcon(order.orderStatus, order.orderCancel) }}
                </v-icon>
                {{ checkOrderStatus(order.orderStatus, order.orderCancel) }}
              </div>
            </v-card-subtitle>
            <v-card-text>
              <v-list class="bg-transparent">
                <v-list-item v-for="orderItem of order.orderItems" :key="orderItem">
                  {{ orderItem.item.title }} (£{{ orderItem.item.price }}) x{{ orderItem.quantity }}
                </v-list-item>
              </v-list>
            </v-card-text>
          </div>
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
  methods: {
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
        return "background-color:#1565C0D5";
      } else if (status === true && cancel === false) {
        return "background-color:#2E7D32D5;";
      } else if (status === false && cancel === true) {
        return "background-color:#C62828D5;";
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
