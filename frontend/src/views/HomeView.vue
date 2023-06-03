<template>
  <RouterLink :to="linkTo" class="router_link_decoration">
    <div class="home">
      <v-card class="home_card ma-1">
        <v-img @click="linkTo = '/drinks'" src="../src/assets/drinks.png"></v-img>
        <v-btn @click="linkTo = '/drinks'" class="bg-black" rounded="sm" size="x-large" block
          >Drinks</v-btn
        >
      </v-card>
      <v-card class="home_card ma-1">
        <v-img src="../src/assets/food.png"></v-img>
        <v-btn @click="linkTo = '/food'" class="bg-black" rounded="sm" size="x-large" block
          >Food & Snacks</v-btn
        >
      </v-card>
      <v-card class="home_card ma-1">
        <v-img src="../src/assets/soft_drinks.png"></v-img>
        <v-btn @click="linkTo = '/softdrinks'" class="bg-black" rounded="sm" size="x-large" block
          >Soft Drinks</v-btn
        >
      </v-card>
    </div>
  </RouterLink>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      linkTo: "/"
    };
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
