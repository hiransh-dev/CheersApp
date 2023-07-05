<template>
  <!-- SELECT PUB CARD -->
  <!-- <v-card class="bg-green-darken-3 text-center pa-2 desktop_container" rounded="lg" elevation="24"> -->
  <v-card
    v-if="pageStore.setPub !== ''"
    class="bg-green-darken-3 text-center my-2 pa-2"
    rounded="lg"
    elevation="12"
  >
    <v-icon color="black" icon="mdi-glass-mug-variant" size="x-large"></v-icon>
    <v-card-title class="site_font text-black">Your pub location is:</v-card-title>
    <v-btn class="bg-black site_font" size="x-large" @click="dialogSetPub = true" block>
      {{ pageStore.setPub }}
    </v-btn>
  </v-card>
  <v-card v-else class="bg-green-darken-3 text-center my-2 pa-2" rounded="lg" elevation="12">
    <v-icon color="black" icon="mdi-glass-mug-variant" size="x-large"></v-icon>
    <v-card-title class="site_font text-black">Choose your pub location</v-card-title>
    <v-btn class="bg-black site_font" size="x-large" @click="dialogSetPub = true" block
      >Choose Pub</v-btn
    >
  </v-card>
  <v-card
    v-if="pageStore.setTable !== 0"
    class="bg-blue-darken-3 text-center my-2 pa-2"
    rounded="lg"
    elevation="12"
  >
    <v-icon color="black" icon="mdi-table-chair" size="x-large"></v-icon>
    <v-card-title class="site_font text-black">Your table no. is</v-card-title>
    <v-btn class="bg-black site_font" size="x-large" @click="dialogSetTable = true" block>
      {{ pageStore.setTable }}
    </v-btn>
  </v-card>
  <v-card v-else class="bg-blue-darken-3 text-center my-2 pa-2" rounded="lg" elevation="12">
    <v-icon color="black" icon="mdi-table-chair" size="x-large"></v-icon>
    <v-card-title class="site_font text-black">Choose your Table</v-card-title>
    <v-btn class="bg-black site_font" size="x-large" @click="dialogSetTable = true" block>
      Choose Table
    </v-btn>
  </v-card>
  <!-- SELECT PUB DIALOG -->
  <v-dialog
    class="bg-grey-lighten-2"
    v-model="dialogSetPub"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar class="bg-black" dark>
        <v-btn icon dark @click="dialogSetPub = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title class="site_font">Pubs</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn variant="text" @click="dialogSetPub = false"> Save </v-btn>
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
        <v-divider v-if="!screenSmall" thickness="4" color="yellow-darken-4" vertical></v-divider>
        <v-divider v-else thickness="4" color="yellow-darken-4"></v-divider>
        <div class="desktop_container_small">
          <v-list>
            <v-list-item>
              <v-autocomplete
                v-model="pageStore.setPub"
                class="mt-5"
                prepend-inner-icon="mdi-map-marker"
                label="Location Name"
                variant="outlined"
                :items="all_locations"
              ></v-autocomplete>
            </v-list-item>
            <!-- <v-list-item class="desktop_container_small">
              <v-btn class="bg-black w-100 site_font btn_font" size="large" elevation="6">
                View all pubs
              </v-btn>
            </v-list-item> -->
          </v-list>
        </div>
      </div>
    </v-card>
  </v-dialog>
  <!-- SELECT TABLE DIALOG -->
  <v-dialog
    class="bg-grey-lighten-2"
    v-model="dialogSetTable"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar class="bg-black" dark>
        <v-btn icon dark @click="dialogSetTable = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title class="site_font">Table</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn variant="text" @click="dialogSetTable = false"> Save </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <label class="site_font text-h4 text-center my-5 mx-5">Choose your table</label>
      <div class="desktop" style="align-items: center">
        <div class="desktop_container_small">
          <v-list>
            <v-list-item v-for="table of tables" :key="table">
              <v-btn
                @click="(pageStore.setTable = table), (dialogSetTable = false)"
                class="bg-black w-100 site_font btn_font"
                size="x-large"
                elevation="12"
              >
                {{ table }}
              </v-btn>
            </v-list-item>
          </v-list>
        </div>
      </div>
    </v-card>
  </v-dialog>
  <!-- SEARCH  -->
  <!-- <label class="site_font text-h4 text-center my-5">Menu</label> -->
  <v-card id="searchbar" class="my-4 w-100 d-flex flex-row justify-end" rounded="lg" elevation="6">
    <v-text-field variant="outlined" label="Search Menu" single-line hide-details></v-text-field>
    <v-btn icon="mdi-magnify" elevation="0"></v-btn>
  </v-card>
  <slot></slot>
</template>

<script>
import { mapStores } from "pinia";
import usePageStore from "@/stores/page";

export default {
  name: "AppHeader",
  data() {
    return {
      dialogSetPub: false,
      dialogSetTable: false,
      all_locations: ["Central London", "Ilford", "Barking", "Stratford"],
      tables: 32
    };
  },
  computed: {
    ...mapStores(usePageStore)
  }
};
</script>

<style scoped></style>
