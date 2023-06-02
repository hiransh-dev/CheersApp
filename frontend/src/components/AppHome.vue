<template>
  <AppHeader>
    <template v-slot:main>
      <RouterView></RouterView>
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
  methods: {},
  components: {
    AppHeader
  }
};
</script>

<style scoped></style>
