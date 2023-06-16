<template>
  <v-parallax class="parallaxHeight" src="../src/assets/cheers_banner.png" scale="0.5">
    <!-- <v-parallax class="parallaxHeight" src="../../../w.jpg" scale="0.5"> -->
    <div class="w-100 h-100 d-flex justify-center align-center">
      <div class="parallaxWidth">
        <RouterLink to="/" class="router_link_decoration">
          <v-img src="/CheersLogo_nobg.png"></v-img>
        </RouterLink>
      </div>
    </div>
  </v-parallax>
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
    height: 80vh;
  }
  .parallaxWidth {
    widows: 75vw;
  }
}
</style>
