<template>
  <div class="notes-section">
    <div class="columns">
      <div class="column has-text-centered">
        <strong>Notes</strong>
      </div>
      <div class="column has-text-centered">
        <strong>Timestamp</strong>
      </div>
    </div>
    <input />
    <div>
      <button @click.prevent="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    return {
      logout: () => {
        store.commit("auth/logout");
        router.push("/login");
      },
    };
  },
};
</script>

<style></style>
