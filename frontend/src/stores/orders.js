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
        const allOrders = await axios.get("/api/order/");
        if (allOrders.status === 200) {
          for (let order of allOrders.data) {
            console.log(order);
            this.userOrders.push(order);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
});
