<script setup>
import { onMounted, ref, computed } from 'vue'
import { useContentRotator } from '@/composables/useContentRotator'
import contentSlot from '@/components/contentSlot.vue'
const trains = ref([])
const catFact = ref("Loading cat fact...")
import snake from '@/images/snake.jpeg'
import cat from '@/images/cat.jpg'
import goat from '@/images/goat.jpg'
const destination = "Amsterdam"

const fetchCatFact = async () => {
    try {
        const response = await fetch('http://localhost:3001/getCatFact')

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        catFact.value = data[0]
        console.log('Cat facts:', data)
        console.log(catFact.value)

    } catch (err) {
        console.error('Error fetching cat fact:', err)
    }
}

onMounted(fetchCatFact)

const items = computed(() => [
    {
        type: "img",
        src: snake
    },
    {
        type: "img",
        src: cat
    },
    {
        type: "img",
        src: goat
    },
    {
        type: "text",
        content: catFact.value
    }
])

// const { currentIndex } = useContentRotator(items, 3000)
// const content = computed(() => items.value[currentIndex.value])

const formatTime = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    })
}

// const fetchData = async () => {
//     try {
//         const response = await fetch('http://localhost:3001/getTrain')
//         if (!response.ok) throw new Error('Network error')
//     }
// }

/* ================= STATE ================= */
const route = ref(null)
const streamUrl = ref('')

/* ================= LISTEN FOR ROUTE SELECTION ================= */
const handleStorageChange = (event) => {
  if (event.key === 'selectedRoute' && event.newValue) {
    const selectedRoute = JSON.parse(event.newValue)
    
    route.value = {
      direction: selectedRoute.name,
      departureTime: selectedRoute.departureTime,
      track: selectedRoute.track_departure,
      stations: selectedRoute.routeStations || []
    }
    
    console.log('New route received:', route.value)
  }
}

/* ================= FETCH RADIO ================= */
const fetchRadio = async () => {
  try {
    const response = await fetch('http://localhost:3001/radio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city: 'Enschede' })
    });

        const data = await response.json()
        streamUrl.value = data.value
    } catch (err) {
        console.error('Error fetching radio:', err)
    }
}

// /* ================= INIT ================= */
onMounted(() => {
  // Listen for localStorage changes from other tabs/windows
  window.addEventListener('storage', handleStorageChange)
  
  // Check if there's already a selected route
  const savedRoute = localStorage.getItem('selectedRoute')
  if (savedRoute) {
    const selectedRoute = JSON.parse(savedRoute)
    route.value = {
      direction: selectedRoute.name,
      departureTime: selectedRoute.departureTime,
      track: selectedRoute.track_departure,
      stations: selectedRoute.routeStations || []
    }
  }
  
  fetchRadio()
})

onUnmounted(() => {
  window.removeEventListener('storage', handleStorageChange)
})

</script>

<template>
  <header>
    <div class="app-header">
      <img src="@/logos/ns_logo.png" />
      <h2>{{ route ? 'IC Direct to ' + route.direction : 'Select a destination' }}</h2>
    </div>
  </header>

    <div class="main-content">
        <!-- LEFT: timeline -->
        <div class="timeline">
            <h2>Departures</h2>

      <h3>{{ route.direction }}</h3>

      <div
        v-for="(station, index) in route.stations"
        :key="index"
        class="timeline-row"
      >
        <div class="dot"></div>

        <div class="station-name">
          {{ station }}
        </div>

        <div class="meta">
          <span class="time">
            {{ index === 0 ? route.departureTime : '' }}
          </span>
          <span class="track">
            {{ index === 0 ? 'Track ' + route.track : '' }}
          </span>
        </div>
      </div>
    </div>

    <div class="no-route">
      <p>👆 Click a destination on the station view to see the route</p>
    </div>

        <!-- RIGHT: video -->
        <div class="content">
            <content-slot :items="items">
                <template #default="{ item }">
                    <template v-if="item">

                        <img v-if="item.type === 'img'" :src="item.src" class="fullscreen" />

                        <video v-else-if="item.type === 'video'" :src="item.src" autoplay muted playsinline
                            class="fullscreen" />

                        <div v-else-if="item.type === 'text'" class="text-slide">
                            {{ item.content }}
                        </div>

                    </template>
                </template>
            </content-slot>
        </div>

        <div class="radio-player">
            <h2>Live radio: Omrop Fryslân</h2>
            <audio ref="audioRef" controls autoplay :src="streamUrl"></audio>
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
