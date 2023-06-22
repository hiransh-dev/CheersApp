<template>
  <!-- HEADER CARDS: SEARCh, SELECT PUB, SELECT SEATING etc -->
  <AppHeaderCards> </AppHeaderCards>
  <RouterLink :to="linkTo" class="router_link_decoration">
    <div class="home">
      <v-card class="home_card ma-1">
        <v-img
          @click="linkTo = { name: 'menu', params: { category: 'drinks' } }"
          src="../src/assets/images/drinks.png"
        ></v-img>
        <v-btn
          @click="linkTo = { name: 'menu', params: { category: 'drinks' } }"
          class="bg-black"
          rounded="sm"
          size="x-large"
          block
          >Drinks</v-btn
        >
      </v-card>
      <v-card class="home_card ma-1">
        <v-img
          @click="linkTo = { name: 'menu', params: { category: 'food' } }"
          src="../src/assets/images/food.png"
        ></v-img>
        <v-btn
          @click="linkTo = { name: 'menu', params: { category: 'food' } }"
          class="bg-black"
          rounded="sm"
          size="x-large"
          block
          >Food & Snacks</v-btn
        >
      </v-card>
      <v-card class="home_card ma-1">
        <v-img
          @click="linkTo = { name: 'menu', params: { category: 'softdrinks' } }"
          src="../src/assets/images/soft_drinks.png"
        ></v-img>
        <v-btn
          @click="linkTo = { name: 'menu', params: { category: 'softdrinks' } }"
          class="bg-black"
          rounded="sm"
          size="x-large"
          block
          >Soft Drinks</v-btn
        >
      </v-card>
    </div>
  </RouterLink>
</template>

<script>
import AppHeaderCards from "@/components/AppHeaderCards.vue";

export default {
  name: "HomeView",
  data() {
    return {
      linkTo: "/"
    };
  },
  components: {
    AppHeaderCards
  }
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
}
@media only screen and (min-width: 1024px) {
  .home {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  .home_card {
    width: 24vw;
  }
}
</style>
