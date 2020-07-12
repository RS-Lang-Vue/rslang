<template>
  <v-card max-width="500" min-width="290" class="register">
    <lang-user-form
      class="register__form"
      @submit="handleFormSubmit"
      title="Создайте аккаунт"
      submitButtonText="Создать"
      :loading="isFormLoading"
    >
      <p class="text-body-2 text-sm-body-1" style="text-align: left;">
        Уже зарегистрированы? <router-link to="/auth/login">Войти</router-link>
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
    handleFormSubmit({ email, password }) {
      this.isFormLoading = true;
      this.createUser({ email, password })
        .then(() => {
          this.showAlert("success", "Success", "Successfully created user");
          this.$router.push("/auth/login");
        })
        .catch(() => this.showAlert("error", "Error", "Something went wrong"))
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
    ...mapActions(["createUser"]),
  },
};
</script>

<style scoped>
.register {
  margin: 0 auto;
}
</style>
