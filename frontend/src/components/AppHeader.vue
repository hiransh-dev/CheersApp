<template>
  <v-card>
    <v-layout>
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
          <v-btn
            rounded="lg"
            class="site_font text-none font-weight-bold ml-1 bg-light-blue-lighten-1"
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

      <v-navigation-drawer
        class="fullscreen w-75"
        v-model="fullscreenMenu"
        location="right"
        temporary
      >
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
      <v-main>
        <v-parallax class="parallaxHeight" src="../src/assets/cheers_banner.png" scale="0.5">
          <!-- <v-parallax class="parallaxHeight" src="../../../w.jpg" scale="0.5"> -->
          <div class="w-100 h-100 d-flex justify-center align-center">
            <div :class="cheersBannerImgSize">
              <RouterLink to="/" class="router_link_decoration">
                <v-img src="/CheersLogo_nobg.png"></v-img>
              </RouterLink>
            </div>
          </div>
        </v-parallax>

        <div class="main container">
          <div class="desktop">
            <div class="desktop_container">
              <v-card class="bg-grey-darken-3 text-center desktop_container" elevation="24">
                <v-card-title class="site_font text-white"
                  >Choose your pub location to order</v-card-title
                >
                <v-btn class="bg-black ma-2" size="large" @click="dialog = true">Choose Pub</v-btn>
              </v-card>
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
                    <v-toolbar-title class="site_font">Pubs</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                      <v-btn variant="text" @click="dialog = false"> Save </v-btn>
                    </v-toolbar-items>
                  </v-toolbar>
                  <label class="site_font text-h4 text-center my-5 mx-5"
                    >Where do you want to place your order?</label
                  >

                  <div class="desktop" style="align-items: center">
                    <div class="desktop_container_small">
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
                    </div>
                    <v-divider v-if="!screenSmall" vertical></v-divider>
                    <v-divider v-else></v-divider>
                    <div class="desktop_container_small">
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
                        <v-list-item class="desktop_container_small">
                          <v-btn
                            class="bg-black w-100 site_font btn_font"
                            size="large"
                            elevation="24"
                          >
                            View all pubs
                          </v-btn>
                        </v-list-item>
                      </v-list>
                    </div>
                  </div>
                </v-card>
              </v-dialog>

              <v-card class="my-4 w-100 d-flex flex-row justify-end" elevation="12">
                <v-text-field
                  variant="outlined"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
                <v-btn icon="mdi-magnify" elevation="0"></v-btn>
              </v-card>
              <slot name="main"></slot>
            </div>
          </div>
        </div>
      </v-main>
    </v-layout>
  </v-card>
  <!-- bg-grey-lighten-1 -->
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      screenSmall: true,
      fullscreenMenu: false,
      dialog: false,
      // scrollValue: false,
      parallaxImgRatio: "1",
      cheersBannerImgSize: "w-50",
      all_locations: ["Central London", "Ilford", "Barking", "Stratford"]
    };
  },
  methods: {
    checkScreen() {
      if (window.innerWidth <= 1024) {
        this.screenSmall = true;
        this.cheersBannerImgSize = "w-75";
      } else {
        this.screenSmall = false;
        this.fullscreenMenu = false;
        this.cheersBannerImgSize = "w-50";
      }
    },
    burgerClicked() {
      this.fullscreenMenu = !this.fullscreenMenu;
    }
    // scrolled() {
    //   if (window.scrollY <= 200) {
    //     this.scrollValue = false;
    //   } else {
    //     this.scrollValue = true;
    //   }
    // }
  },
  computed: {},
  mounted() {
    /* Could use CSS media Queries with "display: contents/none" for this, but this help me check if the fullscreenMenu is open/close */
    window.addEventListener("load", this.checkScreen);
    window.addEventListener("resize", this.checkScreen);
    // window.addEventListener("scroll", this.scrolled);
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
.parallaxHeight {
  height: 40vh;
}
@media only screen and (min-width: 1024px) {
  .parallaxHeight {
    height: 80vh;
  }
}
</style>
