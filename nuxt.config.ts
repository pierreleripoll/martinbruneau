// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  render: {
    http2: {
      push: true,
    },
  },
  image: {
    quality: 90,
    format: ["webp", "avif"],
    domains: ["https://martinbruneau.s3.sbg.io.cloud.ovh.net/"],
  },
  devtools: { enabled: true },
  modules: ["@nuxt/image"],
});
