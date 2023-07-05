<template>
  <!-- SELECT PUB CARD -->
  <v-card class="bg-green-darken-3 text-center pa-2 desktop_container" rounded="lg" elevation="24">
    <v-card-title class="site_font text-black">Choose your pub location</v-card-title>
    <v-btn class="bg-black site_font" size="x-large" @click="dialog = true" block>Choose Pub</v-btn>
  </v-card>
  <!-- SELECT PUB DIALOG -->
  <v-dialog
    class="bg-grey-lighten-2"
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
                elevation="6"
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
              <v-btn class="bg-black w-100 site_font btn_font" size="large" elevation="6">
                View all pubs
              </v-btn>
            </v-list-item>
          </v-list>
        </div>
      </div>
    </v-card>
  </v-dialog>
  <!-- SEARCH  -->
  <v-card id="searchbar" class="my-4 w-100 d-flex flex-row justify-end" rounded="lg" elevation="6">
    <v-text-field variant="outlined" label="Search Menu" single-line hide-details></v-text-field>
    <v-btn icon="mdi-magnify" elevation="0"></v-btn>
  </v-card>
  <slot></slot>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      dialog: false,
      all_locations: ["Central London", "Ilford", "Barking", "Stratford"]
    };
  }
};
</script>

<style scoped></style>
