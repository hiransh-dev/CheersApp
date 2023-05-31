<script>
export default {
  name: "AppHeader",
  data() {
    return {
      searchBar: false /* 0 is Hidden, 1 is Show */,
      screenSmall: true,
      fullscreenMenu: false
    };
  },
  methods: {
    checkScreen() {
      if (window.innerWidth <= 800) {
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
  mounted() {
    /* Could use CSS media Queries with "display: contents/none" for this, but this help me check if the fullscreenMenu is open/close */
    window.addEventListener("load", this.checkScreen);
    window.addEventListener("resize", this.checkScreen);
  }
};
</script>

<template>
  <v-card>
    <v-layout>
      <v-app-bar class="navbar bg-black container" elevation="4">
        <img class="logo_img" src="../assets/CheersLogo_nobg.png" />
        <!-- <v-app-bar-title class="logo_text">Cheers!</v-app-bar-title> -->
        <v-card
          v-if="!screenSmall"
          style="padding-right: 5vw"
          class="w-100 bg-black d-flex justify-end align-center"
          elevation="0"
        >
          <v-responsive max-width="300">
            <v-scroll-x-transition>
              <v-card-text v-show="searchBar == 1">
                <v-text-field
                  class="w-5"
                  density="compact"
                  variant="outlined"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-text>
            </v-scroll-x-transition>
          </v-responsive>
          <v-btn @click.prevent="searchBar = !searchBar" icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-btn rounded="lg" class="site_font text-none font-weight-bold mr-1 bg-yellow-darken-1"
            >Login</v-btn
          >
          <v-btn
            rounded="lg"
            class="site_font text-none font-weight-bold ml-1 bg-light-blue-lighten-1"
            >Sign Up</v-btn
          >
          <v-btn icon>
            <v-icon>mdi-cart-outline</v-icon>
          </v-btn>
        </v-card>
        <v-card class="w-100 bg-black d-flex justify-end" v-else elevation="0">
          <v-btn v-show="!fullscreenMenu" @click.prevent="burgerClicked" icon>
            <v-icon>mdi-menu</v-icon>
          </v-btn>
          <v-btn v-show="fullscreenMenu" @click.prevent="burgerClicked" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card>
      </v-app-bar>

      <v-navigation-drawer
        class="fullscreen w-75"
        v-model="fullscreenMenu"
        location="right"
        temporary
      >
        <v-list class="d-flex flex-column align-end mr-5 mt-5">
          <v-card class="w-100 d-flex flex-row justify-end" elevation="0">
            <v-list-item class="w-75">
              <v-text-field
                density="compact"
                variant="outlined"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-list-item>
            <v-btn elevation="0" icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-card>
          <v-list-item>
            <v-btn elevation="0" icon>
              <v-icon>mdi-cart-outline</v-icon>
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              rounded="lg"
              class="site_font text-none font-weight-bold bg-yellow-darken-1"
              elevation="0"
              >Login</v-btn
            >
          </v-list-item>
          <v-list-item>
            <v-btn
              rounded="lg"
              class="site_font text-none font-weight-bold bg-light-blue-lighten-1"
              elevation="0"
              >Sign Up</v-btn
            >
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main class="mt-5">
        <slot name="home"></slot>
      </v-main>
    </v-layout>
  </v-card>
  <!-- bg-grey-lighten-1 -->
</template>

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
  height: 4.2rem;
}
.site_font {
  font-family: "Roboto", sans-serif;
  /* font-family: "Dancing Script", cursive; */
}
</style>
