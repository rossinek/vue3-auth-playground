<template>
  <form class="register" @submit.prevent="onSubmit">
    <h1>Register</h1>

    <label>
      Email
      <input v-model="email" type="email" autofocus required />
    </label>

    <label>
      Password
      <input v-model="password" type="password" required minlength="8" />
    </label>

    <button class="button" type="submit">register</button>
  </form>
</template>

<script>
import { defineComponent } from "vue";
import { useAuthStore } from "@/store/auth";

export default defineComponent({
  setup() {
    const auth = useAuthStore();
    return { auth };
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async onSubmit() {
      try {
        await this.auth.register({
          email: this.email,
          password: this.password,
        });
        this.$router.push({ name: "PrivatePageOne" });
      } catch (error) {
        alert(error);
        console.error(error);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.register {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
}
label {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  text-align: left;
  text-transform: uppercase;
  font-size: 0.9em;
  opacity: 0.6;
}
input {
  padding: 10px;
  margin-top: 4px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-family: inherit;
}
</style>
