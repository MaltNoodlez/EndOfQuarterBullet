<script setup>
import { onMounted, ref } from 'vue'
const currentStation = ref("Den Haag")
const departures =
    [
        {
            "id": 1,
            "name": "Amsterdam",
            "departureTime": "2 mins",
            "track_departure": "6",
            "track_arrival": "3"
        },
        {
            "id": 2,
            "name": "Zwolle",
            "departureTime": "2 mins",
            "track_departure": "6",
            "track_arrival": "3"

        },
        {
            "id": 3,
            "name": "Arnhem",
            "departureTime": "2 mins",
            "track_departure": "6",
            "track_arrival": "3"
        },
    ]

const departuresResponse = ref()

const fetchData = async () => {
    try {
        const response = await fetch('http://localhost:3000/getTrain', {
            method: 'POST',
            body: JSON.stringify({
                station: currentStation.value,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        departuresResponse.value = data;
        console.log(data);
    } catch (err) {
        console.error('Error fetching data:', err);
    }
};

onMounted(() => {
    fetchData();
});
</script>

<template>
    <main>
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

                <div class="departure-grid row"
                    v-for="{ id, name, departureTime, track_departure, track_arrival } in departures" :key="id">
                    <div>{{ name }}</div>
                    <div>{{ departureTime }}</div>
                    <div> {{ track_departure }}</div>
                    <div> {{ track_arrival }}</div>
                </div>
            </div>
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