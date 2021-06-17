<template>
  <div class="login">
    <div class="block">
      <span class="log_title">Login to your account</span>
      <form class="login_form" @submit.prevent="LoginUser">
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
        <div class="error" v-if="error">No user with such data</div>
        <div class="form_btn">
          <button class="login_btn btn">Login</button>
        </div>
      </form>
      <br />
      <div class="link_registration">
        <span>
          New to us?
          <router-link to="/registration">Sign up</router-link>
        </span>
      </div>
    </div>
  </div>
</template> 

<script>
import { LOGIN, CHECK_USERNAME } from "@/graphql/graphql.js";
import { onLogin } from "./../vue-apollo";

export default {
  name: "Login",
  data() {
    return {
      login: "",
      password: "",
      exists: false,
      token: "",
      error: false,
    };
  },
  methods: {
    async LoginUser() {
      try {
        this.error = false;
        const answer = await this.$apollo.query({
          query: CHECK_USERNAME,
          variables: {
            username: this.login,
          },
        });
        if (answer.data.exists) {
          const token = await this.$apollo.query({
            query: LOGIN,
            variables: {
              username: this.login,
              password: this.password,
            },
          });
          await onLogin(this.$apollo.provider.defaultClient, token.data.token);
          this.error = false;
          this.$router.push("/rooms");
        } else {
          this.error = true;
        }
      } catch (err) {
        this.error = true;
      }
    },
  },
};
</script>

<style>
.error {
  margin-top: 5px;
  font-size: 20px;
  color: rgb(190, 37, 37);
  text-align: center;
}
.link_login,
.link_registration {
  display: flex;
  justify-content: center;
  border-top: solid rgb(233, 233, 233);
  padding: 5px;
}

.link_login span a,
.link_registration span a {
  text-decoration: none;
}
</style>


<style scoped>
.login .block {
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
.login .block .login_form {
  margin-top: 20px;
}
.log_title {
  font-size: xx-large;
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
.form_btn {
  display: flex;
  justify-content: center;
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