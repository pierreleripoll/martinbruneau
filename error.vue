<template>
  <NuxtLayout>
    <div class="error-page">
      <h1>{{ error?.statusCode ?? "404" }}</h1>
      <p>
        {{ error?.message ?? "La page que vous recherchez n'existe pas" }}
      </p>
      <NuxtLink to="/">Acceuil</NuxtLink>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});
console.error(props.error);

const handleError = () => clearError({ redirect: "/" });
</script>

<style scoped>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
