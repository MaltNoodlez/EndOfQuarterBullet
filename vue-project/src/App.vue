<script setup>
</script>

<template>
  <div>
    <!-- Navbar -->
    <nav>
      <router-link to="/station" class="nav-link">Go to Station</router-link>
      <router-link to="/screen" class="nav-link">Go to Screen</router-link>
    </nav>

    <!-- Main content -->
    <main>
      <router-view />
    </main>

    <!-- Radio player -->
    <div class="radio-player">
      Radio Player
    </div>
  </div>
</template>

<style>
/* Page background */
body {
  background-color: #222222;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  color: white;
}

/* Navbar styling */
nav {
  display: flex;
  gap: 10px;
  padding: 10px 20px;

}

/* Router link buttons */
.nav-link {
  color: white;
  padding: 8px 15px;
  text-decoration: none;
  font-weight: bold;
  border: 1px solid white;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: white;
  color: #222222;
  transform: scale(1.05);
}

/* Main content */
main {
  padding: 20px;
}

/* Headings */
h2 {
  margin-bottom: 1rem;
  color: #1e3a8a;
  font-size: 1.5rem;
  padding-bottom: 0.3rem;
}

/* Radio player */
.radio-player {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.95);
  padding: 12px 20px;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
  z-index: 1000;
  color: #222222;
  font-weight: bold;
}
</style>