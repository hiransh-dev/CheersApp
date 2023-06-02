<template>
  <div class="desktop">
    <div class="desktop_container">
      <v-card class="my-2 w-100 d-flex flex-row justify-end" elevation="0">
        <v-text-field
          density="compact"
          variant="outlined"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-btn icon="mdi-magnify" elevation="0"></v-btn>
      </v-card>
      <div class="home">
        <v-card class="home_card ma-1">
          <a @click="hello">
            <v-img src="../src/assets/drinks.png"></v-img>
          </a>
          <v-btn class="bg-black" rounded="sm" size="x-large" block>Drinks</v-btn>
        </v-card>
        <v-card class="home_card ma-1">
          <v-img src="../src/assets/food.png"></v-img>
          <v-btn class="bg-black" rounded="sm" size="x-large" block>Food & Snacks</v-btn>
        </v-card>
        <v-card class="home_card ma-1">
          <v-img src="../src/assets/soft_drinks.png"></v-img>
          <v-btn class="bg-black" rounded="sm" size="x-large" block>Soft Drinks</v-btn>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script></script>

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
