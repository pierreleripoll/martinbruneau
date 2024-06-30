<template>
  <p class="presentation section">
    Aperçu d’une série de 64 scans et photographies collectées à Cherbourg et
    ses environs.
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
    <p>Site web réalisé par Pierre Ripoll</p>
  </div>
</template>

<script setup>
import imageData from "@/assets/metadata-photos.json";
const basePath = "https://martinbruneau.s3.sbg.io.cloud.ovh.net";

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
.gallery {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10em;
  margin: 0 auto;
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

.presentation,
.contact,
.footer {
  max-width: 40vw;
}

.email-link {
  color: inherit;
  text-decoration: underline;
}

.email-link:hover {
  text-decoration: none;
}
</style>
