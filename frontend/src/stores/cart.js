import { defineStore } from "pinia";
import axios from "axios";

export default defineStore("cart", {
  state: () => {
    return {
      menu: [],
      menuItems: [],
      cartItems: [],
      cartTotal: 0,
      dialogCart: false,
      totalItemsCounter: 0
    };
  },
  actions: {
    async fetchMenu() {
      try {
        const fullMenu = await axios.get(`/api/menu/Drinks`);
        this.menu = fullMenu.data;
        this.menu.forEach((item) => {
          item.quantity = 0;
          this.cartItems.forEach((cartItem) => {
            if (cartItem.id === item._id) {
              item.quantity = cartItem.quantity;
            }
          });
        });
        /* Create a reference array which shares same data, for filtering category */
        this.menuItems = this.menu;
        this.updateCartTotal();
      } catch (e) {
        console.log(e);
      }
    },
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
      this.totalItemsCounter = 0;
      this.cartItems.forEach((item) => {
        this.totalItemsCounter = parseInt(this.totalItemsCounter + item.quantity);
        this.cartTotal = parseFloat(this.cartTotal + item.quantity * item.price);
      });
    },
    addToCart(id) {
      const index = this.menu.findIndex((item) => {
        return item._id === id;
      });
      this.menu[index].quantity++;
      this.updateCart(id, this.menu[index].quantity, this.menu[index].price);
    },
    removeFromCart(id) {
      const index = this.menu.findIndex((item) => {
        return item._id === id;
      });
      if (this.menu[index].quantity !== 0) {
        this.menu[index].quantity--;
      }
      this.updateCart(id, this.menu[index].quantity, this.menu[index].price);
    },
    clearCart() {
      this.cart = [];
    }
  }
});
