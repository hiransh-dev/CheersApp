<template>
  <AppHeader>
    <template v-slot:home>
      <div class="home desktop">
        <div class="desktop_container">
          <v-card class="mt-2 w-100 d-flex flex-row justify-end" elevation="0">
            <v-text-field
              density="compact"
              variant="outlined"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-btn icon="mdi-magnify" elevation="0"></v-btn>
          </v-card>
        </div>
      </div>
    </template>
  </AppHeader>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
  name: "AppHome",
  data() {
    return {};
  },
  components: {
    AppHeader
  }
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
}
@media only screen and (min-width: 1024px) {
  .home {
    display: flex;
    flex-direction: row;
  }
}
</style>
