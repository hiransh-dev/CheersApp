<template>
  <div class="main">
    <div v-if="this.$route.name !== 'manage'" class="header_container">
      <AppHeader></AppHeader>
    </div>
    <div class="container">
      <slot></slot>
      <!-- LOGIN/REGISTER DIALOG WINDOW -->
      <AppAuth></AppAuth>
      <!-- CART DIALOG WINDOW -->
      <AppCart></AppCart>
      <!-- ORDERS DIALOG WINDOW  -->
      <AppOrders></AppOrders>
      <!-- ALERTS FOR THE APP -->
      <AppAlerts></AppAlerts>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppAuth from "@/components/AppAuth.vue";
import AppCart from "@/components/AppCart.vue";
import AppOrders from "@/components/AppOrders.vue";
import AppAlerts from "@/components/AppAlerts.vue";

export default {
  data() {
    return {};
  },
  components: {
    AppHeader,
    AppAuth,
    AppCart,
    AppOrders,
    AppAlerts
  }
};
</script>

<style scoped></style>
