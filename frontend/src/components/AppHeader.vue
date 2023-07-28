<template>
  <div class="desktop_container">
    <v-parallax class="parallaxHeight" src="../src/assets/images/cheers_banner.png">
      <div class="w-100 h-100 d-flex justify-center align-center">
        <RouterLink to="/" class="router_link_decoration">
          <v-img class="mx-2" src="../src/assets/images/CheersLogo_nobg.png"></v-img>
        </RouterLink>
      </div>
    </v-parallax>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      parallaxImgRatio: "1"
    };
  }
};
</script>

<style scoped>
.parallaxHeight {
  height: 40vh;
}
.parallaxWidth {
  widows: 50vw;
}
@media only screen and (min-width: 1024px) {
  .parallaxHeight {
    height: 50vh;
    max-height: 40rem;
  }
}
</style>
