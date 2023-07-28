<template>
  <div class="main">
    <div class="header_container">
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
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppAuth from "@/components/AppAuth.vue";
import AppCart from "@/components/AppCart.vue";
import AppOrders from "@/components/AppOrders.vue";

export default {
  data() {
    return {};
  },
  components: {
    AppHeader,
    AppAuth,
    AppCart,
    AppOrders,
  }
};
</script>

<style scoped></style>
