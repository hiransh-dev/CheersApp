<template>
  <form @submit.prevent="addToMenu" :validation-schema="schema">
    <v-text-field v-model="title" label="Title" name="title"></v-text-field>
    <v-text-field v-model="desc" label="Description" :error-messages="message"></v-text-field>
    <v-text-field v-model="price" label="Price" :error-messages="price"></v-text-field>
    <v-select
      clearable
      label="Category"
      v-model="category"
      :items="['Drinks', 'Food', 'Bar Snacks', 'Soft Drinks']"
    ></v-select>
    <v-select
      clearable
      label="Sub-Category"
      v-model="subcategory"
      :items="['Beers', 'World Beers', 'Ale', 'Whiskey', 'Vodka', 'Rum']"
    ></v-select>

    <v-btn
      type="submit"
      size="large"
      rounded="lg"
      class="site_font text-none font-weight-bold bg-light-green-darken-3"
      elevation="0"
      >Add to Menu</v-btn
    >
    <!-- :disabled="reg_on_submit" -->
  </form>
</template>
<script>
import axios from "axios";

export default {
  name: "ManagementMenuView",
  data() {
    return {
      title: "",
      desc: "",
      price: "",
      category: "",
      subcategory: "",
      schema: {
        title: "required|min:3|max:100|alpha_spaces",
        desc: "required|min:3|max:100",
        price: "required|min_value:1|max_value:100|numeric",
        category: "required|Drinks,Food,BarSnacks,Soft Drinks",
        subcategory: ["Beers", "World Beers", "Ale", "Whiskey", "Vodka", "Rum"]
      }
    };
  },
  methods: {
    async addToMenu() {
      const addMenuItem = await axios.post(
        "http://localhost:3000/api/management/menu",
        {
          menuItem: {
            title: this.title,
            desc: this.desc,
            price: this.price,
            category: this.category,
            subcategory: this.subcategory
          }
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );
      console.log(addMenuItem);
    }
  }
};
</script>

<style></style>
