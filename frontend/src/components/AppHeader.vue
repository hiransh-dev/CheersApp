<template>
  <div class="desktop_container w-100">
    <v-parallax
      class="parallaxHeight d-flex align-center"
      src="../src/assets/images/cheers_banner.png"
    >
      <RouterLink to="/" class="router_link_decoration">
        <v-img class="mx-2" src="../src/assets/images/CheersLogo_nobg.png"></v-img>
      </RouterLink>
    </v-parallax>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {};
  }
};
</script>

<style scoped>
.parallaxHeight {
  height: 50vh;
}
.parallaxWidth {
  widows: 50vw;
}
</style>
