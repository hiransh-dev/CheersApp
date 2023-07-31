import { defineStore } from "pinia";
import axios from "axios";

export default defineStore("auth", {
  state: () => {
    return {
      email: "",
      firstName: "",
      lastName: "",
      fullName: "",
      phone: "",
      username: "",
      isAdmin: "",
      isStaff: ""
    };
  },
  actions: {
    clearAuth() {
      this.email = "";
      this.firstName = "";
      this.lastName = "";
      this.fullName = "";
      this.phone = "";
      this.username = "";
      this.isAdmin = "";
      this.isStaff = "";
    },
    // Only checks if user session is logged in sending GET request and checking req.user, instead of post with user.authenticate
    async checkLogin() {
      try {
        const checkLoggedIn = await axios.get("/api/user/check");
        if (
          checkLoggedIn.data.email &&
          (!checkLoggedIn.data.isAdmin || !checkLoggedIn.data.isStaff)
        ) {
          this.email = checkLoggedIn.data.email;
          this.firstName = checkLoggedIn.data.firstName;
          this.lastName = checkLoggedIn.data.lastName;
          this.fullName = checkLoggedIn.data.fullName;
          this.phone = checkLoggedIn.data.phoneNumber;
        } else if (checkLoggedIn.data.isAdmin === true || checkLoggedIn.data.isStaff === true) {
          this.username = checkLoggedIn.data.username;
          this.isAdmin = checkLoggedIn.data.isAdmin;
          this.isStaff = checkLoggedIn.data.isStaff;
          console.log(checkLoggedIn.data);
        } else {
          this.clearAuth;
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
