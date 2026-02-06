<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const city = ref('Enschede')
const twitchChannel = "shrimps247"
const navigate = useRouter()
// Create a broadcast channel
const channel = new BroadcastChannel('train-route-channel')

watch(city, () => {
    router.replace({
        path: "/station",
        query: {
            city
        }
    })
})

/* ================= HELPERS ================= */
function formatTime(dateString) {
    const date = new Date(dateString)
    return date.toLocaleTimeString('nl-NL', {
        hour: '2-digit',
        minute: '2-digit'
    })
}

function displayRouteStations(stations) {
    if (!stations || stations.length === 0) {
        return 'No intermediate stops'
    }
    return stations.join(' → ')
}

/* ================= STATE ================= */
const departuresResponse = ref([])
const streamUrl = ref('')

/* ================= SELECT ROUTE ================= */
const selectRoute = (departure) => {
    console.log('Sending route:', departure.name)

    // Convert to plain object (remove Vue reactivity)
    const plainDeparture = JSON.parse(JSON.stringify(departure))

    // Broadcast the selected route to other tabs/windows
    channel.postMessage({
        type: 'ROUTE_SELECTED',
        route: plainDeparture
    })

    // Also save to localStorage as backup
    localStorage.setItem('selectedRoute', JSON.stringify(plainDeparture))

    console.log('Route sent successfully!')
    navigate.push("/screen")
}

/* ================= FETCH RADIO ================= */
const fetchRadio = async () => {
    try {
        const response = await fetch('http://localhost:3001/radio', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ city: city.value })
        })

        const data = await response.json()
        streamUrl.value = data
    } catch (err) {
        console.error('Error fetching radio:', err)
    }
}

/* ================= FETCH TRAIN DATA ================= */
const fetchData = async () => {
    try {
        const response = await fetch('http://localhost:3001/getTrain/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ city: city.value })
        })

        const data = await response.json()
        console.log(data)

        departuresResponse.value = data.payload.departures.map((d, index) => ({
            id: index,
            name: d.direction,
            departureTime: formatTime(d.plannedDateTime),
            track_departure: d.plannedTrack ?? '-',
            track_arrival: d.actualTrack ?? '-',

            routeStations: d.routeStations?.map(s => s.mediumName) ?? []
        }))
    } catch (err) {
        console.error('Error fetching train data:', err)
    }
}

function handleSubmit() {
    fetchData()
    fetchRadio()
}

/* ================= INIT ================= */
onMounted(() => {
    fetchData()
    fetchRadio()
})
</script>

<template>
    <main>
        <div>
            <form @submit.prevent="handleSubmit">
                <input v-model="city">
                <button type="submit">Submit</button>
            </form>
        </div>
        <div class="wrapper">
            <div class="info">
                <h2>Current location: {{ city }}</h2>
            </div>

            <div class="info departures">
                <h2>Upcoming departures:</h2>

                <div class="departure-grid header">
                    <div>Destination</div>
                    <div>Departing in:</div>
                    <div>Departure Track</div>
                    <div>Arrival Track</div>
                </div>

                <div class="departure-grid row" v-for="departure in departuresResponse" :key="departure.id">
                    <div>{{ departure.name }}</div>
                    <div>{{ departure.departureTime }}</div>
                    <div>{{ departure.track_departure }}</div>
                    <div>{{ departure.track_arrival }}</div>
                </div>
            </div>
        </div>

        <div class="radio-player">
            <h2>Live radio</h2>
            <audio ref="audioRef" controls autoplay :src="streamUrl"></audio>
        </div>
    </main>
</template>

<style scoped>
body {
    margin: 0;
}

main {
    height: 100vh;
    background-image: url("@/images/rotterdam_perron.jpg");
    background-size: cover;
    background-position: bottom center;
    background-repeat: no-repeat;
}

.wrapper {
    display: flex;
    margin: 2rem auto;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #333;
    justify-content: space-between;
    padding: 0 1em;
}

.info {
    margin-bottom: 2rem;
}

h2 {
    background-color: rgba(255, 255, 255, 0.8);
    border-bottom: 2px solid #1e3a8a;
}

.departure-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: center;
    padding: 0.5rem 0.8rem;
    width: 600px;
}

.departure-grid.header {
    font-weight: bold;
    background-color: #1e3a8a;
    color: #ffffff;
    text-transform: uppercase;
    border-bottom: 2px solid #0f2a5a;
}

.departure-grid.row:nth-child(odd) {
    background-color: #f3f4f6;
}

.departure-grid.row:nth-child(even) {
    background-color: #e5e7eb;
}

.departure-grid.row div {
    padding: 0.5rem 0.8rem;
    color: #111827;
}

.clickable {
    cursor: pointer;
    transition: all 0.2s;
}

.clickable:hover {
    background-color: rgba(30, 58, 138, 0.2);
    font-weight: 600;
}

.clickable:active {
    transform: scale(0.98);
}
</style>