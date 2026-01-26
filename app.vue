<template>
  <NuxtPage />
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

@font-face {
  font-family: "HK Grotesk";
  src: url("/fonts/HKGrotesk-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Glacial Indifference";
  src: url("/fonts/GlacialIndifference-Regular.otf") format("opentype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
</style>
