<template>
  <AppHeader></AppHeader>
  <div class="main container">
    <div class="desktop">
      <div class="desktop_container">
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
    AppOrders
  }
};
</script>

<style scoped></style>
