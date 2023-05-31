<script>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<template>
  <AppHeader></AppHeader>
  <AppFooter></AppFooter>
</template>

<style scoped></style>
