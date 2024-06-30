<template>
  <NuxtLayout>
    <div class="error-page">
      <h1>404</h1>
      <p>La page que vous recherchez n'existe pas</p>
      <NuxtLink to="/">Acceuil</NuxtLink>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
