<template>
  <!-- SELECT TABLE CARD -->
  <v-card
    v-if="pageStore.setTable !== 0"
    class="bg-green-darken-3 text-center my-2 pa-2"
    rounded="lg"
    elevation="12"
  >
    <v-icon color="black" icon="mdi-table-chair" size="x-large"></v-icon>
    <v-card-title class="site_font text-black">Your table no. is</v-card-title>
    <v-btn
      class="bg-black site_font"
      size="x-large"
      rounded="lg"
      @click="dialogSetTable = true"
      block
    >
      {{ pageStore.setTable }}
    </v-btn>
  </v-card>
  <v-card v-else class="bg-blue-grey-darken-3 text-center my-2 pa-2" rounded="lg" elevation="12">
    <v-icon color="black" icon="mdi-table-chair" size="x-large"></v-icon>
    <v-card-title class="site_font text-black">Choose your Table</v-card-title>
    <v-btn
      class="bg-black site_font"
      size="x-large"
      rounded="lg"
      @click="dialogSetTable = true"
      block
    >
      Choose Table
    </v-btn>
  </v-card>
  <!-- SELECT TABLE DIALOG -->
  <v-dialog
    class="bg-grey-lighten-2"
    v-model="dialogSetTable"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
  >
    <v-card class="container">
      <v-toolbar class="bg-black" dark>
        <!-- <v-btn icon dark @click="dialogSetTable = false">
          <v-icon>mdi-close</v-icon>
        </v-btn> -->
        <v-toolbar-title class="site_font">Table</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn variant="text" @click="dialogSetTable = false"> Save </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <label class="site_font text-h4 text-center my-5 mx-5">Choose your table</label>
      <div class="desktop_container w-100">
        <v-list>
          <v-list-item v-for="table of tables" :key="table">
            <v-btn
              @click="(pageStore.setTable = table), (dialogSetTable = false)"
              class="bg-black w-100 site_font btn_font"
              size="x-large"
              rounded="lg"
              elevation="0"
            >
              {{ table }}
            </v-btn>
          </v-list-item>
        </v-list>
      </div>
    </v-card>
  </v-dialog>
  <!-- SEARCH  -->
  <!-- <label class="site_font text-h4 text-center my-5">Menu</label> -->
  <v-card id="searchbar" class="my-4 w-100 d-flex flex-row justify-end" rounded="lg" elevation="6">
    <v-text-field variant="outlined" label="Search Menu" single-line hide-details></v-text-field>
    <v-btn icon="mdi-magnify" elevation="0"></v-btn>
  </v-card>
  <!-- ADD ORDER PENDING CARD  -->
  <!-- MAYBE A LOGGED IN CARD  -->
  <slot></slot>
</template>

<script>
import { mapStores } from "pinia";
import usePageStore from "@/stores/page";

export default {
  name: "AppHeader",
  data() {
    return {
      dialogSetTable: false,
      tables: 32
    };
  },
  computed: {
    ...mapStores(usePageStore)
  }
};
</script>

<style scoped></style>
