<template>
  <div class="d-flex flex-column w-100 align-center">
    <v-card
      class="ma-10 bg-black d-flex justify-center align-center"
      style="height: 8rem; width: auto; padding: 1rem"
      @click="dialogAddNew = true"
    >
      <v-icon size="x-large">mdi-plus</v-icon>
      <label class="text-h4">Add new Menu Item</label>
    </v-card>
    <v-dialog
      v-model="dialogAddNew"
      class="bg-grey-lighten-2"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <v-card class="container">
        <v-toolbar class="bg-black" dark>
          <v-toolbar-title class="site_font">Category</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn variant="text" @click="dialogAddNew = false"> Close </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <label class="site_font text-h4 text-center my-5 mx-5">Select Sub Category</label>
        <div class="desktop_container w-100">
          <AppMenuNew></AppMenuNew>
        </div>
      </v-card>
    </v-dialog>
    <div class="w-100 d-flex flex-row justify-space-evenly">
      <div class="desktop_container w-100">
        <!-- HEADER CARDS: SEARCH, SELECT SEATING etc -->
        <v-row no-gutters>
          <v-col cols="4">
            <v-card
              class="mb-2 pa-4 bg-black d-flex justify-center align-center"
              @click="this.category = 'drinks'"
              rounded="lg"
            >
              <v-icon icon="mdi-glass-mug-variant" size="x-large"></v-icon>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card
              class="mx-2 mb-2 pa-4 bg-black d-flex justify-center align-center"
              @click="this.category = 'food'"
              rounded="lg"
            >
              <v-icon icon="mdi-hamburger" size="x-large"></v-icon>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card
              class="mb-2 pa-4 bg-black d-flex justify-center align-center"
              @click="this.category = 'softdrinks'"
              rounded="lg"
            >
              <v-icon icon="mdi-beer" size="x-large"></v-icon>
            </v-card>
          </v-col>
        </v-row>
        <!-- SET-SUBCATEGORY, HEADER CARD-->
        <v-card
          v-if="this.category === 'drinks'"
          class="my-2 bg-yellow-darken-3 pa-2 text-center desktop_container"
          rounded="lg"
          elevation="6"
        >
          <v-card-title class="site_font text-black"> What would you like to drink? </v-card-title>
          <v-btn
            v-if="setSubCategory !== ''"
            class="bg-black site_font"
            size="x-large"
            rounded="lg"
            @click="dialogCategory = true"
            block
          >
            {{ setSubCategory }}
          </v-btn>
          <v-btn
            v-else
            class="bg-black site_font"
            size="x-large"
            rounded="lg"
            @click="dialogCategory = true"
            block
          >
            Select Category
          </v-btn>
        </v-card>

        <!-- CATEGORY DIALOG WINDOW -->
        <v-dialog
          v-model="dialogCategory"
          class="bg-grey-lighten-2"
          fullscreen
          :scrim="false"
          transition="dialog-bottom-transition"
        >
          <v-card class="container">
            <v-toolbar class="bg-black" dark>
              <!-- <v-btn icon dark @click="dialogCategory = false">
            <v-icon>mdi-close</v-icon>
          </v-btn> -->
              <v-toolbar-title class="site_font">Category</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn variant="text" @click="dialogCategory = false"> Save </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <label class="site_font text-h4 text-center my-5 mx-5">Select Sub Category</label>
            <div class="desktop_container w-100">
              <v-list>
                <v-list-item v-for="subType of subcategory" :key="subType">
                  <v-btn
                    @click="selectedSubCategory(subType)"
                    class="bg-black w-100 site_font btn_font"
                    size="x-large"
                    rounded="lg"
                    elevation="0"
                  >
                    {{ subType }}
                  </v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn
                    @click="selectedSubCategory()"
                    class="bg-yellow-darken-3 w-100 site_font btn_font"
                    size="x-large"
                    rounded="lg"
                    elevation="0"
                  >
                    Anything
                  </v-btn>
                </v-list-item>
              </v-list>
            </div>
          </v-card>
        </v-dialog>

        <!-- MENU PANELS -->
        <v-expansion-panels class="my-4">
          <v-expansion-panel
            class="bg-grey-lighten-1"
            v-for="menuItem of cartStore.menuItems"
            :key="menuItem._id"
            rounded="lg"
            elevation="6"
          >
            <v-badge
              icon="mdi-exclamation-thick"
              color="red-darken-3"
              class="w-100 mb-4"
              style="position: absolute"
              v-if="menuItem.outofstock === true"
            >
            </v-badge>
            <v-expansion-panel-title>
              <div class="w-100 d-flex flex-row justify-space-between align-center">
                <div class="d-flex flex-column w-75">
                  <label class="text-h6 site_font">{{ menuItem.title }}</label>
                  <label class="mt-2 text-grey site_font">{{ menuItem.desc }}</label>
                  <div>
                    <v-chip
                      class="mt-2"
                      color=""
                      v-if="setSubCategory === '' && menuItem.subcategory"
                    >
                      {{ menuItem.subcategory }}
                    </v-chip>
                  </div>
                </div>
                <label class="price_font site_font mx-2" style="flex-wrap: nowrap"
                  >£ {{ menuItem.price }}</label
                >
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-card class="d-flex flex-row align-center justify-end bg-transparent" elevation="0">
                <div class="ma-2">
                  <label>Edit</label>
                  <v-btn class="ml-1 bg-blue" elevation="4" icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </div>
                <div v-if="menuItem.outofstock === false" class="ma-2">
                  <label>Out of Stock?</label>
                  <v-btn
                    class="ml-1 bg-red"
                    @click="markItemStock(menuItem._id)"
                    elevation="4"
                    icon
                  >
                    <v-icon>mdi-minus-thick</v-icon>
                  </v-btn>
                </div>
                <div v-else class="ma-2">
                  <label>Set as Available</label>
                  <v-btn
                    class="ml-1 bg-green"
                    @click="markItemStock(menuItem._id)"
                    elevation="4"
                    icon
                  >
                    <v-icon>mdi-plus-thick</v-icon>
                  </v-btn>
                </div>
              </v-card>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <div class="desktop_container w-100">
        <label class="text-h3">Marked out of Stock</label>
        <!-- MENU PANELS -->
        <v-expansion-panels class="my-4">
          <v-expansion-panel
            class="bg-grey-lighten-1"
            v-for="menuItem of outOfStockMenuItems"
            :key="menuItem._id"
            rounded="lg"
            elevation="6"
          >
            <v-expansion-panel-title>
              <div class="w-100 d-flex flex-row justify-space-between align-center">
                <div class="d-flex flex-column w-75">
                  <label class="text-h6 site_font">{{ menuItem.title }}</label>
                  <label class="mt-2 text-grey site_font">{{ menuItem.desc }}</label>
                  <div>
                    <v-chip
                      class="mt-2"
                      color=""
                      v-if="setSubCategory === '' && menuItem.subcategory"
                    >
                      {{ menuItem.subcategory }}
                    </v-chip>
                  </div>
                </div>
                <label class="price_font site_font mx-2" style="flex-wrap: nowrap"
                  >£ {{ menuItem.price }}</label
                >
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-card class="d-flex flex-row align-center justify-end bg-transparent" elevation="0">
                <div class="ma-2">
                  <label>Edit</label>
                  <v-btn class="ml-1 bg-blue" elevation="4" icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </div>
                <div class="ma-2">
                  <label>Set as Available</label>
                  <v-btn
                    class="ml-1 bg-green"
                    @click="markItemStock(menuItem._id)"
                    elevation="4"
                    icon
                  >
                    <v-icon>mdi-plus-thick</v-icon>
                  </v-btn>
                </div>
              </v-card>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import useCartStore from "@/stores/cart";
