<template>
  <AppHeader></AppHeader>
  <div class="main container">
    <div class="desktop">
      <div class="desktop_container">
        <!-- HEADER CARDS: SEARCh, SELECT PUB, SELECT SEATING etc -->
        <AppHeaderCards v-if="management === false"> </AppHeaderCards>
        <!-- RENDERING MAIN CONTENT HERE -->
        <RouterView></RouterView>
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
    AppHeaderCards,
    AppHeader
  }
};
</script>

<style scoped></style>
