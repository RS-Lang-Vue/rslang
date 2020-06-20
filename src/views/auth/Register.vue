<template>
  <div class="register">
    <lang-user-form
      class="register__form"
      @submit="handleFormSubmit"
      title="Create account"
      submitButtonText="Sign Up"
      :loading="isFormLoading"
    >
      <p>Already have an account? <router-link to="/auth/login">Log In</router-link></p>
    </lang-user-form>
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
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register__form {
  width: 30%;
}
</style>
