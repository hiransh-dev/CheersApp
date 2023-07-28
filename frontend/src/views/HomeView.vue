<template>
  <!-- HEADER CARDS: SEARCh, SELECT PUB, SELECT SEATING etc -->
  <div class="desktop_container">
    <AppHeaderCards> </AppHeaderCards>
    <RouterLink :to="linkTo" class="router_link_decoration">
      <v-row no-gutters>
        <v-col cols="6">
          <v-card class="my-2 ma-1" rounded="lg">
            <v-img
              @click="linkTo = { name: 'menu', params: { category: 'drinks' } }"
              src="../src/assets/images/drinks.png"
            ></v-img>
            <v-btn
              @click="linkTo = { name: 'menu', params: { category: 'drinks' } }"
              class="bg-black site_font"
              rounded="sm"
              size="x-large"
              block
              >Drinks</v-btn
            >
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="my-2 ma-1" rounded="lg">
            <v-img
              @click="linkTo = { name: 'menu', params: { category: 'food' } }"
              src="../src/assets/images/food.png"
            ></v-img>
            <v-btn
              @click="linkTo = { name: 'menu', params: { category: 'food' } }"
              class="bg-black site_font"
              rounded="sm"
              size="x-large"
              block
              >Food & Snacks</v-btn
            >
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="ma-1" rounded="lg">
            <v-img
              @click="linkTo = { name: 'menu', params: { category: 'softdrinks' } }"
              src="../src/assets/images/soft_drinks.png"
            ></v-img>
            <v-btn
              @click="linkTo = { name: 'menu', params: { category: 'softdrinks' } }"
              class="bg-black site_font"
              rounded="sm"
              size="x-large"
              block
              >Soft Drinks</v-btn
            >
          </v-card>
        </v-col>
      </v-row>
    </RouterLink>
  </div>
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
.site_font {
  font-size: 0.8rem;
}
</style>
