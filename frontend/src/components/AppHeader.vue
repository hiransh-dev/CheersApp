<script>
export default {
  name: "AppHeader",
  data() {
    return {
      searchBar: false /* 0 is Hidden, 1 is Show */,
      screenSmall: true,
      fullscreenMenu: false,
      dialog: false,
      all_locations: ["Central London", "Ilford", "Barking", "Stratford"]
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
      <v-app-bar class="navbar container bg-black" elevation="4">
        <img class="logo_img" src="../assets/CheersLogo_nobg.png" />
        <v-app-bar-title></v-app-bar-title>
        <v-card
          v-if="!screenSmall"
          style="padding-right: 5vw"
          class="bg-black d-flex justify-end align-center"
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
        <v-card class="bg-black d-flex justify-end" v-else elevation="0">
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
        <div class="main container">
          <v-btn @click="dialog = true">Select Location</v-btn>
          <v-dialog
            v-model="dialog"
            fullscreen
            :scrim="false"
            transition="dialog-bottom-transition"
          >
            <v-card>
              <v-toolbar class="bg-black" dark>
                <v-btn icon dark @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title class="site_font">Choose Pub</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn variant="text" @click="dialog = false"> Save </v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <label class="site_font text-h4 text-center my-5 mx-5"
                >Where do you want to place your order?</label
              >
              <v-list>
                <v-list-item>
                  <v-btn
                    class="bg-green-darken-2 w-100 site_font btn_font"
                    size="large"
                    elevation="24"
                    prepend-icon="mdi-navigation-variant"
                  >
                    Enable Location
                  </v-btn>
                </v-list-item>
              </v-list>
              <v-divider></v-divider>
              <v-list>
                <v-list-item>
                  <v-autocomplete
                    class="mt-5"
                    prepend-inner-icon="mdi-map-marker"
                    label="Location Name"
                    variant="outlined"
                    :items="all_locations"
                  ></v-autocomplete>
                </v-list-item>
                <v-list-item>
                  <v-btn class="bg-black w-100 site_font btn_font" size="large" elevation="24">
                    View all pubs
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-card>
          </v-dialog>
          <slot name="home"></slot>
        </div>
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
