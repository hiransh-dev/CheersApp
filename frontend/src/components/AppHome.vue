<template>
  <v-card>
    <v-layout>
      <AppNavbar></AppNavbar>
      <v-main>
        <AppMaincontent></AppMaincontent>
      </v-main>
    </v-layout>
  </v-card>
  <AppFooter></AppFooter>
</template>

<script>
import AppNavbar from "@/components/AppNavbar.vue";
import AppMaincontent from "@/components/AppMaincontent.vue";
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
