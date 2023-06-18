import { defineStore } from "pinia";

export default defineStore("cart", {
  state: () => {
    return {
      cartItems: [],
      cartTotal: "0"
    };
  },
  actions: {
    updateCart(id, quantity, price) {
      if (this.cartItems.filter((item) => item.id === id)) {
        this.cartItems = this.cartItems.filter((item) => item.id !== id);
        /* Verify price from backend after checkout is clicked */
        this.updateCartTotal();
      }
      if (quantity !== 0) {
        this.cartItems.push({ id, quantity, price });
        /* Verify price from backend after checkout is clicked */
        this.updateCartTotal();
      }
    },
    updateCartTotal() {
      /* Verify price from backend after checkout is clicked */
      this.cartTotal = 0;
      this.cartItems.forEach((item) => {
        this.cartTotal = parseFloat(this.cartTotal + item.quantity * item.price);
      });
    },
    clearCart() {
      this.cart = [];
    }
  }
});
