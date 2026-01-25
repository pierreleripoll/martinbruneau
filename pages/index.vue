<template>
  <div class="container">
    <div class="header section">
      <h1>MARTIN BRUNEAU</h1>
      <h1 class="glacial-font">La mélancolie du hangar</h1>
    </div>

    <p class="presentation section">
      Aperçu d'une série photographique explorant les lieux et espaces de
      l'enfance. Une tentative de cartographie de l'origine et des fondations.
    </p>

    <div id="gallery" class="gallery section">
      <a
        v-for="image in imageData"
        :key="image.id"
        :href="getImagePathWebp(image.id)"
        :data-pswp-width="image.width"
        :data-pswp-height="image.height"
        target="_blank"
        class="image"
      >
        <picture>
          <source
            :srcset="createSrcSet(image.id, 'webp')"
            sizes="(max-width: 700px) 400px, (max-width: 1200px) 600px, (max-width: 1920px) 1080px, 1920px"
            type="image/webp"
          />
          <source
            :srcset="createSrcSet(image.id, 'jpeg')"
            sizes="(max-width: 700px) 400px, (max-width: 1200px) 600px, (max-width: 1920px) 1080px, 1920px"
            type="image/jpeg"
          />
          <img
            :loading="Number(image.id) > 2 ? 'lazy' : 'eager'"
            decoding="async"
            class="responsive-img"
            :src="getImagePathOriginal(image.id)"
            :alt="`Image ${image.id}`"
          />
        </picture>
      </a>
    </div>

    <div class="contact section">
      <a href="mailto:martin.bruneau50@gmail.com" class="email-link"
        >martin.bruneau50@gmail.com</a
      ><br />
      Lausanne - Paris<br />
      +41 77 416 32 58<br />
      +33 6 61 03 54 20
    </div>

    <div class="footer section">
      <p>
        Site web réalisé par
        <a class="email-link" href="mailto:pierreripoll13@gmail.com"
          >Pierre Ripoll</a
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import imageData from "@/assets/metadata-photos.json";

// Use production S3 by default, localhost only in dev mode
const basePath = process.dev
  ? "http://localhost:3000/photos"
  : "https://martinbruneau.s3.sbg.io.cloud.ovh.net";

import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

onMounted(() => {
  const lightbox = new PhotoSwipeLightbox({
    gallery: "#gallery a",
    pswpModule: () => import("photoswipe"),
  });
  lightbox.init();
});

const getImagePathOriginal = (id) => `${basePath}/original/${id}.jpg}`;
const getImagePathWebp = (id) => `${basePath}/optimized/${id}-original.webp`;

const createSrcSet = (id, type) => {
  return [400, 600, 1080, 1920]
    .map((size) => `${basePath}/optimized/${id}-${size}px.${type} ${size}w`)
    .join(", ");
};
</script>

<style scoped>
.container {
  font-family: "HK Grotesk", "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  margin-top: -8px;
  padding: 1em 2em;
  text-align: start;
  max-width: 1300px;
  color: rgb(50, 50, 50);
  margin: auto;
}

.glacial-font {
  font-family: "Glacial Indifference", "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
}

.header {
  justify-content: space-between;
  text-align: start;
  margin: 0 auto;
  margin-bottom: 10vh;
  gap: 2em;
}

.header h1 {
  font-size: 36px;
  font-weight: 400;
  text-align: start;
  margin-bottom: 1em;
  flex-shrink: 1;
}

.section {
  margin-bottom: 10vh;
}

.gallery {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10em;
  margin: inherit auto;
}

.image {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.responsive-img {
  max-height: 85vh;
  max-width: 100%;
  height: auto;
  width: auto;
}

.email-link {
  color: inherit;
  text-decoration: underline;
}

.email-link:hover {
  text-decoration: none;
}

@media screen and (min-width: 500px) {
  .header {
    text-align: center;
    position: sticky;
    top: 8px;
    display: flex;
    flex-direction: row;
  }

  .header h1 {
    margin-bottom: 0px;
  }

  .container {
    padding: 0 30px;
  }
}

@media screen and (min-width: 800px) {
  .presentation,
  .contact,
  .footer {
    max-width: 40vw;
  }
}
</style>
