<template>
  <AppHeader></AppHeader>
  <div class="main container">
    <div class="desktop">
      <div class="desktop_container">
        <!-- HEADER CARDS: SEARCh, SELECT PUB, SELECT SEATING etc -->
        <AppHeaderCards></AppHeaderCards>
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
  components: {
    AppHeaderCards,
    AppHeader
  }
};
</script>

<style scoped></style>
