<template>
  <AppHeader></AppHeader>
  <div class="main container">
    <div class="desktop">
      <div class="desktop_container">
        <slot></slot>
        <!-- CART DIALOG WINDOW -->
        <!-- RENDERING MAIN CONTENT HERE -->
      </div>
    </div>
  </div>
</template>

<script>
import AppHeaderCards from "@/components/AppHeaderCards.vue";
import AppHeader from "@/components/AppHeader.vue";
export default {
  data() {
    return {
      management: false
      /*Set with PINIA state later*/
    };
  },
  components: {
    AppHeader,
    AppHeader
  }
};
</script>

<style scoped></style>
