<template>
  <div class="app">

    <!-- ================= VIDEO BACKGROUND ================= -->
    <div id="video-container">
      <iframe
        v-for="(video, i) in videos"
        :key="i"
        class="bg-video"
        :class="{ active: activeView === i }"
        :src="video"
        allow="autoplay"
      ></iframe>
    </div>

    <!-- ================= TOP CONTROLS ================= -->
    <div id="top-controls">
      <button
        v-for="(label, i) in viewLabels"
        :key="i"
        @click="activeView = i"
      >
        {{ label }}
      </button>

      <button class="game-btn" @click="openGame">
        🎮 Play Game
      </button>
    </div>

    <!-- ================= CENTER CARD ================= -->
    <div id="center-card">
      <h2>🚆 Current Stop</h2>
      <p><strong>Paris Gare de Lyon</strong></p>
      <hr />
      <h3>Next Stop</h3>
      <p>Lyon Part-Dieu</p>
      <p class="eta">{{ formattedTime }}</p>
    </div>

    <!-- ================= BOTTOM CARDS ================= -->
    <div id="bottom-cards">

      <!-- CHAT -->
      <div class="card">
        <h4>💬 Live Chat</h4>
        <div class="chat">
          <div v-for="(msg, i) in chatMessages" :key="i">
            {{ msg }}
          </div>
        </div>
        <input
          v-model="chatInput"
          placeholder="Type message…"
          @keyup.enter="sendChat"
        />
        <button @click="sendChat">Send</button>
      </div>

      <!-- ARRIVAL -->
      <div class="card">
        <h4>⏱ Arrival</h4>
        <p>Status: On Time</p>
        <p>Speed: 280 km/h</p>
      </div>

      <!-- MEME -->
      <div class="card">
        <h4>😂 Meme</h4>
        <img :src="currentMeme" />
        <button @click="nextMeme">Next Meme</button>
      </div>

    </div>

    <!-- ================= GAME OVERLAY ================= -->
    <div v-if="showGame" id="game-overlay">
      <button class="exit-game" @click="closeGame">
        ⬅ Exit Game
      </button>

      <iframe
        src="https://itch.io/embed-upload/6049330?color=333333"
        allowfullscreen
      ></iframe>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

/* ================= VIDEO ================= */
const videos = [
  "https://www.youtube.com/embed/tmQZUzVleug?autoplay=1&mute=1&controls=0&loop=1&playlist=tmQZUzVleug",
  "https://www.youtube.com/embed/ktUg92kgoxo?autoplay=1&mute=1&controls=0&loop=1&playlist=ktUg92kgoxo",
  "https://www.youtube.com/embed/ezanlpga_Ms?autoplay=1&mute=1&controls=0&loop=1&playlist=ezanlpga_Ms",
  "https://www.youtube.com/embed/WCjsihTxPMI?autoplay=1&mute=1&controls=0&loop=1&playlist=WCjsihTxPMI",
  "https://www.youtube.com/embed/1f1ZRV8i6bM?autoplay=1&mute=1&controls=0&loop=1&playlist=1f1ZRV8i6bM"
]

const viewLabels = ['Front', 'Mountains', 'Window', 'City', 'Countryside']
const activeView = ref(0)

/* ================= GAME ================= */
const showGame = ref(false)

function openGame() {
  showGame.value = true
}

function closeGame() {
  showGame.value = false
}

/* ================= CHAT ================= */
const chatMessages = ref([])
const chatInput = ref('')

function sendChat() {
  if (!chatInput.value.trim()) return
  chatMessages.value.push(`🧍 ${chatInput.value}`)
  chatInput.value = ''
}

onMounted(() => {
  setInterval(() => {
    const bots = [
      "🚆 smooth ride",
      "🌄 insane view",
      "☕ coffee time",
      "😴 sleepy already",
      "📶 wifi works!"
    ]
    chatMessages.value.push(
      bots[Math.floor(Math.random() * bots.length)]
    )
  }, 4000)
})

/* ================= MEMES ================= */
const memes = [
  "https://i.imgflip.com/30b1gx.jpg",
  "https://i.imgflip.com/26am.jpg",
  "https://i.imgflip.com/3si4.jpg",
  "https://i.imgflip.com/4acd7j.png"
]

const memeIndex = ref(0)
const currentMeme = computed(() => memes[memeIndex.value])

function nextMeme() {
  memeIndex.value = (memeIndex.value + 1) % memes.length
}

/* ================= TIMER ================= */
const minutes = ref(2)
const seconds = ref(14)

const formattedTime = computed(
  () => `${minutes.value}:${seconds.value.toString().padStart(2, '0')}`
)

onMounted(() => {
  setInterval(() => {
    seconds.value--
    if (seconds.value < 0) {
      seconds.value = 59
      minutes.value--
    }
    if (minutes.value < 0) minutes.value = 0
  }, 1000)
})
</script>

<style scoped>
* {
  box-sizing: border-box;
  font-family: system-ui, sans-serif;
}

/* VIDEO */
#video-container {
  position: fixed;
  inset: 0;
  z-index: -1;
}

.bg-video {
  position: absolute;
  width: 100%;
  height: 100%;
  border: none;
  opacity: 0;
  transition: opacity 0.6s ease;
}

.bg-video.active {
  opacity: 1;
}

/* TOP CONTROLS */
#top-controls {
  position: fixed;
  top: 14px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

#top-controls button {
  background: rgba(0,0,0,0.6);
  color: white;
  border: 1px solid rgba(255,255,255,0.2);
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
}

.game-btn {
  background: rgba(40,120,255,0.7);
}

/* CENTER CARD */
#center-card {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0,0,0,0.65);
  padding: 28px 34px;
  border-radius: 16px;
  text-align: center;
  min-width: 340px;
  backdrop-filter: blur(8px);
  color: white;
}

/* BOTTOM CARDS */
#bottom-cards {
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 16px;
}

.card {
  background: rgba(0,0,0,0.6);
  padding: 16px;
  border-radius: 14px;
  width: 220px;
  backdrop-filter: blur(8px);
  color: white;
}

.card img {
  width: 100%;
  border-radius: 8px;
}

.chat {
  font-size: 13px;
  max-height: 80px;
  overflow: auto;
  margin-bottom: 6px;
}

input {
  width: 100%;
  padding: 6px;
  border-radius: 6px;
  border: none;
  margin-bottom: 6px;
}

/* GAME OVERLAY */
#game-overlay {
  position: fixed;
  inset: 0;
  background: black;
  z-index: 999;
}

#game-overlay iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.exit-game {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 1000;
  padding: 10px 16px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
}
</style>
