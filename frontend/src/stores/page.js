import { defineStore } from "pinia";

export default defineStore("page", {
  state: () => {
    return {
      globalAlertSnackbar: false,
      globalAlertSnackbarMessage: "",
      globalAlertSnackbarTitle: "",
      dialogCart: false,
      dialogAuth: false,
      dialogOrders: false,
      setTable: 0
    };
  },
  actions: {
    setGlobalSnackbar(title, message) {
      this.globalAlertSnackbarTitle = title;
      this.globalAlertSnackbarMessage = message;
      this.globalAlertSnackbar = true;
    }
  }
});
