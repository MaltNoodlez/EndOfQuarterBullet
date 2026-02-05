<script setup>
import { ref } from "vue";

</script>

<template>

  <body>
    <nav>
      <router-link to="/start"> Go to start</router-link>
      <router-link to="/station"> Go to station</router-link>
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

.radio-player {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.95);
  padding: 12px 20px;
  border-radius: 16px;

  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);

  z-index: 1000;
}
</style>
