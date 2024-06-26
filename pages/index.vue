<template>
  <p class="presentation section">
    Aperçu d’une série de 64 scans et photographies collectées à Cherbourg et
    ses environs.
  </p>
  <div class="gallery section">
    <div v-for="image in imageData" :key="image.id" class="image">
      <picture>
        <!-- For WebP images -->
        <source
          :srcset="`${basePath}/${image.id}-600px.webp 600w, ${basePath}/${image.id}-1080px.webp 1080w, ${basePath}/${image.id}-1920px.webp 1920w, ${basePath}/${image.id}-original.webp 2560w`"
          sizes="(max-width: 1200px) 600px, (max-width: 1919px) 1080px, (max-width: 2500px) 1920px, 100vw"
          type="image/webp"
        />
        <!-- For JPEG images -->
        <source
          :srcset="`${basePath}/${image.id}-600px.jpeg 600w, ${basePath}/${image.id}-1080px.jpeg 1080w, ${basePath}/${image.id}-1920px.jpeg 1920w, ${basePath}/${image.id}-original.jpeg 2560w`"
          sizes="(max-width: 1200px) 600px, (max-width: 1919px) 1080px, (max-width: 2500px) 1920px, 100vw"
          type="image/jpeg"
        />
        <!-- Fallback IMG element for browsers that do not support <picture> -->
        <img
          :loading="Number(image.id) > 2 ? 'lazy' : 'eager'"
          decoding="async"
          class="responsive-img"
          :width="image.width"
          :height="image.height"
          :src="`${basePath}/${image.id}-original.jpeg`"
          :alt="`Image ${image.id}`"
        />
      </picture>
    </div>
  </div>
  <div class="contact section">
    <p>
      <a href="mailto:martin.bruneau50@gmail.com" class="email-link"
        >martin.bruneau50@gmail.com</a
      ><br />
      Lausanne - Paris <br />
      +41 77 416 32 58 <br />
      +33 6 61 03 54 20
    </p>
  </div>

  <div class="footer section">
    <p>Site web réalisé par Pierre Ripoll</p>
  </div>
</template>

<script setup>
import imageData from "@/assets/metadata-photos.json";

const basePath = "https://martinbruneau.s3.sbg.io.cloud.ovh.net/optimized";
</script>

<style scoped>
.container {
  font-family: "Helvetica Neue", Arial, sans-serif;
  margin-top: -8px;
  padding: 1em 2em;
  text-align: start;
}

.header {
  justify-content: space-between;
  max-width: 1500px;
  text-align: start;
  margin: 0 auto;
  margin-bottom: 10vh;
}

.header h1 {
  font-size: 36px;
  font-weight: bold;
  text-align: start;
  flex-shrink: 1;
}

.header h2 {
  font-size: 24px;
  font-weight: normal;
  margin: auto 0;
  flex-shrink: 2;
}

.presentation {
  font-size: 18px;
}

.gallery {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10em;
  margin: 0 auto;
}

.image {
  width: 100%; /* Full width to ensure picture element takes up the container width */
  display: flex;
  justify-content: center; /* Center images horizontally */
  margin-bottom: 20px; /* Spacing between images */
}

.responsive-img {
  max-height: 85vh;
  max-width: 100%; /* Ensure the image does not exceed its container's width */
  height: auto; /* Maintain aspect ratio */
  width: auto; /* Maintain aspect ratio */
}

@media screen and (min-width: 500px) {
  .header {
    text-align: center;
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: row;
  }

  .container {
    padding: 0 30px;
  }
  .gallery {
    padding: 0 20vw;
  }

  .presentation {
    max-width: 40vw;
  }
}

.section {
  margin-bottom: 10vh;
}

.email-link {
  color: inherit; /* Keeps the color consistent with the surrounding text */
  text-decoration: underline; /* Underlines the link */
}

.email-link:hover {
  text-decoration: none; /* Optional: removes underline on hover for a different effect */
}
</style>