import usePageStore from "@/stores/page";
import axios from "axios";
import AppMenuNew from "@/components/manage/AppMenuNew.vue";

export default {
  name: "MenuView",
  data() {
    return {
      /* Make *category/subcategory dynamic later */
      subcategory: ["Beers", "World Beers", "Ale", "Whiskey", "Vodka", "Rum"],
      setSubCategory: "",
      dialogCategory: false,
      category: "drinks",
      dialogAddNew: false,
      outOfStockMenuItems: []
    };
  },
  methods: {
    selectedSubCategory(selected) {
      this.dialogCategory = false;
      if (selected) {
        this.setSubCategory = selected;
        this.cartStore.menuItems = this.cartStore.menu.filter((item) => {
          return item.subcategory === selected;
        });
      } else {
        this.setSubCategory = "";
        this.cartStore.menuItems = this.cartStore.menu.filter((item) => {
          return item.category === this.cartStore.category;
        });
      }
    },
    itemOutofStock() {
      this.outOfStockMenuItems = this.cartStore.menu.filter((item) => {
        return item.outofstock === true;
      });
    },
    async markItemStock(id) {
      const itemStockStatus = await axios.post(
        "/api/menu/markstock",
        { id },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      if (itemStockStatus.status === 200) {
        this.pageStore.setGlobalSnackbar("Item Status", itemStockStatus.data);
        this.outOfStockMenuItems = [];
        this.cartStore.menuItems = [];
        await this.cartStore.fetchMenu(this.category);
        this.itemOutofStock();
      }
    }
  },
  computed: {
    ...mapStores(useCartStore),
    ...mapStores(usePageStore)
  },
  mounted() {
    this.cartStore.fetchMenu(this.category);
    this.itemOutofStock();
  },
  updated() {
    this.outOfStockMenuItems = [];
    this.cartStore.menuItems = [];
    this.cartStore.fetchMenu(this.category);
    this.itemOutofStock();
  },
  components: {
    AppMenuNew
  }
};
</script>

<style scoped></style>
