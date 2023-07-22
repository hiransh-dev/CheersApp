import { defineStore } from "pinia";
import axios from "axios";

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
    },
    // Only checks if user session is logged in sending GET request and checking req.user, instead of post with user.authenticate
    async checkLogin() {
      try {
        const checkLoggedIn = await axios.get("/api/user/check");
        if (checkLoggedIn.data.email) {
          this.email = checkLoggedIn.data.email;
          this.firstName = checkLoggedIn.data.firstName;
          this.lastName = checkLoggedIn.data.lastName;
          this.fullName = checkLoggedIn.data.fullName;
          this.phone = checkLoggedIn.data.phoneNumber;
        }
      } catch (e) {
        console.log("Can't fetch Logged in user information");
      }
    },
    async fnAuthLogout() {
      try {
        const logoutStatus = await axios.get("/api/user/logout");
        if (logoutStatus.status === 200) {
          this.clearAuth();
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
});
