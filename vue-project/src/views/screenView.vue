<script setup>
import { onMounted, onUnmounted, ref, watch, computed } from 'vue'
import { useContentRotator } from '@/composables/useContentRotator'
import contentSlot from '@/components/contentSlot.vue'

// ===== Images =====
import snake from '@/images/snake.jpeg'
import cat from '@/images/cat.jpg'
import goat from '@/images/goat.jpg'

// ===== STATE =====
const catFact = ref('Loading cat fact...')
const route = ref(null)
const streamUrl = ref('')

// ===== FETCH CAT FACT =====
const fetchCatFact = async () => {
  try {
    const res = await fetch('http://localhost:3001/getCatFact')
    if (!res.ok) throw new Error('Network error')
    const data = await res.json()
    catFact.value = data[0]
    console.log('Cat fact:', catFact.value)
  } catch (err) {
    console.error('Error fetching cat fact:', err)
  }
}

// ===== CONTENT ROTATOR =====
const items = ref([
  { type: 'img', src: snake },
  { type: 'img', src: cat },
  { type: 'img', src: goat },
  { type: 'text', content: catFact.value }
])

// Update text slide when catFact changes
watch(catFact, (newVal) => {
  items.value[3].content = newVal
})

const { currentIndex } = useContentRotator(items, 3000)
const content = computed(() => items.value[currentIndex.value])

// ===== HANDLE ROUTE SELECTION =====
const handleStorageChange = (event) => {
  if (event.key === 'selectedRoute' && event.newValue) {
    const sel = JSON.parse(event.newValue)
    route.value = {
      direction: sel.name,
      departureTime: sel.departureTime,
      track: sel.track_departure,
      stations: sel.routeStations || []
    }
    console.log('New route:', route.value)
  }
}

// ===== FETCH RADIO =====
const fetchRadio = async () => {
  try {
    const res = await fetch('http://localhost:3001/radio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city: 'Enschede' })
    })
    const data = await res.json()
    streamUrl.value = data.value
  } catch (err) {
    console.error('Error fetching radio:', err)
  }
}

// ===== FORMAT TIME HELPER =====
const formatTime = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })
}

// ===== LIFECYCLE =====
onMounted(() => {
  fetchCatFact()
  fetchRadio()

  // Listen for changes from other tabs
  window.addEventListener('storage', handleStorageChange)

  // Load saved route from localStorage
  const savedRoute = localStorage.getItem('selectedRoute')
  if (savedRoute) {
    const sel = JSON.parse(savedRoute)
    route.value = {
      direction: sel.name,
      departureTime: sel.departureTime,
      track: sel.track_departure,
      stations: sel.routeStations || []
    }
  }
})

onUnmounted(() => {
  window.removeEventListener('storage', handleStorageChange)
})
</script>


<template>
  <header>
    <div class="app-header">
      <img src="@/logos/ns_logo.png" alt="NS Logo" />
      <h2>{{ route ? 'IC Direct to ' + route.direction : 'Select a destination' }}</h2>
    </div>
  </header>

  <div class="main-content">
    <!-- LEFT: timeline -->
    <div class="timeline-container">
      <div v-if="route" class="timeline">
        <h2>Departures</h2>
        <h3>{{ route.direction }}</h3>

        <div
          v-for="(station, index) in route.stations"
          :key="index"
          class="timeline-row"
        >
          <div class="dot"></div>

          <div class="station-name">{{ station }}</div>

          <div class="meta">
            <span class="time">{{ index === 0 ? route.departureTime : '' }}</span>
            <span class="track">{{ index === 0 ? 'Track ' + route.track : '' }}</span>
          </div>
        </div>
      </div>

      <div v-else class="no-route">
        <p>👆 Click a destination on the station view to see the route</p>
      </div>
    </div>

    <!-- RIGHT: rotating content -->
    <div class="content">
      <div v-if="content">
        <img
          v-if="content.type === 'img'"
          :src="content.src"
          class="fullscreen"
          alt="Slide image"
        />
        <video
          v-else-if="content.type === 'video'"
          :src="content.src"
          autoplay
          muted
          playsinline
          class="fullscreen"
        ></video>
        <div v-else-if="content.type === 'text'" class="text-slide">
          {{ content.content }}
        </div>
      </div>
    </div>

    <!-- BOTTOM: live radio -->
    <div class="radio-player">
      <h2>Live radio: Omrop Fryslân</h2>
      <audio v-if="streamUrl" controls autoplay :src="streamUrl"></audio>
    </div>
  </div>
</template>


<style>
body {
  color: white;
  background: #1a1a2e;
  margin: 0;
}

header {
  height: 132px;
  background-color: #648DE5;
  padding: 1em;
  display: flex;
  align-items: center;
}

.app-header {
  display: flex;
  gap: 40px;
  align-items: center;
}

.main-content {
  display: flex;
  gap: 30px;
  padding: 20px;
  min-height: calc(100vh - 132px);
}

.content {
    border: 1px solid white;
    width: 650px;
    height: 400px;
    overflow: hidden;
}

.content img,
.content video {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.content>.timeline {
    position: relative;
    flex: 1;
    padding-left: 30px;
    color: white;
}

.timeline::before {
  content: "";
  position: absolute;
  left: 12px;
  top: 60px;
  bottom: 0;
  width: 2px;
  background: #ccc;
}

.timeline-row {
  display: grid;
  grid-template-columns: 20px 1fr auto;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
}

.dot {
  width: 10px;
  height: 10px;
  background: white;
  border-radius: 50%;
  z-index: 1;
}

.station-name {
  font-size: 1.05rem;
}

.meta {
  text-align: right;
  font-size: 0.85rem;
  opacity: 0.85;
}

.time,
.track {
  display: block;
}

/* ===== NO ROUTE ===== */
.no-route {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  opacity: 0.6;
}

/* ===== RIGHT SIDE ===== */
.video-wrapper {
  flex: 1.2;
  display: flex;
  justify-content: center;
  align-items: center;
}

audio {
  width: 100%;
  max-width: 400px;
}
</style>
