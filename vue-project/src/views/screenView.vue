<script setup>

const route = [
     {
        "name": "Amsterdam",
        "arrival_time": "12:04",
        "arrival_track": "5"
    },

    {
        "name": "Zwolle",
        "arrival_time": "14:30",
        "arrival_track": "8"
    },

    {
        "name": "Arhem",
        "arrival_time": "15:00",
        "arrival_track": "6"
    }
]
   
</script>


<template>
    <header>
        <div class="app-header">
            <img src=" @/logos/ns_logo.png" />
            <h2>IC Direct to {{ destination }}</h2>
        </div>
    </header>


<div class="main-content">
  <!-- LEFT: timeline -->
  <div class="timeline">
    <div
      v-for="(stop, index) in route"
      :key="index"
      class="timeline-row"
    >
      <div class="dot"></div>

      <div class="station-name">
        {{ stop.name }}
      </div>

      <div class="meta">
        <span class="time">{{ stop.arrival_time }}</span>
        <span class="track">Spoor {{ stop.arrival_track }}</span>
      </div>
    </div>
  </div>

  <!-- RIGHT: video -->
  <div class="video-wrapper">
    <video controls class="video"></video>
  </div>
</div>


</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap');
body {
    color: white;
    /* display: flex;
    justify-content: center;
    align-items: center; */
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
    display: flex;
    gap: 50px;
    align-items: center;
}


.video{
    background-color: white
}


.main-content {
  display: flex;
  gap: 30px;
  padding: 20px;
}


.timeline {
  position: relative;
  flex: 1;
  padding-left: 30px;
  color: white;
}

/* vertical line */
.timeline::before {
  content: "";
  position: absolute;
  left: 12px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #ccc;
}

.timeline-row {
  display: grid;
  grid-template-columns: 20px 1fr auto;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
}

.dot {
  width: 10px;
  height: 10px;
  background: white;
  border-radius: 50%;
  z-index: 1;
}

.station-name {
  font-size: 1.1rem;
}

.meta {
  text-align: right;
  font-size: 0.9rem;
  opacity: 0.85;
}

.time {
  display: block;
}

.track {
  display: block;
}

.video-wrapper {
  flex: 1.2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video {
  width: 100%;
  max-width: 600px;
  height: auto;
}


</style>