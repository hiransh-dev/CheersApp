import { defineStore } from "pinia";
import axios from "axios";

export default defineStore("cart", {
  state: () => {
    return {
      menu: [],
      menuItems: [],
      cartItems: [],
      cartTotal: 0,
      totalItemsCounter: 0,
      category: ""
    };
  },
  actions: {
    async fetchMenu(categoryParam) {
      try {
        const fullMenu = await axios.get("/api/menu/");
        this.menu = fullMenu.data;
        this.menu.forEach((item) => {
          item.quantity = 0;
          /* Check if i can use find instead of On^2 */
          this.cartItems.forEach((cartItem) => {
            if (cartItem.id === item._id) {
              item.quantity = cartItem.quantity;
            }
          });
        });
        if (categoryParam) {
          if (categoryParam === "drinks") {
            this.category = "Drinks";
          } else if (categoryParam === "food") {
            this.category = "Food";
          } else if (categoryParam === "softdrinks") {
            this.category = "Soft Drinks";
          } else {
            this.category = "Drinks";
            // console.log("Error: Invalid category in fetching Menu");
          }
          // this.menuItems = this.menu.filter((item) => {
          //   return item.category === this.category;
          // });
        }
        // TRIAL
        this.menuItems = this.menu.filter((item) => {
          return item.category === this.category;
        });
        this.updateCartTotal();
      } catch (e) {
        console.log("Error in fetching Menu");
      }
    },
    updateCart(id, quantity, price) {
      if (this.cartItems.filter((item) => item.id === id)) {
        this.cartItems = this.cartItems.filter((item) => item.id !== id);
        this.updateCartTotal();
      }
      if (quantity !== 0) {
        this.cartItems.push({ id, quantity, price });
        this.updateCartTotal();
      }
    },
    updateCartTotal() {
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
      this.cartItems = [];
      this.cartTotal = 0;
      this.totalItemsCounter = 0;
    },
    async placeOrder(tableNo) {
      const order = this.cartItems;
      const placedOrder = await axios.post(
        "/api/order/new",
        { order: { order, tableNo } },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );
      if (placedOrder.status === 200 && placedOrder.data.id) {
        // this.clearCart();
        // return "Order has been placed.";
        return placedOrder.data;
      }
    }
  }
});
