<template>
  <v-card>
    <v-layout>
      <AppNavbar></AppNavbar>
      <v-main>
        <AppMaincontent>
          <!-- RENDERING MAIN CONTENT HERE -->
          <RouterView></RouterView>
        </AppMaincontent>
      </v-main>
    </v-layout>
  </v-card>
  <AppFooter></AppFooter>
</template>

<script>
import AppMaincontent from "@/layouts/AppMaincontent.vue";
import AppNavbar from "@/components/AppNavbar.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
  name: "AppHome",
  data() {
    return {};
  },
  methods: {},
  components: {
    AppNavbar,
    AppMaincontent,
    AppFooter
  }
};
</script>

<style scoped></style>
