<template>
  <!-- HEADER CARDS: SEARCh, SELECT PUB, SELECT SEATING etc -->
  <div class="desktop_container w-100">
    <AppHeaderCards> </AppHeaderCards>
    <RouterLink :to="linkTo" class="router_link_decoration" v-cloak>
      <v-row no-gutters>
        <v-col cols="6">
          <v-card class="my-2 ma-1" rounded="lg">
            <v-img
              @click="linkTo = { name: 'menu', params: { category: 'drinks' } }"
              :src="drinksImg"
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
              :src="foodImg"
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
              :src="softDrinksImg"
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
import foodImg from "/src/assets/images/food.png";
import drinksImg from "/src/assets/images/drinks.png";
import softDrinksImg from "/src/assets/images/soft_drinks.png";

export default {
  name: "HomeView",
  data() {
    return {
      linkTo: "/",
      foodImg,
      drinksImg,
      softDrinksImg
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
