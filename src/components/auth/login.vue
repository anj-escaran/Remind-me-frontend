<template>
  <div class="login d-flex justify-center mb-6">
    <v-card class="login-card" elevation="0" color="transparent" width="400">
      <v-card-title class="d-flex justify-center mb-6">
        <v-img class="auth-logo" src="@/assets/images/clock.png"> </v-img>
        <span class="sign">RemindMe</span>
      </v-card-title>
      <v-card-text>
        <v-card elevation="5" width="450">
          <v-card-title class="login-title d-flex justify-center mb-6">
            <p class="login">Login</p>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-text-field
                v-model="data.username"
                label="Username"
                outlined
                :rules="usernameRules"
                @keyup.enter.native="handleLogin"
                dense
              ></v-text-field>
              <v-text-field
                outlined
                label="Password"
                v-model="data.password"
                :append-icon="pass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="pass ? 'text' : 'password'"
                @click:append="pass = !pass"
                @keyup.enter.native="handleLogin"
                :rules="passwordRules"
                dense
              ></v-text-field>
              <br />
              <div>
                <v-btn
                  class="btn-login"
                  block
                  rounded
                  elevation="2"
                  x-large
                  @click="handleLogin"
                  :loading="loading"
                >
                  Login
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { setAuthSession } from "@/helpers/auth.helper";
import { loginAPI } from "../services/api.service";
export default {
  name: "login",
  data() {
    return {
      pass: false,
      loading: false,
      data: {
        username: null,
        password: null,
      },
      usernameRules: [(v) => !!v || "Username is required"],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 8) || "Password must be atleast 8 characters",
      ],
    };
  },
  components: {},
  methods: {
    async handleLogin() {
      const vm = this;
      if (this.$refs.form.validate()) {
        vm.loading = true;
        try {
          const data = await loginAPI(this.data);
          console.log(data);
          if (data.status == 200) {
            setAuthSession(data.data);
            vm.$router.replace({ name: "dashboard" });
          }
        } catch (error) {
          console.log(error.response);
        } finally {
          this.loading = false;
        }
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
.login {
  .auth-logo {
    max-width: 50px;
  }
  .v-card__title.login-title.d-flex.justify-center.mb-6 {
    margin-bottom: 0 !important;
  }
  .login-card.v-card.v-sheet.theme--light.elevation-5 {
    border-radius: 10px;
    padding: 10px 10px 10px 10px;
  }

  .col-logo {
    padding: 1px !important;
  }
  .v-input.theme--light.v-input--selection-controls.v-input--checkbox {
    margin-top: -2px !important;
  }
  .sign {
    color: #000000;
    font-size: 40px;
    font-weight: 700;
    color: #396267;
    padding-left: 10px;
  }
  .login {
    color: #000000;
    font-size: 24px;
    font-weight: 700;
  }
  .btn-login {
    text-transform: none !important;
    border: 1px solid #507b80;
    transition: 0.3s;
    span.v-btn__content {
      color: #507b80;
      font-weight: 700;
      font-size: 18px;
    }
  }
  .btn-login:hover {
    background-color: #507b80 !important;
    transition: 0.3s;
    span.v-btn__content {
      color: #ffffff;
      font-weight: 700;
      font-size: 18px;
    }
  }
}
</style>
