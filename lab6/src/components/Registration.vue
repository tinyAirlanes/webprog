<template>
  <div class="registration">
    <div class="block">
      <span class="reg_title">Register your account</span>
      <form class="registration_form" @submit.prevent="RegistrUser">
        <div class="form_group">
          <input
            type="text"
            class="form_control"
            v-model="login"
            placeholder="Login"
            required
          />
        </div>
        <br />
        <div class="form_group">
          <input
            type="password"
            class="form_control"
            v-model="password"
            placeholder="Password"
            required
          />
        </div>
        <br />
        <div class="form_group">
          <input
            type="password"
            class="form_control"
            v-model="confirm_password"
            placeholder="Confirm password"
            requireds
          />
        </div>
        <div v-if="!IsPasswordSame" class="error">Passwords are different</div>
        <div v-if="IsUserExists" class="error">Choose another login</div>
        <div class="form_btn">
          <button class="registration_btn btn">Sign Up</button>
        </div>
      </form>
      <br />
      <div class="link_login">
        <span>
          Already with us?
          <router-link to="/login">Sign in</router-link>
        </span>
      </div>
    </div>
  </div>
</template> 

<script>
import { CHECK_USERNAME, LOGIN, REGISTER } from "@/graphql/graphql";
import { onLogin } from "./../vue-apollo";
export default {
  name: "Registration",
  data() {
    return {
      login: "",
      password: "",
      confirm_password: "",
      IsUserExists: false,
      IsPasswordSame: true,
    };
  },
  methods: {
    async RegistrUser() {
      try {
        const answer = await this.$apollo.query({
          query: CHECK_USERNAME,
          variables: {
            username: this.login,
          },
        });
        if (answer.data.exists) {
          console.log("change name");
          this.IsUserExists = true;
          this.IsPasswordSame = true;
        } else if (this.password !== this.confirm_password) {
          console.log("passwords are different");
          this.IsPasswordSame = false;
          this.IsUserExists = false;
        } else {
          this.IsUserExists = false;
          this.IsPasswordSame = true;
          await this.$apollo.query({
            query: REGISTER,
            variables: {
              username: this.login,
              password: this.password,
            },
          });
          const token = await this.$apollo.query({
            query: LOGIN,
            variables: {
              username: this.login,
              password: this.password,
            },
          });
          onLogin(this.$apollo.provider.defaultClient, token.data.token);
          this.$router.push("/rooms");
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>


<style scoped>
.error {
  margin-top: 5px;
  font-size: 20px;
  color: rgb(190, 37, 37);
  text-align: center;
}
.registration .block {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: white;
  padding: 20px;
  padding-top: 30px;
  width: 300px;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  text-align: center;
  border-radius: 0.28571429rem;
  border: 1px solid rgba(34, 36, 38, 0.15);
}
.registration .block .registration_form {
  margin-top: 20px;
}
.reg_title {
  font-size: xx-large;
}
.form_btn {
  display: flex;
  justify-content: center;
}
.form_control {
  width: 90%;
  padding: 6px;
  border-color: rgb(216, 216, 216);
  border-radius: 0.1rem;
}
.form_control:hover {
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
}
.form_control:active,
.form_control:focus {
  box-shadow: 0 0 15px 4px rgb(218, 215, 221);
}
.btn {
  outline: none;
  padding: 0.3em 1.2em;
  border: 0.16em solid rgba(255, 255, 255, 0);
  margin-top: 15px;
  text-decoration: none;
  font-weight: 300;
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
  text-align: center;
  font-size: large;
  width: 95%;
  color: white;
  background: rgb(43, 43, 43);
  opacity: 0.9;
}

.btn:hover {
  opacity: 1;
}
</style>