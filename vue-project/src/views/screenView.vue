<script setup>
import { onMounted, ref } from 'vue'

const trains = ref([])

const formatTime = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:3000/getTrain')
    if (!response.ok) throw new Error('Network error')

    const data = await response.json()
    trains.value = data.payload.departures
  } catch (err) {
    console.error(err)
  }
}

onMounted(fetchData)
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
    <h2>Departures</h2>

    <div v-for="(train, index) in trains" :key="index">
      {{ train.direction }} —
      {{ formatTime(train.plannedDateTime) }} —
      {{ train.name }}
    </div>
  </div>

  <!-- RIGHT: video -->
  <div class="content">
    <content-slot>
      <template #content>
        {{ content?.value }}
      </template>
    </content-slot>
  </div>
</div>


</template>

<style>
body {
    color: white;
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


.video {
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

