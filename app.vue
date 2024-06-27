<template>
  <div>
    <NuxtRouteAnnouncer />
    <div class="container">
      <div class="header section">
        <h1>MARTIN BRUNEAU</h1>
        <h2>LA MÉLANCOLIE DU HANGAR</h2>
      </div>

      <NuxtPage />
    </div>
  </div>
</template>

<style scoped>
.container {
  font-family: "Helvetica Neue", Arial, sans-serif;
  margin-top: -8px;
  padding: 1em 2em;
  text-align: start;
  max-width: 1500px;
  margin: auto;
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
