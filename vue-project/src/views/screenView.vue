<script setup>
import { onMounted, ref, computed } from 'vue'
import { useContentRotator } from '@/composables/useContentRotator'
import contentSlot from '@/components/contentSlot.vue'
const streamUrl = ref('https://stream.radionl.fm/rnlfriesland')
const trains = ref([])
const catFact = ref("Loading cat fact...")
import snake from '@/images/snake.jpeg'
import cat from '@/images/cat.jpg'
import goat from '@/images/goat.jpg'
const destination = "Amsterdam"

const fetchCatFact = async () => {
    try {
        const response = await fetch('http://localhost:3000/getCatFact')

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
//         const response = await fetch('http://localhost:3000/getTrain')
//         if (!response.ok) throw new Error('Network error')

//         const data = await response.json()
//         trains.value = data.payload.departures
//     } catch (err) {
//         console.error(err)
//     }
// }

// onMounted(fetchData)
console.log(trains)

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
