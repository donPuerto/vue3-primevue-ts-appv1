<script setup lang="ts">
import { supabase } from "./composables/useSupabase";
const session = ref();

onMounted(async () => {
  console.log("App.vue");

  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session;
  });

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session;
  });
});
useHead({
  title: "Vite PrimeVue Starter",
  meta: [
    {
      name: "description",
      content: "PrimeVue Starter starter for vue and vite",
    },
  ],
});
</script>

<template>
  <router-view />
</template>

<style lang="scss">
@import "App.scss";
</style>
