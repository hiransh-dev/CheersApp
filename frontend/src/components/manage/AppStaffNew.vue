<template>
  <div class="desktop_container w-100">
    <!-- REGISTER ALERT  -->
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
    <!-- REGISTER STAFF PANEL -->
    <v-card class="bg-grey-lighten-2">
      <v-card-text>
        <veeForm @submit="fnRegisterStaff" :validation-schema="schema">
          <v-row>
            <v-col cols="12">
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
            <v-col cols="12">
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
            <v-col cols="12">
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
            <v-col cols="12">
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
            <v-col cols="12">
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
            <v-col cols="12">
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
  </div>
</template>

<script>
import { mapStores } from "pinia";
import usePageStore from "@/stores/page";
import axios from "axios";

export default {
  data() {
    return {
      regEmail: "",
      regPhone: "",
      regfName: "",
      reglName: "",
      regPassword: "",
      regcPassword: "",
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
    async fnRegisterStaff() {
      this.res_on_submit = true;
      try {
        const newStaffCreated = await axios.post(
          "/api/user/registerstaff",
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
        if (newStaffCreated.status === 200 && newStaffCreated.data.email) {
          this.res_alert_message = `${newStaffCreated.data.message} Email: ${newStaffCreated.data.email}, Name: ${newStaffCreated.data.firstName} ${newStaffCreated.data.lastName}`;
          this.res_alert_variant = "success";
          this.res_show_alert = true;
          this.res_on_submit = false;
        } else {
          this.res_alert_message = `${newStaffCreated.data}.`;
          this.res_alert_variant = "error";
          this.res_show_alert = true;
          this.res_on_submit = false;
        }
      } catch (e) {
        this.res_alert_message = "Something went wrong. Account Creation Failed.";
        this.res_alert_variant = "error";
        this.res_show_alert = true;
        this.res_on_submit = false;
      }
    }
  },
  computed: {
    ...mapStores(usePageStore),
    phoneLength() {
      return "Phone Number: " + this.regPhone.length + "/10";
    }
  }
};
</script>

<style scoped></style>
