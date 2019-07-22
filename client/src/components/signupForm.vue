<template>
    <div class="col-4" style="padding: 1%; margin-left: 35%;" id="signupForm">
        <h1 style="text-align: center; margin-top: 10%"> SIGN UP </h1>
        <form>
          <div class="form-group" style="margin-left:1%; margin-right: 1%;">
              <label for="username">Username:</label>
              <input v-model='username' type="text" class="form-control">
          </div>
          <div class="form-group" style="margin-left:1%; margin-right: 1%;">
              <label for="email">Email:</label>
              <input v-model='email' type="email" class="form-control">
          </div>
          <div class="form-group" style="margin-left:1%; margin-right: 1%;">
              <label for="password">Password:</label>
              <input v-model='password' type="password" class="form-control">
          </div>
        </form>
        <button v-on:click="submitSignup" class="btn btn-dark" style="margin-left:1%; margin-right: 1%; width: 98%; background-color: #343A40;">Sign Up</button>

        <p style="margin-top:10px">Already have an account? <a v-on:click="signinBtn" >SIGN IN</a> </p>
        <p style="text-align: center; margin-top: 1%">OR</p>
        <div class="g-signin2" id="gsignin" style="margin-left: 36.8%" data-onsuccess="onSignIn"></div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: ""
    };
  },
  methods:{
    submitSignup(){
      this.$emit('submitSignup', this.username, this.email, this.password)
    },
    signinBtn(){
      this.$emit('signinBtn')
    }
  }
};
</script>

<style scoped>
</style>