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
  title: "Martin Bruneau - La mélancolie du hangar",
  ogTitle: "Martin Bruneau - La mélancolie du hangar",
  description:
    "Aperçu d'une série photographique explorant les lieux et espaces de l'enfance. Une tentative de cartographie de l'origine et des fondations.",
  ogDescription:
    "Aperçu d'une série photographique explorant les lieux et espaces de l'enfance. Une tentative de cartographie de l'origine et des fondations.",
});
</script>

<style>
html {
  scrollbar-gutter: stable;
}
</style>
