<template>
    <div class="col-4" style="padding: 1%; margin-left: 35%;" id="signinForm">
        <h1 style="text-align: center; margin-top: 10%"> SIGN IN </h1>
        <form>
            <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                <label for="email">Email:</label>
                <input v-model = "email" type="email" class="form-control">
            </div>
            <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                <label for="password">Password:</label>
                <input v-model = "password" type="password" class="form-control">
            </div>
        </form>
        <button v-on:click="login" class="btn btn-dark" style="margin-left:1%; margin-right: 1%; width: 98%; background-color: #343A40;">Sign In</button>
        <p style="margin-top:10px">Don't have an account? <a v-on:click="signupBtn">SIGN UP</a> </p>
        <p style="text-align: center; margin-top: 1%">OR</p>
        <div class="g-signin2" id="gsignin" style="margin-left: 36.8%" data-onsuccess="onSignIn"></div>
    </div>
</template>

<script>
export default {
  data() {
    return {
        email : "",
        password : ""
    };
  },
  methods: {
      login(){
          this.$emit('login', this.email, this.password)
      },
      signupBtn(){
          this.$emit('signupBtn')
      }
  }
};
</script>

<style scoped>
</style>