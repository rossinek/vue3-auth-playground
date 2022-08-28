<template>
  <div>
    <h1>It's another <strong>secret</strong> page</h1>
    <pre v-if="user">{{ user }}</pre>
  </div>
</template>

<script>
import { getUser } from "@/api/auth";

export default {
  data() {
    return {
      user: null,
    };
  },
  methods: {
    async getSecretData() {
      const response = await getUser();
      this.user = response.data;
    },
  },
  mounted() {
    this.getSecretData();
  },
};
</script>

<style lang="scss" scoped>
pre {
  text-align: left;
  margin: 30px auto;
  max-width: 340px;
  border-radius: 8px;
  background-color: #eee;
  padding: 20px;
}
</style>
