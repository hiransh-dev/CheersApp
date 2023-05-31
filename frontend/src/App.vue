<script>
import AppHome from "./components/AppHome.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  name: "App",
  components: {
    AppHome,
    AppFooter
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<template>
  <AppHome></AppHome>
  <AppFooter></AppFooter>
</template>

<style scoped></style>
