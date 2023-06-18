<template>
  <div class="desktop">
    <div class="desktop_container">
      <!-- MOVE THIS TO HEADER CARDS -->
      <v-card class="bg-yellow-darken-3 text-center desktop_container" elevation="24">
        <v-card-title class="site_font text-white"
          >What would you like to {{ categoryAction }}?</v-card-title
        >
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
            <v-toolbar-title class="site_font">Category</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn variant="text" @click="dialog = false"> Save </v-btn>
            </v-toolbar-items>
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

      <v-expansion-panels class="my-4">
        <v-expansion-panel v-for="menuItem of menuItems" :key="menuItem._id" elevation="8">
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
            <v-card class="d-flex flex-row align-center justify-end" elevation="0">
              <v-btn
                class="ma-2 bg-red"
                @click="removingFromCart(menuItem._id, menuItem.quantity)"
                elevation="4"
                icon
              >
                <v-icon>mdi-minus-thick</v-icon>
              </v-btn>
              <label class="mx-2 text-h6 site_font">{{ menuItem.quantity }}</label>
              <v-btn
                class="ma-2 bg-green"
                @click="addingToCart(menuItem._id, menuItem.quantity)"
                elevation="4"
                icon
              >
                <v-icon>mdi-plus-thick</v-icon>
              </v-btn>
            </v-card>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <div class="sticky ma-2">
          <v-slide-x-reverse-transition>
            <v-badge color="blue-darken-3" :content="totalItemsCounter">
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
import axios from "axios";
import { mapStores } from "pinia";
import useCartStore from "@/stores/cart";

export default {
  name: "MenuView",
  data() {
    return {
      category: "Drinks",
      subcategory: ["Beers", "World Beers", "Ale", "Whiskey", "Vodka", "Rum"],
      dialog: false,
      categoryLabel: "",
      counter: [],
      totalItemsCounter: "0",
      menu: [],
      menuItems: []
    };
  },
  methods: {
    selectedCategory(selected) {
      this.dialog = false;
      if (selected) {
        this.categoryLabel = selected;
        this.menuItems = [];
        this.menuItems = this.menu.filter((item) => {
          console.log(this.menuItems);
          return item.subcategory === selected;
        });
      } else {
        this.categoryLabel = "";
        this.menuItems = this.menu;
        console.log(this.menuItems);
      }
    },
    addingToCart(id, quantity) {
      const index = this.menuItems.findIndex((item) => {
        return item._id === id;
      });
      this.menuItems[index].quantity = quantity + 1;
      this.cartStore.updateCart(id, this.menuItems[index].quantity);
      this.updateTotal();
    },
    removingFromCart(id, quantity) {
      const index = this.menuItems.findIndex((item) => {
        return item._id === id;
      });
      if (this.menuItems[index].quantity !== 0) {
        this.menuItems[index].quantity = quantity - 1;
        this.cartStore.updateCart(id, this.menuItems[index].quantity);
        this.updateTotal();
      }
    },
    updateTotal() {
      this.totalItemsCounter = 0;
      this.cartStore.cartItems.forEach((item) => {
        this.totalItemsCounter = parseInt(this.totalItemsCounter + item.quantity);
      });
    },
    async getMenu() {
      try {
        const fullMenu = await axios.get(`/api/menu/${this.category}`);
        this.menu = fullMenu.data;
        this.menu.forEach((item) => {
          item.quantity = 0;
          this.cartStore.cartItems.forEach((cartItem) => {
            if (cartItem.id === item._id) {
              item.quantity = cartItem.quantity;
            }
          });
        });
        this.menuItems = this.menu;
        this.updateTotal();
      } catch (e) {
        console.log(e);
      }
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
    this.getMenu();
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
