<template>
  <div class="desktop_container w-100">
    <!-- DELETED MENU ITEMS DIALOG -->
    <v-expansion-panels class="my-4">
      <v-expansion-panel
        class="bg-grey-lighten-1"
        v-for="menuItem of deletedMenuItems"
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
                <v-chip class="mt-2" color="" v-if="setSubCategory === '' && menuItem.subcategory">
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
              <label>Restore</label>
              <v-btn class="ml-1 bg-green" @click="deleteMenuItem(menuItem._id)" elevation="4" icon>
                <v-icon>mdi-plus-thick</v-icon>
              </v-btn>
            </div>
          </v-card>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import usePageStore from "@/stores/page";
import axios from "axios";

export default {
  data() {
    return {
      deletedMenuItems: []
    };
  },
  methods: {
    async deleteMenuItem(id) {
      const itemDeleteStatus = await axios.post(
        "/api/menu/delete",
        { id },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      if (itemDeleteStatus.status === 200) {
        this.pageStore.setGlobalSnackbar("Item Status", itemDeleteStatus.data);
        this.getDeletedMenu();
      }
    },
    async getDeletedMenu() {
      const deleted = await axios.get("/api/menu/deleted");
      if (deleted.status === 200) {
        this.deletedMenuItems = deleted.data;
      }
    }
  },
  computed: {
    ...mapStores(usePageStore)
  },
  mounted() {
    this.getDeletedMenu();
  }
};
</script>

<style scoped></style>
