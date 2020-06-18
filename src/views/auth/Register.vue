<template>
  <div class="register">
    <lang-user-form
      class="register__form"
      @submit="handleFormSubmit"
      title="Create account"
      submitButtonText="Sign Up"
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
  methods: {
    handleFormSubmit({ email, password }) {
      this.createUser({ email, password })
        .then(() => this.$router.push("/auth/login"))
        .catch((err) => console.log(err));
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
