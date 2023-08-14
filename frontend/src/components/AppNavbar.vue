<template>
  <v-app-bar class="navbar bg-black" elevation="4">
    <v-app-bar-title>
      <RouterLink v-show="!scrollValue" to="/" class="router_link_decoration text-white"
        >Cheers!
      </RouterLink>
    </v-app-bar-title>
    <v-card
      v-if="!screenSmall"
      style="margin-right: 1rem"
      class="bg-black d-flex justify-end align-center"
      elevation="0"
    >
      <v-btn class="bg-transparent ma-1" @click="pageStore.dialogCart = true" elevation="0" icon>
        <v-icon>mdi-cart-outline</v-icon>
      </v-btn>
      <v-btn class="bg-transparent ma-1" @click="pageStore.dialogOrders = true" elevation="0" icon>
        <v-icon>mdi-format-list-bulleted</v-icon>
      </v-btn>
      <v-btn rounded="lg" :class="navbarBtnColorAcc" @click="pageStore.dialogAuth = true">
        {{ accountName }}
      </v-btn>
    </v-card>
    <v-card class="bg-transparent d-flex justify-end" v-else elevation="0">
      <v-btn v-show="!fullscreenMenu" @click.prevent="burgerClicked" icon>
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-btn v-show="fullscreenMenu" @click.prevent="burgerClicked" icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card>
  </v-app-bar>

  <v-navigation-drawer
    class="fullscreen w-75 bg-grey-lighten-2"
    v-model="fullscreenMenu"
    location="right"
    temporary
  >
    <v-list class="mt-5" style="font-size: 1rem; color: black" nav>
      <v-list-item
        v-if="accountName === 'Management'"
        @click="pageStore.dialogAuth = true"
        class="text-black d-flex align-center pa-2"
        value="management"
      >
        <v-icon color="blue-darken-3" size="x-large">mdi-badge-account</v-icon>
        <label class="ml-4 text-blue-darken-3">{{ accountName }}</label>
      </v-list-item>
      <v-list-item
        v-else
        @click="pageStore.dialogAuth = true"
        class="text-black d-flex align-center pa-2"
        value="account"
      >
        <v-icon color="black" size="x-large">mdi-account</v-icon>
        <label class="ml-4">{{ accountName }}</label>
      </v-list-item>
      <v-list-item
        v-if="authStore.email && authStore.email !== ''"
        @click="pageStore.dialogOrders = true"
        class="text-black d-flex align-center pa-2"
        value="orders"
      >
        <v-icon color="black" size="x-large">mdi-format-list-bulleted</v-icon>
        <label class="ml-4">Orders</label>
      </v-list-item>
      <v-list-item
        v-if="authStore.email && authStore.email !== ''"
        @click="fnLogout()"
        class="text-black d-flex align-center pa-2"
        value="logout"
      >
        <v-icon color="black" size="x-large">mdi-logout</v-icon>
        <label class="ml-4">Logout</label>
      </v-list-item>
      <v-divider thickness="4" color="yellow-darken-4"></v-divider>
      <RouterLink
        :to="{ name: 'menu', params: { category: 'drinks' } }"
        class="router_link_decoration"
      >
        <v-list-item class="text-black d-flex flex-row align-center pa-2" value="drinks">
          <v-icon color="black" size="x-large">mdi-glass-mug-variant</v-icon>
          <label class="ml-4">Drinks</label>
        </v-list-item>
      </RouterLink>
      <RouterLink
        :to="{ name: 'menu', params: { category: 'food' } }"
        class="router_link_decoration"
      >
        <v-list-item class="text-black d-flex align-center pa-2" value="food">
          <v-icon color="black" size="x-large">mdi-hamburger</v-icon>
          <label class="ml-4">Food</label>
        </v-list-item>
      </RouterLink>
      <RouterLink
        :to="{ name: 'menu', params: { category: 'softdrinks' } }"
        class="router_link_decoration"
      >
        <v-list-item class="text-black d-flex align-center pa-2" value="softdrinks">
          <v-icon color="black" size="x-large">mdi-beer</v-icon>
          <label class="ml-4">Soft Drinks</label>
        </v-list-item>
      </RouterLink>
      <v-divider thickness="4" color="yellow-darken-4"></v-divider>
      <v-btn
        rounded="lg"
        class="text-white bg-grey-darken-4 my-1"
        size="x-large"
        elevation="6"
        @click="pageStore.dialogCart = true"
        block
        icon
      >
        <v-icon class="mx-2">mdi-cart</v-icon>
        View Cart
      </v-btn>
    </v-list>
  </v-navigation-drawer>
  <v-snackbar v-model="notSetSnackbar" vertical>
    <div class="text-subtitle-1 pb-2">Logged out!</div>
    <p>You've been logged out</p>
    <template v-slot:actions>
      <v-btn color="yellow-darken-3" variant="text" @click="notSetSnackbar = false"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapStores } from "pinia";
import usepageStore from "@/stores/page";
import useauthStore from "@/stores/auth";
import useCartStore from "@/stores/cart";
import useOrdersStore from "@/stores/orders";

export default {
  name: "AppHeader",
  data() {
    return {
      screenSmall: true,
      fullscreenMenu: false,
      dialog: false,
      scrollValue: false,
      notSetSnackbar: false
    };
  },
  methods: {
    checkScreen() {
      if (window.innerWidth <= 768) {
        this.screenSmall = true;
      } else {
        this.screenSmall = false;
        this.fullscreenMenu = false;
      }
    },
    burgerClicked() {
      this.fullscreenMenu = !this.fullscreenMenu;
    },
    fnLogout() {
      this.authStore.fnAuthLogout();
      this.ordersStore.clearOrders();
      this.cartStore.clearCart();
      this.cartStore.fetchMenu();
      this.notSetSnackbar = true;
    }
  },
  computed: {
    ...mapStores(usepageStore),
    ...mapStores(useauthStore),
    ...mapStores(useOrdersStore),
    ...mapStores(useCartStore),
    accountName() {
      if (this.authStore.email && this.authStore.email !== "") {
        return this.authStore.firstName;
      } else if (
        this.authStore.username &&
        this.authStore.username !== "" &&
        (this.authStore.isAdmin === true || this.authStore.isStaff === true)
      ) {
        return "Management";
      } else {
        return "Account";
      }
    },
    navbarBtnColorAcc() {
      if (this.accountName === "Management") {
        return "site_font text-none text-black font-weight-bold ma-1 bg-blue-darken-3";
      } else {
        return "site_font text-none text-black font-weight-bold ma-1 bg-yellow-darken-3";
      }
    }
  },
  mounted() {
    /* Could use CSS media Queries with "display: contents/none" for this, but this help me check if the fullscreenMenu is open/close */
    window.addEventListener("load", this.checkScreen);
    window.addEventListener("resize", this.checkScreen);
    this.authStore.checkLogin();
  },
  updated() {
    this.authStore.checkLogin();
  }
};
</script>

<style scoped>
.fullscreen {
  height: 80vh;
}
.navbar {
  height: 5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.logo_img {
  height: 3rem;
}
.site_font {
  font-family: "Roboto", sans-serif;
  /* font-family: "Dancing Script", cursive; */
}
</style>
