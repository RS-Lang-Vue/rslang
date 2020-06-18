<template>
  <div class="login">
    <lang-user-form
      class="login__form"
      @submit="handleFormSubmit"
      title="Log In"
      submitButtonText="Log In"
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
    handleFormSubmit(user) {
      this.loginUser(user)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
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
