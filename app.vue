<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Martin Bruneau",
  ogTitle: "Martin Bruneau",
  description:
    "Aperçu d’une série de 64 scans et photographies collectées à Cherbourg et ses environs.",
  ogDescription:
    "Aperçu d’une série de 64 scans et photographies collectées à Cherbourg et ses environs.",
});
</script>

<style>
html {
  scrollbar-gutter: stable;
}
</style>
