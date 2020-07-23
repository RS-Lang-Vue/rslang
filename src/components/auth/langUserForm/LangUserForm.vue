<template>
  <v-form @submit.prevent="handleFormSubmit" class="user-form" ref="form" lazy-validation>
    <h1 class="user-form__heading">{{ title }}</h1>

    <v-text-field type="email" v-model="email" :rules="emailRules" label="E-mail" required />

    <v-text-field
      type="password"
      v-model="password"
      :rules="passwordRules"
      label="Пароль"
      required
    />
    <v-card-actions>
      <v-btn class="user-form__submit-button" type="submit" color="primary" :loading="loading">{{
        submitButtonText
      }}</v-btn>
    </v-card-actions>
    <v-spacer></v-spacer>
    <footer class="user-form__footer">
      <slot />
    </footer>
  </v-form>
</template>

<script>
import passwordComplexity from "@/helpers/passwordComplexity";

export default {
  props: {
    title: {
      type: String,
      default: "RS Lang",
    },
    submitButtonText: {
      type: String,
      default: "Submit",
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    email: "",
    emailRules: [
      (v) => !!v || "Необходимо ввести Ваш e-mail",
      (v) => /.+@.+\..+/.test(v) || "Введите корректный e-mail",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "Необходимо ввести пароль",
      (v) => v.length > 7 || "Длина пароля должна быть не менее 8 символов",
      (v) =>
        passwordComplexity(v) ||
        "Пароль должен содержать: прописные и строчные буквы латинского алфавита(A-z), цифры(0-9), минимум один из символов #+-_ @$!%*?&.,;:[]{}",
    ],
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

<style>
.user-form .v-messages__message {
  min-height: 2em !important;
}
</style>

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

.user-form__footer {
  margin-top: 20px;
}
</style>
