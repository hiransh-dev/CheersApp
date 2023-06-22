<template>
  <v-dialog v-model="pageStore.dialogAuth" class="bg-grey-lighten-2" fullscreen :scrim="false">
    <v-toolbar>
      <v-toolbar-title></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon dark @click="pageStore.dialogAuth = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container class="text-center">
      <v-card class="pa-2 bg-grey-lighten-2" elevation="8">
        <v-row justify="center">
          <v-col cols="6">
            <v-btn
              block
              rounded="lg"
              @click="tab = 'login'"
              class=""
              :class="{
                'text-black bg-yellow-darken-3': tab === 'login',
                'bg-grey-darken-4': tab === 'register'
              }"
              size="large"
              >Login
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn
              block
              rounded="lg"
              @click="tab = 'register'"
              class=""
              :class="{
                'text-black bg-yellow-darken-3': tab === 'register',
                'bg-grey-darken-4': tab === 'login'
              }"
              size="large"
              >Sign up
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
      <div>
        <v-expand-transition>
          <v-alert v-if="res_show_alert" :type="res_alert_variant" :title="res_alert_variant">
            {{ res_alert_message }}
          </v-alert>
        </v-expand-transition>
      </div>
    </v-container>
    <v-slide-y-reverse-transition mode="out-in" hide-on-leave="true">
      <v-card class="bg-grey-lighten-2" v-if="tab === 'register'">
        <v-card-text>
          <veeForm @submit="register" :validation-schema="schema">
            <v-container>
              <v-row>
                <v-col cols="12" sm="4">
                  <veeField id="regEmail" name="Email" v-slot="{ field, errorMessage }">
                    <v-text-field
                      prepend-inner-icon="mdi-email"
                      variant="outlined"
                      label="Email"
                      type="email"
                      v-bind="field"
                      v-model="regEmail"
                      :error-messages="errorMessage"
                      required
                    ></v-text-field>
                  </veeField>
                </v-col>
                <v-col cols="12" sm="4">
                  <veeField id="regPhone" name="Phone" v-slot="{ field, errorMessage }">
                    <v-text-field
                      prepend-inner-icon="mdi-phone"
                      variant="outlined"
                      :label="phoneLength"
                      v-bind="field"
                      v-model="regPhone"
                      :error-messages="errorMessage"
                      required
                    ></v-text-field>
                  </veeField>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="4">
                  <veeField id="regfName" name="Firstname" v-slot="{ field, errorMessage }">
                    <v-text-field
                      prepend-inner-icon="mdi-badge-account"
                      variant="outlined"
                      label="First Name"
                      v-bind="field"
                      v-model="regfName"
                      :error-messages="errorMessage"
                      required
                    ></v-text-field>
                  </veeField>
                </v-col>
                <v-col cols="12" sm="4">
                  <veeField id="reglName" name="Lastname" v-slot="{ field, errorMessage }">
                    <v-text-field
                      prepend-inner-icon="mdi-badge-account"
                      variant="outlined"
                      label="Last Name"
                      v-bind="field"
                      v-model="reglName"
                      :error-messages="errorMessage"
                      required
                    ></v-text-field>
                  </veeField>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="4">
                  <veeField id="regPassword" name="Password" v-slot="{ field, errorMessage }">
                    <v-text-field
                      prepend-inner-icon="mdi-form-textbox-password"
                      variant="outlined"
                      label="Password"
                      type="password"
                      v-bind="field"
                      v-model="regPassword"
                      :error-messages="errorMessage"
                      required
                    ></v-text-field>
                  </veeField>
                </v-col>
                <v-col cols="12" sm="4">
                  <veeField id="regcPassword" name="Confirm" v-slot="{ field, errorMessage }">
                    <v-text-field
                      prepend-inner-icon="mdi-form-textbox-password"
                      variant="outlined"
                      label="Confirm Password"
                      type="password"
                      v-bind="field"
                      v-model="regcPassword"
                      :error-messages="errorMessage"
                      required
                    ></v-text-field>
                  </veeField>
                </v-col>
              </v-row>
              <v-btn
                type="submit"
                block
                rounded="lg"
                class="text-white bg-grey-darken-4 my-1"
                size="x-large"
                elevation="6"
                :disabled="res_on_submit"
                :loading="res_on_submit"
                >Submit
              </v-btn>
            </v-container>
          </veeForm>
        </v-card-text>
      </v-card>
    </v-slide-y-reverse-transition>
    <v-slide-y-reverse-transition mode="in-out" hide-on-leave="true">
      <v-card class="bg-grey-lighten-2" v-if="tab === 'login'">
        <v-card-text>
          <veeForm @submit="fnLogin" :validation-schema="schema">
            <v-container>
              <v-row>
                <v-col cols="12" sm="4">
                  <veeField id="loginEmail" name="Email" v-slot="{ field, errorMessage }">
                    <v-text-field
                      prepend-inner-icon="mdi-email"
                      variant="outlined"
                      label="Email"
                      type="email"
                      v-bind="field"
                      v-model="loginEmail"
                      :error-messages="errorMessage"
                      required
                    ></v-text-field>
                  </veeField>
                </v-col>
                <v-col cols="12" sm="4">
                  <veeField id="loginPassword" name="Password" v-slot="{ field, errorMessage }">
                    <v-text-field
                      prepend-inner-icon="mdi-form-textbox-password"
                      variant="outlined"
                      label="Password"
                      type="password"
                      v-bind="field"
                      v-model="loginPassword"
                      :error-messages="errorMessage"
                      required
                    ></v-text-field>
                  </veeField>
                </v-col>
              </v-row>
              <v-btn
                type="submit"
                block
                rounded="lg"
                class="text-white bg-grey-darken-4 my-1"
                size="x-large"
                elevation="6"
                :disabled="res_on_submit"
                :loading="res_on_submit"
                >Submit
              </v-btn>
            </v-container>
          </veeForm>
        </v-card-text>
      </v-card>
    </v-slide-y-reverse-transition>
  </v-dialog>
