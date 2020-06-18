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

export default {
  components: {
    "lang-user-form": LangUserForm,
  },
  methods: {
    handleFormSubmit({ email, password }) {
      console.log("Submitted", email, password);
    },
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
