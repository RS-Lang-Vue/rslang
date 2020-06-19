<template>
  <div class="login">
    <lang-user-form
      class="login__form"
      @submit="handleFormSubmit"
      title="Log In"
      submitButtonText="Log In"
      :loading="isFormLoading"
    />
  </div>
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
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login__form {
  width: 30%;
}
</style>
