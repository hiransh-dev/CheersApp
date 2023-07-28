import { defineStore } from "pinia";

export default defineStore("management", {
  state: () => {
    return {
      username: "",
      userStatus: ""
    };
  }
});
