<template>
  <v-dialog v-model="pageStore.dialogAuth" class="bg-grey-lighten-2" fullscreen :scrim="false">
    <v-toolbar class="bg-grey-lighten-2">
      <v-toolbar-title></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon dark @click="pageStore.dialogAuth = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container class="bg-grey-lighten-2">
      <v-card class="pa-2 bg-grey-lighten-2 text-center" elevation="8">
        <v-row justify="center" v-if="!authStore.email && authStore.email === ''">
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
        <v-row justify="center" v-if="authStore.email && authStore.email !== ''">
          <v-col cols="12">
            <v-btn
              block
              rounded="lg"
              @click="fnLogout()"
              class="text-black bg-yellow-darken-3"
              size="large"
              >Logout
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
      <div class="mt-5">
        <v-slide-y-transition>
          <v-alert
            class="site_font"
            v-if="res_show_alert"
            :type="res_alert_variant"
            :title="res_alert_variant"
            closable
          >
            {{ res_alert_message }}
          </v-alert>
        </v-slide-y-transition>
      </div>
    </v-container>
    <!-- REGISTER PANEL -->
    <v-container class="bg-grey-lighten-2">
      <v-slide-y-reverse-transition mode="out-in" hide-on-leave="true">
        <v-card class="bg-grey-lighten-2" v-if="tab === 'register' && !authStore.email">
          <v-card-text>
            <veeForm @submit="fnRegister" :validation-schema="schema">
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
            </veeForm>
          </v-card-text>
        </v-card>
      </v-slide-y-reverse-transition>
    </v-container>
    <!-- LOGIN PANEL -->
    <v-container class="bg-grey-lighten-2">
      <v-slide-y-reverse-transition mode="in-out" hide-on-leave="true">
        <v-card class="bg-grey-lighten-2" v-if="tab === 'login' && !authStore.email">
          <v-card-text>
            <veeForm @submit="fnLogin">
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
            </veeForm>
          </v-card-text>
        </v-card>
      </v-slide-y-reverse-transition>
    </v-container>
    <!-- USER LOGGED IN - PANEL -->
    <v-container class="bg-grey-lighten-2">
      <v-slide-y-reverse-transition mode="in-out" hide-on-leave="true">
        <v-card class="bg-grey-lighten-2" v-if="authStore.email && authStore.email !== ''">
          <v-card-text>
            <v-list class="bg-grey-lighten-2">
              <v-list-item>
                <label class="text-h3">Hello, {{ authStore.fullName }}</label>
              </v-list-item>
              <v-list-item>
                <label class="text-h5">Email: {{ authStore.email }}</label>
              </v-list-item>
              <v-list-item>
                <label class="text-h5">Phone: {{ authStore.phone }}</label>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-slide-y-reverse-transition>
    </v-container>
  </v-dialog>
</template>

<script>
import { mapStores } from "pinia";
import usepageStore from "@/stores/page";
import useauthStore from "@/stores/auth";
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
        const newUserCreated = await axios.post(
          "/api/user/register",
          {
            registerUser: {
              email: this.regEmail,
              password: this.regPassword,
              firstName: this.regfName,
              lastName: this.reglName,
              phoneNumber: this.regPhone
            }
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        );
        if (newUserCreated.status === 200) {
          this.res_alert_message = `Your account has been created. Email: ${newUserCreated.data.email}, Name: ${newUserCreated.data.firstName} ${newUserCreated.data.lastName}`;
          this.res_alert_variant = "success";
          this.res_show_alert = true;
          this.res_on_submit = false;
        }
      } catch (e) {
        this.res_alert_message = "Something went wrong. Account Creation Failed.";
        this.res_alert_variant = "error";
        this.res_show_alert = true;
        this.res_on_submit = false;
      }
    },
    async fnLogin() {
      this.res_on_submit = true;
      try {
        const userLoggedIn = await axios.post(
          "/api/user/login",
          {
            username: this.loginEmail,
            password: this.loginPassword
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        );
        if (userLoggedIn.status === 200) {
          this.authStore.email = userLoggedIn.data.email;
          this.authStore.firstName = userLoggedIn.data.firstName;
          this.authStore.lastName = userLoggedIn.data.lastName;
          this.authStore.fullName = userLoggedIn.data.fullName;
          this.authStore.phone = userLoggedIn.data.phoneNumber;
          this.res_alert_message = `Welcome Back ${userLoggedIn.data.fullName}.`;
          this.res_alert_variant = "success";
          this.res_show_alert = true;
          // this.res_on_submit = false;
          this.tab = "loggedin";
        }
      } catch (e) {
        this.res_alert_message = "Something went wrong. Please try again.";
        this.res_alert_variant = "error";
        this.res_show_alert = true;
        this.res_on_submit = false;
        console.log(e);
      }
    },
    async fnLogout() {
      try {
        const logoutStatus = await axios.get("/api/user/logout");
        if (logoutStatus.status === 200) {
          this.authStore.clearAuth();
          this.res_on_submit = false;
          this.tab = "login";
        }
      } catch (e) {
        console.log(e);
      }
    },
    setTab() {
      if (this.authStore.email && this.authStore.email !== "") {
        this.tab = "loggedin";
      } else {
        this.tab = "login";
        this.res_show_alert = false;
        this.res_on_submit = false;
      }
    }
  },
  computed: {
    ...mapStores(usepageStore),
    ...mapStores(useauthStore),
    phoneLength() {
      return "Phone Number: " + this.regPhone.length + "/10";
    }
  },
  mounted() {
    this.setTab();
  },
  updated() {
    this.setTab();
  }
};
</script>

<style scoped></style>
