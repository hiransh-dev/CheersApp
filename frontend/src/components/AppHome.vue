<template>
  <AppHeader>
    <template v-slot:home>
      <div class="main container">
        <h1>Welcome to Cheers!</h1>
      </div>
    </template>
  </AppHeader>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
  name: "AppHome",
  components: {
    AppHeader
  }
};
</script>

<style scoped></style>
