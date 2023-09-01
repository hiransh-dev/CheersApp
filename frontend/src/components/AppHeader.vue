<template>
  <div class="desktop_container w-100">
    <v-parallax class="parallaxHeight d-flex align-center" :src="cheersBanner">
      <RouterLink to="/" class="router_link_decoration">
        <v-img class="mx-2" :src="cheersBannerNoBg"></v-img>
      </RouterLink>
    </v-parallax>
  </div>
</template>

<script>
import cheersBanner from "/src/assets/images/cheers_banner.png";
import cheersBannerNoBg from "/src/assets/images/CheersLogo_nobg.png";

export default {
  name: "AppHeader",
  data() {
    return {
      cheersBanner,
      cheersBannerNoBg
    };
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
