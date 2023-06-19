<template>
  <v-app-bar class="navbar container bg-black" elevation="4">
    <v-app-bar-title>
      <v-fade-transition mode="in-out" hide-on-leave="true">
        <RouterLink v-show="!scrollValue" to="/" class="router_link_decoration text-white"
          >Cheers!
        </RouterLink>
      </v-fade-transition>
      <v-fade-transition mode="out-in" hide-on-leave="true">
        <RouterLink v-show="scrollValue" to="/" class="router_link_decoration">
          <img class="mt-2 logo_img" src="/CheersLogo_nobg_small.png" />
        </RouterLink>
      </v-fade-transition>
    </v-app-bar-title>
    <v-card
      v-if="!screenSmall"
      style="padding-right: 5vw"
      class="bg-black d-flex justify-end align-center"
      elevation="0"
    >
      <v-btn class="bg-transparent ma-1" elevation="0" icon>
        <v-icon>mdi-cart-outline</v-icon>
      </v-btn>
      <v-btn class="bg-transparent ma-1" elevation="0" icon>
        <v-icon>mdi-format-list-bulleted</v-icon>
      </v-btn>
      <v-btn
        rounded="lg"
        class="site_font text-none text-black font-weight-bold ma-1 bg-yellow-darken-3"
        >Login
      </v-btn>
      <v-btn rounded="lg" class="site_font text-none font-weight-bold ma-1 bg-grey-darken-4"
        >Sign Up</v-btn
      >
    </v-card>
    <v-card class="bg-transparent d-flex justify-end" v-else elevation="0">
      <v-btn v-show="!fullscreenMenu" @click.prevent="burgerClicked" icon>
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-btn v-show="fullscreenMenu" @click.prevent="burgerClicked" icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card>
  </v-app-bar>

  <v-navigation-drawer
    class="fullscreen w-75 bg-grey-lighten-2"
    v-model="fullscreenMenu"
    location="right"
    temporary
  >
    <v-list class="mt-5" nav>
      <v-list-item
        prepend-icon="mdi-cart-outline"
        title="Cart"
        value="cart"
        @click="cartStore.dialogCart = true"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-format-list-bulleted"
        title="Orders"
        value="orders"
      ></v-list-item>
      <v-list-item>
        <v-btn
          rounded="lg"
          class="site_font mr-1 text-none font-weight-bold bg-yellow-darken-3"
          elevation="0"
          >Login
        </v-btn>
        <v-btn
          rounded="lg"
          class="site_font mx-1 text-none font-weight-bold bg-grey-darken-4"
          elevation="0"
          >Sign Up
        </v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapStores } from "pinia";
import useCartStore from "@/stores/cart";

export default {
  name: "AppHeader",
  data() {
    return {
      screenSmall: true,
      fullscreenMenu: false,
      dialog: false,
      scrollValue: false
    };
  },
  methods: {
    checkScreen() {
      if (window.innerWidth <= 1024) {
        this.screenSmall = true;
      } else {
        this.screenSmall = false;
        this.fullscreenMenu = false;
      }
    },
    burgerClicked() {
      this.fullscreenMenu = !this.fullscreenMenu;
    },
    scrolled() {
      if (window.scrollY <= 240) {
        return (this.scrollValue = false);
      } else {
        return (this.scrollValue = true);
      }
    }
  },
  computed: {
    ...mapStores(useCartStore)
  },
  mounted() {
    /* Could use CSS media Queries with "display: contents/none" for this, but this help me check if the fullscreenMenu is open/close */
    window.addEventListener("load", this.checkScreen);
    window.addEventListener("resize", this.checkScreen);
    window.addEventListener("scroll", this.scrolled);
  }
};
</script>

<style scoped>
.fullscreen {
  height: 80vh;
}
.navbar {
  height: 5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.logo_img {
  height: 3rem;
}
.site_font {
  font-family: "Roboto", sans-serif;
  /* font-family: "Dancing Script", cursive; */
}
</style>
