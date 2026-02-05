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
}

p {
  margin: 0;
}

.app-header {
  align-items: center;
}
</style>
