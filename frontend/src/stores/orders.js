import { defineStore } from "pinia";
import axios from "axios";

export default defineStore("orders", {
  state: () => {
    return {
      userOrders: []
    };
  },
  actions: {
    async fetchOrders() {
      try {
        this.userOrders = [];
        const allOrders = await axios.get("/api/order/");
        if (allOrders.status === 200 && allOrders.data) {
          for (let order of allOrders.data) {
            this.userOrders.push(order);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
});
