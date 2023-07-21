import { defineStore } from "pinia";

export default defineStore("page", {
  state: () => {
    return {
      dialogCart: false,
      dialogAuth: false,
      setTable: 0
    };
  },
  actions: {}
});
