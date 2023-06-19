<template>
  <AppHeader></AppHeader>
  <div class="main container">
    <div class="desktop">
      <div class="desktop_container">
        <slot></slot>
        <!-- CART DIALOG WINDOW -->
        <AppCart></AppCart>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppCart from "@/components/AppCart.vue";

export default {
  data() {
    return {};
  },
  components: {
    AppHeader,
    AppCart
  }
};
</script>

<style scoped></style>
