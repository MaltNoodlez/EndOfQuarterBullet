<script setup>
const cities = [
    "Leeuwarden",
    "Groningen",
    "Assen",
    "Zwolle",
    "Arnhem",
    "Lelystad",
    "Utrecht",
    "Den Haag",
    "Haarlem",
    "Den Bosch",
    "Maatricht",
    "MiddelBurg"
]

</script>

<template>
    <div class="grid-container">
        <button v-for="city in cities" :key="city">
            {{ city }}
        </button>
    </div>
</template>

<style>
.grid-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    /* exactly 4 columns */
    gap: 16px;
    /* spacing between items */
}
</style>