<template>
  <div>
    <v-expand-transition>
      <v-alert v-if="res_show_alert" :type="res_alert_variant" :title="res_alert_variant">
        {{ res_alert_message }}
      </v-alert>
    </v-expand-transition>
  </div>
  <veeForm @submit="addToMenu" :validation-schema="schema">
    <veeField id="title" name="title" v-slot="{ field, errorMessage }">
      <v-text-field
        v-bind="field"
        v-model="title"
        label="Title"
        :error-messages="errorMessage"
      ></v-text-field>
    </veeField>

    <veeField id="desc" name="desc" v-slot="{ field, errorMessage }">
      <v-text-field
        v-bind="field"
        v-model="desc"
        label="Description"
        :error-messages="errorMessage"
      ></v-text-field>
    </veeField>

    <veeField id="price" name="price" v-slot="{ field, errorMessage }">
      <v-text-field
        v-bind="field"
        v-model="price"
        label="Price"
        :error-messages="errorMessage"
      ></v-text-field>
    </veeField>

    <veeField name="category" v-slot="{ field, errorMessage }">
      <v-select
        clearable
        label="Category"
        v-bind="field"
        v-model="category"
        :error-messages="errorMessage"
        :items="['Drinks', 'Food', 'Soft Drinks']"
      ></v-select>
    </veeField>

    <veeField name="subcategory" v-slot="{ field, errorMessage }">
      <v-select
        clearable
        label="Sub-category"
        v-bind="field"
        v-model="subcategory"
        :error-messages="errorMessage"
        :items="['Beers', 'World Beers', 'Ale', 'Whiskey', 'Vodka', 'Rum']"
      ></v-select>
    </veeField>

    <v-btn
      type="submit"
      size="large"
      rounded="lg"
      class="site_font text-none font-weight-bold bg-light-green-darken-3"
      elevation="0"
      :disabled="res_on_submit"
      :loading="res_on_submit"
      >Add to Menu</v-btn
    >
    <!--  -->
  </veeForm>
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
        title: "required|min:3|max:100",
        desc: "min:3|max:150",
        price: "required|min_value:1|max_value:100|regex:[0-9]",
        category: "required|category:Drinks,Food,Soft Drinks",
        subcategory: `category:Beers,World Beers,Ale,Whiskey,Vodka,Rum`
        // subcategory: `required|category:Beers,World Beers,Ale,Whiskey,Vodka,Rum`
      },
      res_on_submit: false,
      res_show_alert: false,
      res_alert_variant: "",
      res_alert_message: ""
    };
  },
  methods: {
    async addToMenu() {
      this.res_on_submit = true;
      try {
        const addMenuItem = await axios.post(
          "/api/menu/new",
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
        if (addMenuItem.status === 200 && addMenuItem.data.title) {
          this.res_alert_message = `New Menu Item Added. \nTitle: ${addMenuItem.data.title}, \nDescription: ${addMenuItem.data.desc}, \nPrice: ${addMenuItem.data.price}, \nCategory: ${addMenuItem.data.category}, \nSub-category: ${addMenuItem.data.subcategory} `;
          this.res_alert_variant = "success";
          this.res_show_alert = true;
          this.res_on_submit = false;
        } else {
          this.res_alert_message = `${addMenuItem.data}`;
          this.res_alert_variant = "error";
          this.res_show_alert = true;
          this.res_on_submit = false;
        }
      } catch (e) {
        this.res_alert_message = "Something went wrong";
        this.res_alert_variant = "error";
        this.res_show_alert = true;
        this.res_on_submit = false;
        // console.log(e);
      }
    }
  }
};
</script>

<style></style>
