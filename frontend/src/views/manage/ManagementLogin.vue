<template>
  <div class="desktop_container w-100">
    <!-- LOGIN PANEL -->
    <div class="my-5">
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
    <v-card class="bg-grey-lighten-2" rounded="lg" elevation="4">
      <v-card-title>Management Login</v-card-title>
      <v-card-text>
        <veeForm @submit="fnManagementLogin">
          <v-row>
            <v-col cols="12">
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
            <v-col cols="12">
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loginEmail: "",
      loginPassword: "",
      res_on_submit: false,
      res_show_alert: false,
      res_alert_variant: "",
      res_alert_message: ""
    };
  },
  methods: {
    async fnManagementLogin() {
      this.res_on_submit = true;
      try {
        const managementUserLoggedIn = await axios.post(
          "/api/user/managementlogin",
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
        if (managementUserLoggedIn.status === 200 && managementUserLoggedIn.data.username) {
          if (managementUserLoggedIn.data.isAdmin === true) {
            this.res_show_alert = true;
            this.res_on_submit = false;
            this.$router.push("/manage");
          } else if (managementUserLoggedIn.data.isStaff === true) {
            this.res_show_alert = true;
            this.res_on_submit = false;
            this.$router.push("/manage");
          } else {
            this.res_alert_message = "Something went wrong. Account login Failed.";
            this.res_alert_variant = "error";
            this.res_show_alert = true;
            this.res_on_submit = false;
          }
        } else {
          this.res_alert_message = managementUserLoggedIn.data;
          this.res_alert_variant = "error";
          this.res_show_alert = true;
          this.res_on_submit = false;
        }
      } catch (e) {
        this.res_alert_message = "Something went wrong. Account Login Failed.";
        this.res_alert_variant = "error";
        this.res_show_alert = true;
        this.res_on_submit = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
