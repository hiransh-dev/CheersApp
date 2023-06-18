import { defineStore } from "pinia";

export default defineStore("cart", {
  state: () => {
    return {
      cartItems: []
    };
  },
  actions: {
    updateCart(id, quantity) {
      if (this.cartItems.filter((item) => item.id === id)) {
        this.cartItems = this.cartItems.filter((item) => item.id !== id);
      }
      if (quantity !== 0) {
        this.cartItems.push({ id, quantity });
      }
    },
    clearCart() {
      this.cart = [];
    }
  }
});
