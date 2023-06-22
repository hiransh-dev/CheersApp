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
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppAuth from "@/components/AppAuth.vue";
import AppCart from "@/components/AppCart.vue";

export default {
  data() {
    return {};
  },
  components: {
    AppHeader,
    AppAuth,
    AppCart
  }
};
</script>

<style scoped></style>
