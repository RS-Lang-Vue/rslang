<template>
  <v-card max-width="500" min-width="290" class="login">
    <lang-user-form
      class="login__form"
      @submit="handleFormSubmit"
      title="Вход"
      submitButtonText="Войти"
      :loading="isFormLoading"
    >
      <p class="text-body-2 text-sm-body-1" style="text-align: left;">
        Нет аккаунта? <router-link to="/auth/register">Создать</router-link>
      </p>
    </lang-user-form>
  </v-card>
</template>

<script>
import LangUserForm from "@/components/auth/langUserForm/LangUserForm.vue";
import { mapActions } from "vuex";

export default {
  components: {
    "lang-user-form": LangUserForm,
  },
  data() {
    return {
      isFormLoading: false,
    };
  },
  methods: {
    handleFormSubmit(user) {
      this.isFormLoading = true;
      this.loginUser(user)
        .then(() => {
          this.showAlert("success", "Success", "Successfully logged in");
          this.$router.push("/home");
        })
        .catch((err) => {
          const statusCode = err.response.status;
          if (statusCode === 404 || statusCode === 403) {
            this.showAlert("error", "Error", "Credentials are incorrect");
          } else {
            this.showAlert("error", "Error", "Something went wrong");
          }
        })
        .finally(() => {
          this.isFormLoading = false;
        });
    },
    showAlert(type, title, text) {
      this.$notify({
        group: "main",
        type,
        title,
        text,
      });
    },
    ...mapActions(["loginUser"]),
  },
};
</script>

<style scoped>
.login {
  margin: 0 auto;
}
</style>
