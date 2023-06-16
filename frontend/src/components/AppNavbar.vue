<template>
  <v-app-bar class="navbar container bg-black" elevation="4">
    <RouterLink to="/" class="router_link_decoration">
      <v-slide-x-transition>
        <!-- <img class="logo_img" v-show="scrollValue" src="/CheersLogo_nobg.png" /> -->
        <!-- <img class="mt-2 logo_img" src="/CheersLogo_nobg.png" /> -->
      </v-slide-x-transition>
    </RouterLink>
    <v-app-bar-title>
      <RouterLink to="/" class="router_link_decoration text-white">Cheers!</RouterLink>
    </v-app-bar-title>
    <v-card
      v-if="!screenSmall"
      style="padding-right: 5vw"
      class="bg-black d-flex justify-end align-center"
      elevation="0"
    >
      <v-btn rounded="lg" class="site_font text-none font-weight-bold mr-1 bg-yellow-darken-1"
        >Login</v-btn
      >
      <v-btn rounded="lg" class="site_font text-none font-weight-bold ml-1 bg-light-blue-lighten-1"
        >Sign Up</v-btn
      >
      <v-btn icon>
        <v-icon>mdi-cart-outline</v-icon>
      </v-btn>
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

  <v-navigation-drawer class="fullscreen w-75" v-model="fullscreenMenu" location="right" temporary>
    <v-list class="d-flex flex-column align-end mr-5 mt-5">
      <v-list-item>
        <v-btn elevation="0" icon>
          <v-icon>mdi-cart-outline</v-icon>
        </v-btn>
      </v-list-item>
      <v-list-item>
        <v-btn
          size="large"
          rounded="lg"
          class="site_font text-none font-weight-bold bg-yellow-darken-1"
          elevation="0"
          >Login</v-btn
        >
      </v-list-item>
      <v-list-item>
        <v-btn
          size="large"
          rounded="lg"
          class="site_font text-none font-weight-bold bg-light-blue-lighten-1"
          elevation="0"
          >Sign Up</v-btn
        >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      screenSmall: true,
      fullscreenMenu: false,
      dialog: false
      // scrollValue: false,
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
    }
  },
  computed: {},
  mounted() {
    /* Could use CSS media Queries with "display: contents/none" for this, but this help me check if the fullscreenMenu is open/close */
    window.addEventListener("load", this.checkScreen);
    window.addEventListener("resize", this.checkScreen);
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
  height: 3.6rem;
}
.site_font {
  font-family: "Roboto", sans-serif;
  /* font-family: "Dancing Script", cursive; */
}
</style>
