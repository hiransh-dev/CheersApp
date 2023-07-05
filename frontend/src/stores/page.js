import { defineStore } from "pinia";

export default defineStore("page", {
  state: () => {
    return {
      dialogCart: false,
      dialogAuth: false,
      setPub: "",
      setTable: 0
    };
  },
  actions: {}
});
