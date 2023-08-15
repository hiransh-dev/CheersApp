<template>
  <v-list>
    <v-list-item>
      <slot name="nameCard"></slot>
    </v-list-item>
    <v-badge
      color="red-darken-3"
      style="position: absolute; right: 1rem; z-index: 2"
      :content="ordersStore.totalPendingOrders"
    >
    </v-badge>
    <v-list-item>
      <v-btn
        class="w-100"
        @click="changeMainComponent('AppOrdersPending')"
        variant="outlined"
        block
      >
        Pending Orders
      </v-btn>
    </v-list-item>
    <v-list-item>
      <v-btn @click="changeMainComponent('AppOrdersHistory')" variant="outlined" block>
        Orders History
      </v-btn>
    </v-list-item>
    <v-list-item>
      <v-btn @click="changeMainComponent('AppOrdersCancelled')" variant="outlined" block>
        Cancelled Orders
      </v-btn>
    </v-list-item>
    <v-list-item>
      <v-btn @click="changeMainComponent('AppMenuManage')" variant="outlined" block> Menu </v-btn>
    </v-list-item>
    <v-list-item>
      <v-btn @click="changeMainComponent('AppUsers')" variant="outlined" block> Users </v-btn>
    </v-list-item>
    <v-list-item>
      <v-btn @click="changeMainComponent('AppStaff')" variant="outlined" block> Staff </v-btn>
    </v-list-item>
    <v-list-item>
      <v-btn class="bg-red" @click="managementLogout()" elevation="4" block> Logout </v-btn>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapStores } from "pinia";
import useOrdersStore from "@/stores/orders";

export default {
  props: ["changeMainComponent", "managementLogout"],
  computed: {
    ...mapStores(useOrdersStore)
  }
};
</script>

<style scoped></style>
