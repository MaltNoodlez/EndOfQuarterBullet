<script setup>
import { onMounted, ref } from 'vue'
const city = ref("Enschede")


function formatTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleTimeString('nl-NL', {
    hour: '2-digit',
    minute: '2-digit'
  });
}


const departuresResponse = ref([])

const catFacts = ref([])

const fetchCatFact = async () => {
  try {
    const response = await fetch('http://localhost:3000/getCatFact')

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    catFacts.value = data
    console.log('Cat facts:', data)

  } catch (err) {
    console.error('Error fetching cat fact:', err)
  }
}

const fetchData = async () => {
    try {
        const response = await fetch('http://localhost:3000/getTrain', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                city: city.value,
            }),
        });

        const data = await response.json();

        departuresResponse.value = data.payload.departures.map((d, index) => ({
            id: index,
            name: d.direction,
            departureTime: formatTime(d.plannedDateTime),
            track_departure: d.plannedTrack ?? '-',
            track_arrival: d.actualTrack ?? '-'
        }));
    } catch (err) {
        console.error('Error fetching data:', err);
    }
};

onMounted(()=>{
    fetchData();
    fetchCatFact();
});
</script>

<template>
    <main>
        <div>
            <form @submit.prevent="fetchData">
                <input v-model="city">
                <button type="submit">Submit</button>
            </form>
        </div>
        <div class="wrapper">
            <div class="info">
                <h2>Current location: {{ currentLocation }}</h2>
            </div>

            <div class="info departures">
                <h2>Upcoming departures:</h2>

                <div class="departure-grid header">
                    <div>Destination</div>
                    <div>Departing in:</div>
                    <div> Departure Track</div>
                    <div> Arrival Track</div>
                </div>

                <div
                class="departure-grid row"
                v-for="departure in departuresResponse"
                :key="departure.id"
                >
                    <div>{{ departure.name }}</div>
                    <div>{{ departure.departureTime }}</div>
                    <div>{{ departure.track_departure }}</div>
                    <div>{{ departure.track_arrival }}</div>
                </div>
            </div>
        </div>
        <div v-if="catFacts.length" class="info departures">
            <h3>Cat facts 🐱</h3>
            <ul>
                <li v-for="(fact, index) in catFacts" :key="index">
                {{ fact }}
                </li>
            </ul>
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
</style>