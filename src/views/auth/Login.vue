<template>
  <div class="login">
    <lang-user-form class="login__form" @submit="handleFormSubmit" />
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
