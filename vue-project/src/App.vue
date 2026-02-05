<script setup>

</script>

<template>

  <body>
    <nav>
      <router-link to="/rotterdam"> Go to station</router-link>
      <router-link to="/screen"> Go to screen</router-link>
    </nav>

    <main>
      <router-view />
    </main>
  </body>
</template>

<style>
body {
  background-color: #222222;
  margin: 0;
  padding: 0;
}

h2 {
  margin-bottom: 1rem;
  color: #1e3a8a;
  font-size: 1.5rem;
  padding-bottom: 0.3rem;
}
</style>
