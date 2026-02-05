<script setup>

const destination = 'Amsterdam'
</script>

<template>

  <body>
    <header>
      <div class="app-header">
        <img src=" @/logos/ns_logo.png" />
        <h1>IC Direct to {{ destination }}</h1>
      </div>
    </header>
    <main>
      <div class="travel-info">
        <p>Amsterdam</p>
      </div>
    </main>
  </body>
</template>

<style>
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
