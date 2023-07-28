<template>
  <v-snackbar v-model="pageStore.globalAlertSnackbar" vertical>
    <div
      class="text-subtitle-1 pb-2"
      v-if="!pageStore.globalAlertSnackbarTitle || pageStore.globalAlertSnackbarTitle === ''"
    >
      Uh oh!
    </div>
    <div class="text-subtitle-1 pb-2" v-else>{{ pageStore.globalAlertSnackbarTitle }}</div>
    <p>{{ pageStore.globalAlertSnackbarMessage }}</p>
    <template v-slot:actions>
      <v-btn color="yellow-darken-3" variant="text" @click="pageStore.globalAlertSnackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapStores } from "pinia";
import usePageStore from "@/stores/page.js";

export default {
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapStores(usePageStore)
  }
};
</script>

<style scoped></style>