</template>

<script>
import { mapStores } from "pinia";
import usepageStore from "@/stores/page";
import axios from "axios";

export default {
  data() {
    return {
      tab: "login",
      regEmail: "",
      regPhone: "",
      regfName: "",
      reglName: "",
      regPassword: "",
      regcPassword: "",
      loginEmail: "",
      loginPassword: "",
      schema: {
        Email: "required|min:3|max:100|email",
        Phone: "required|min:10|max:10|numeric",
        Firstname: "required|min:3|max:100",
        Lastname: "required|min:3|max:100",
        Password: "required|min:4|max:100",
        Confirm: "required|confirmPassword:@Password"
      },
      res_on_submit: false,
      res_show_alert: false,
      res_alert_variant: "",
      res_alert_message: ""
    };
  },
  methods: {
    async fnRegister() {
      this.res_on_submit = true;
      try {
        const addMenuItem = await axios.post(
          "/api/management/menu",
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
        if (addMenuItem.status === 200) {
          this.res_alert_message = `New Menu Item Added. \nTitle: ${addMenuItem.data.title}, \nDescription: ${addMenuItem.data.desc}, \nPrice: ${addMenuItem.data.price}, \nCategory: ${addMenuItem.data.category}, \nSub-category: ${addMenuItem.data.subcategory} `;
          this.res_alert_variant = "success";
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
    },
    async fnLogin() {
      this.res_on_submit = true;
      try {
        const addMenuItem = await axios.post(
          "/api/management/menu",
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
        if (addMenuItem.status === 200) {
          this.res_alert_message = `New Menu Item Added. \nTitle: ${addMenuItem.data.title}, \nDescription: ${addMenuItem.data.desc}, \nPrice: ${addMenuItem.data.price}, \nCategory: ${addMenuItem.data.category}, \nSub-category: ${addMenuItem.data.subcategory} `;
          this.res_alert_variant = "success";
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
  },
  computed: {
    ...mapStores(usepageStore),
    phoneLength() {
      return "Phone Number: " + this.regPhone.length + "/10";
    }
  }
};
</script>

<style scoped></style>
