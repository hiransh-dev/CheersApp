import { defineStore } from "pinia";

export default defineStore("auth", {
  state: () => {
    return {
      email: "",
      firstName: "",
      lastName: "",
      fullName: "",
      phone: ""
    };
  },
  actions: {
    clearAuth() {
      this.email = "";
      this.firstName = "";
      this.lastName = "";
      this.fullName = "";
      this.phone = "";
    }
  }
});
