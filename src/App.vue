<template>
  <div id="app">
    <nav>
      <div class="row">
        <router-link :to="{ name: 'PublicPageOne' }">public 1</router-link>
        <router-link :to="{ name: 'PublicPageTwo' }">public 2</router-link>
        <template v-if="isLoggedIn">
          <router-link :to="{ name: 'PrivatePageOne' }">private 1</router-link>
          <router-link :to="{ name: 'PrivatePageTwo' }">private 2</router-link>
        </template>
      </div>
      <div class="row">
        <template v-if="isLoggedIn">
          <button class="button" @click="logout">logout</button>
        </template>
        <template v-else>
          <router-link :to="{ name: 'AuthRegister' }">register</router-link>
          <router-link class="button" :to="{ name: 'AuthLogin' }">
            login
          </router-link>
        </template>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useAuthStore } from "@/store/auth";

export default defineComponent({
  setup() {
    const auth = useAuthStore();
    return { auth }
  },
  computed: {
    isLoggedIn() {
      return this.auth.isLoggedIn;
    },
  },
  methods: {
    logout() {
      this.auth.logout();
    },
  },
  created() {
    this.auth.restoreUserData();
  },
});
</script>

<style lang="scss">
nav {
  border-bottom: 1px solid #ccc;
  margin-bottom: 80px;
  .row {
    display: flex;
    justify-content: center;
    margin: 20px;
    gap: 10px;
  }
}
</style>
