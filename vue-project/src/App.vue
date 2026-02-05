<script setup>

const destination = 'Amsterdam'
</script>

<template>

  <body>
    <header>
      <div class="app-header">
        <img src=" @/logos/ns_logo.png" />
        <h1>IC Direct to {{ destination }}</h1>
        <router-link to="/rotterdam"> Go to station</router-link>
      </div>
    </header>

    <main>
    </main>
  </body>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap');

body {
  background-color: #222222;
  margin: 0;
  padding: 0;
}

header {
  height: 132px;
  background-color: #648DE5;
  margin: 0;
  color: white;
  padding: 1em;
  display: flex
}

p {
  margin: 0;
}

.app-header {
  display:flex;
  gap: 50px;
  align-items: center;
}


</style>
