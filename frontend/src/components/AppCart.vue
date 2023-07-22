<template>
  <div class="sticky ma-2">
    <v-slide-x-reverse-transition>
      <v-badge
        color="blue-darken-3"
        v-if="cartStore.totalItemsCounter !== 0"
        :content="cartStore.totalItemsCounter"
      >
        <v-btn class="bg-green-darken-4" @click="pageStore.dialogCart = true" size="x-large" icon>
          <v-icon>mdi-cart</v-icon>
        </v-btn>
      </v-badge>
    </v-slide-x-reverse-transition>
  </div>
  <!-- CART DIALOG WINDOW -->
  <v-dialog
    v-model="pageStore.dialogCart"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
  >
    <v-card class="bg-black">
      <v-toolbar class="bg-green-darken-4" dark>
        <v-btn icon dark @click="pageStore.dialogCart = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title class="site_font">Cart</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <label class="site_font text-h4 text-center my-5 mx-5">Confirm your order?</label>
      <div class="desktop" style="align-items: center">
        <div class="desktop_container_small">
          <v-expansion-panels class="my-4 pa-2">
            <v-expansion-panel
              class="bg-grey-darken-4"
              v-for="menuItem of cartStore.menu"
              :key="menuItem._id"
              rounded="lg"
              elevation="6"
            >
              <div
                v-if="
                  cartStore.cartItems.filter((cartItem) => cartItem.id === menuItem._id).length ===
                  1
                "
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
                    <div class="d-flex flex-column w-75">
                      <label class="text-h6 site_font">{{ menuItem.title }}</label>
                      <label class="mt-2 text-grey site_font">{{ menuItem.desc }}</label>
                    </div>
                    <label class="text-h6 site_font mx-2">£ {{ menuItem.price }}</label>
                  </div>
                </v-expansion-panel-title>

                <v-expansion-panel-text>
                  <v-card
                    class="d-flex flex-row align-center justify-end bg-transparent"
                    elevation="0"
                  >
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
              </div>
            </v-expansion-panel>
          </v-expansion-panels>
          <label class="ma-2 text-h4 float-right site_font"
            >Total: £ {{ cartStore.cartTotal }}</label
          >
          <div class="ma-2 mb-5">
            <v-btn
              @click="checkout()"
              class="bg-blue w-100 site_font btn_font"
              size="x-large"
              rounded="lg"
              elevation="12"
            >
              Checkout
            </v-btn>
          </div>
        </div>
      </div>
      <!-- <v-snackbar v-model="notSetSnackbar" location="center" vertical> -->
      <v-snackbar v-model="notSetSnackbar" vertical>
        <div class="text-subtitle-1 pb-2">Uh oh!</div>
        <p>Table Number not selected</p>
        <template v-slot:actions>
          <v-btn
            color="yellow-darken-3"
            variant="text"
            @click="(notSetSnackbar = false), (pageStore.dialogCart = false)"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapStores } from "pinia";
import useCartStore from "@/stores/cart";
import usePageStore from "@/stores/page";

export default {
  data() {
    return {
      notSetSnackbar: false
    };
  },
  methods: {
    addingToCart(id) {
      this.cartStore.addToCart(id);
    },
    removingFromCart(id) {
      this.cartStore.removeFromCart(id);
    },
    checkout() {
      if (this.pageStore.setTable === 0) {
        return (this.notSetSnackbar = true);
      } else {
        this.cartStore.placeOrder(this.pageStore.setTable);
      }
    }
  },
  computed: {
    ...mapStores(useCartStore),
    ...mapStores(usePageStore)
  },
  mounted() {
    this.cartStore.fetchMenu();
  }
};
</script>

<style scoped></style>
