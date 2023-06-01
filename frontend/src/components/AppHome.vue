<template>
  <AppHeader>
    <template v-slot:home>
      <div class="home d-flex flex-column">
        <h1>Welcome to Cheers!</h1>
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
}
</style>
