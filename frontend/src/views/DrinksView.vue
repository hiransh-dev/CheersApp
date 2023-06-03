<template>
  <div class="desktop">
    <div class="desktop_container">
      <v-card class="bg-yellow-darken-3 text-center desktop_container" elevation="24">
        <v-card-title class="site_font text-white">What would you like to drink?</v-card-title>
        <v-btn
          v-if="categoryLabel !== ''"
          class="bg-black ma-2"
          size="large"
          @click="dialog = true"
          >{{ categoryLabel }}</v-btn
        >
        <v-btn v-else class="bg-black ma-2" size="large" @click="dialog = true"
          >Select Category</v-btn
        >
      </v-card>

      <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar class="bg-black" dark>
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title class="site_font">Select category</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn variant="text" @click="dialog = false"> Save </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <label class="site_font text-h4 text-center my-5 mx-5"
            >What would you like to drink?</label
          >

          <div class="desktop" style="align-items: center">
            <div class="desktop_container_small">
              <v-list>
                <v-list-item v-for="drinkType of drinksType" :key="drinkType">
                  <v-btn
                    @click="selectedCategory(drinkType)"
                    class="bg-black w-100 site_font btn_font"
                    size="x-large"
                    elevation="24"
                    :key="drinkType"
                  >
                    {{ drinkType }}
                  </v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn
                    @click="selectedCategory()"
                    class="bg-red w-100 site_font btn_font"
                    size="x-large"
                    elevation="24"
                  >
                    Clear
                  </v-btn>
                </v-list-item>
              </v-list>
            </div>
          </div>
        </v-card>
      </v-dialog>

      <div class="d-flex justify-center">
        <v-card style="width: 100%" class="mt-4 mb-1">
          <v-img src="../src/assets/menu/beers.jfif" cover>
            <div class="w-100 h-100 d-flex justify-center align-center">
              <label class="text-white text-h1">{{ categoryLabel }}</label>
            </div>
          </v-img>
        </v-card>
      </div>
      <!-- variant:popout REMOVED from expansion panel -->
      <v-expansion-panels class="mb-4">
        <v-expansion-panel elevation="8">
          <v-badge
            color="blue-darken-3"
            class="w-100 mb-4"
            style="position: absolute"
            v-if="counter"
            :content="counter"
          >
          </v-badge>

          <v-expansion-panel-title>
            <div class="w-100 d-flex flex-row justify-space-between align-center">
              <div class="d-flex flex-column">
                <label class="text-h5 site_font">Carling</label>
                <label class="mt-2 text-grey site_font">4.0% ABV | 2.3 Units</label>
              </div>
              <label class="text-h6 site_font mr-2">£ 2.50</label>
            </div>
          </v-expansion-panel-title>

          <v-expansion-panel-text>
            <v-card class="d-flex flex-row align-center justify-end" elevation="0">
              <v-btn class="ma-2 bg-red" @click="counter--" elevation="8" icon>
                <v-icon>mdi-minus-thick</v-icon>
              </v-btn>
              <label class="mx-2 text-h6 site_font"> {{ counter }} </label>
              <v-btn class="ma-2 bg-green" @click="counter++" elevation="8" icon>
                <v-icon>mdi-plus-thick</v-icon>
              </v-btn>
            </v-card>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <div class="sticky ma-2">
          <v-slide-x-reverse-transition>
            <v-badge color="blue-darken-3" v-if="counter" :content="counter">
              <v-btn class="bg-green-darken-4" size="x-large" icon>
                <v-icon>mdi-cart</v-icon>
              </v-btn>
            </v-badge>
          </v-slide-x-reverse-transition>
        </div>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
export default {
  name: "DrinksView",
  data() {
    return {
      drinksType: ["Beers", "World Beers", "Ale", "Whiskey", "Vodka", "Rum"],
      drinkType: "",
      drinkTypeSelected: "",
      dialog: false,
      categoryLabel: "",
      counter: 0
    };
  },
  methods: {
    selectedCategory(drinkSelected) {
      this.dialog = false;
      if (drinkSelected) {
        this.categoryLabel = drinkSelected;
      } else {
        this.categoryLabel = "";
      }
    }
  }
};
</script>

<style scoped>
.sticky {
  position: fixed;
  right: 0;
  bottom: 0;
}
@media only screen and (min-width: 1024px) {
}
</style>
