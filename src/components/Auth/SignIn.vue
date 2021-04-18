<template>
  <form class="login-box" @submit.prevent="onSubmit">
    <h1>{{ title }}</h1>

    <div :class="['textbox', { invalid: eError }]">
      <div class="placeholder">
        {{ emailTitle }}
      </div>
      <input type="email" id="email" v-model="email" @blur="eBlur" />
    </div>
    <small v-if="eError">{{ eError }}</small>

    <div :class="['textbox', { invalid: pError }]">
      <div class="placeholder">
        {{ passwordTitle }}
      </div>
      <input type="password" id="password" v-model="password" @blur="pBlur" />
    </div>
    <small v-if="pError">{{ pError }}</small>

    <button
      type="submit"
      class="btn"
      :disabled="isSubmitting || isTooManyAttempts"
    >
      Sign in
    </button>

    <div v-if="isTooManyAttempts">Too many attempts. Try again later.</div>

    <router-link class="forgot" to="/signup">{{ forgotPassword }}</router-link>
  </form>
</template>

<script>
import {useLoginForm} from '../../use/login-form'


export default {
  name: "SignIn",
  data() {
    return {
      title: "SIGN IN",
      emailTitle: "Email",
      passwordTitle: "Password",
      forgotPassword: "Forgot Password?",
    };
  },
  setup() {
    return {...useLoginForm()}
  }
}
</script>

<style></style>
