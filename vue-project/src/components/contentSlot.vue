<script setup>
import { computed } from 'vue'
import { useContentRotator } from '@/composables/useContentRotator'

const props = defineProps({
    items: {
        type: Array,
        required: true
    }
})

const itemsRef = computed(() => props.items || [])

const { currentIndex } = useContentRotator(itemsRef)

const currentItem = computed(() => {
    if (!itemsRef.value.length) return null
    return itemsRef.value[currentIndex.value] || null
})
</script>

<template>
    <slot v-if="currentItem" :item="currentItem" :index="currentIndex" />
</template>
