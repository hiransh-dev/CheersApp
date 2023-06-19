<template>
  <!-- HEADER CARDS: SEARCh, SELECT PUB, SELECT SEATING etc -->
  <AppHeaderCards>
    <v-card class="bg-yellow-darken-3 text-center desktop_container" elevation="24">
      <v-card-title class="site_font text-black"
        >What would you like to {{ categoryAction }}?</v-card-title
      >
      <v-btn
        v-if="setCategory !== ''"
        class="bg-black ma-2"
        size="large"
        @click="dialogCategory = true"
        >{{ setCategory }}</v-btn
      >
      <v-btn v-else class="bg-black ma-2" size="large" @click="dialogCategory = true"
        >Select Category</v-btn
      >
    </v-card>
  </AppHeaderCards>
  <!-- SET-CATEGORY, HEADER CARD-->

  <!-- CATEGORY DIALOG WINDOW -->
  <v-dialog
    v-model="dialogCategory"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar class="bg-black" dark>
        <v-btn icon dark @click="dialogCategory = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title class="site_font">Category</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- <v-toolbar-items>
              <v-btn variant="text" @click="dialogCategory = false"> Save </v-btn>
            </v-toolbar-items> -->
      </v-toolbar>
      <label class="site_font text-h4 text-center my-5 mx-5"
        >What would you like to {{ categoryAction }}?</label
      >
      <div class="desktop" style="align-items: center">
        <div class="desktop_container_small">
          <v-list>
            <v-list-item v-for="subType of subcategory" :key="subType">
              <v-btn
                @click="selectedCategory(subType)"
                class="bg-black w-100 site_font btn_font"
                size="x-large"
                elevation="24"
              >
                {{ subType }}
              </v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn
                @click="selectedCategory()"
                class="bg-yellow-darken-3 w-100 site_font btn_font"
                size="x-large"
                elevation="24"
              >
                Anything
              </v-btn>
            </v-list-item>
          </v-list>
        </div>
      </div>
    </v-card>
  </v-dialog>

  <!-- MENU PANELS -->
  <v-expansion-panels class="my-4">
    <v-expansion-panel
      class="bg-grey-darken-4"
      v-for="menuItem of cartStore.menuItems"
      :key="menuItem._id"
      elevation="6"
    >
      <v-badge
        color="blue-darken-3"
        class="w-100 mb-4"
        style="position: absolute"
        v-if="menuItem.quantity !== 0"
        :content="menuItem.quantity"
      >
      </v-badge>
      <v-expansion-panel-title>
        <div class="w-100 d-flex flex-row justify-space-between align-center">
          <div class="d-flex flex-column">
            <label class="text-h6 site_font">{{ menuItem.title }}</label>
            <label class="mt-2 text-grey site_font">{{ menuItem.desc }}</label>
          </div>
          <label class="text-h6 site_font mr-2">£ {{ menuItem.price }}</label>
        </div>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-card class="d-flex flex-row align-center justify-end bg-transparent" elevation="0">
          <v-btn class="ma-2 bg-red" @click="removingFromCart(menuItem._id)" elevation="4" icon>
            <v-icon>mdi-minus-thick</v-icon>
          </v-btn>
          <label class="mx-2 text-h6 site_font">{{ menuItem.quantity }}</label>
          <v-btn class="ma-2 bg-green" @click="addingToCart(menuItem._id)" elevation="4" icon>
            <v-icon>mdi-plus-thick</v-icon>
          </v-btn>
        </v-card>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import AppHeaderCards from "@/components/AppHeaderCards.vue";
import { mapStores } from "pinia";
import useCartStore from "@/stores/cart";

export default {
  name: "MenuView",
  data() {
    return {
      /* Grab Category & Sub from db later */
      category: "Drinks",
      subcategory: ["Beers", "World Beers", "Ale", "Whiskey", "Vodka", "Rum"],
      setCategory: "",
      dialogCategory: false
    };
  },
  methods: {
    selectedCategory(selected) {
      this.dialogCategory = false;
      if (selected) {
        this.setCategory = selected;
        this.cartStore.menuItems = this.cartStore.menu.filter((item) => {
          return item.subcategory === selected;
        });
      } else {
        this.setCategory = "";
        this.cartStore.menuItems = this.cartStore.menu;
      }
    },
    addingToCart(id) {
      this.cartStore.addToCart(id);
    },
    removingFromCart(id) {
      this.cartStore.removeFromCart(id);
    }
  },
  computed: {
    categoryAction() {
      if (this.category === "Food") {
        return "eat";
      } else {
        return "drink";
      }
    },
    ...mapStores(useCartStore)
  },
  mounted() {
    this.cartStore.fetchMenu();
  },
  components: {
    AppHeaderCards
  }
};
</script>

<style scoped></style>
