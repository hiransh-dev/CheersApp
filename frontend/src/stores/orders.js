import { defineStore } from "pinia";
import axios from "axios";

export default defineStore("orders", {
  state: () => {
    return {
      userOrders: [],
      totalPendingOrders: 0 /* Also used this for management- all totalpendingorders */
    };
  },
  actions: {
    async fetchOrders() {
      try {
        const allOrders = await axios.get("/api/order/");
        if (allOrders.status === 200 && allOrders.data[0]._id) {
          if (this.pendingUserOrders !== allOrders.data) {
            this.userOrders = [];
            this.userOrders = allOrders.data;
          }
        }
      } catch (e) {
        // console.log(e);
      }
    },
    async fetchPendingOrders() {
      try {
        const pendingUserOrders = await axios.get("/api/order/pending");
        if (pendingUserOrders.status === 200 && typeof pendingUserOrders.data !== String) {
          this.totalPendingOrders = pendingUserOrders.data.length;
        } else {
          this.totalPendingOrders = 0;
        }
      } catch (e) {
        // console.log(e);
      }
    },
    clearOrders() {
      this.userOrders = [];
    }
  }
});
