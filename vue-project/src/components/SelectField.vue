<script setup lang="ts">


</script>

<template>
    <div class="input-wrap">
        <select label:province v-for="province in provinces">
            <slot name="options" v-for="city in province">
                <option value="city">{{ city.name }}</option>
            </slot>
        </select>
    </div>
</template>