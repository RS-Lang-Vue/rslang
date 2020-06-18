<template>
  <v-form @submit.prevent="handleFormSubmit" class="user-form" ref="form" lazy-validation>
    <h1 class="user-form__heading">{{ title }}</h1>

    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required />

    <v-text-field v-model="password" :rules="passwordRules" label="Password" required />

    <v-btn class="login__submit-button" type="submit" color="primary">Sign Up</v-btn>
  </v-form>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "RS Lang",
    },
  },
  data: () => ({
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    password: "",
    passwordRules: [(v) => !!v || "Password is required"],
  }),
  methods: {
    handleFormSubmit() {
      if (this.validate()) {
        const { email, password } = this;
        this.$emit("submit", { email, password });
      }
    },
    validate() {
      return this.$refs.form.validate();
    },
  },
};
</script>

<style scoped>
.user-form {
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.user-form__heading {
  margin-bottom: 20px;
  font-size: 28px;
}

.user-form__submit-button {
  margin-top: 20px;
}
</style>
