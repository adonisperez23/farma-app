<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue";
import Filters from "@/components/Filters.vue";
import PanelFlotante from "@/components/PanelFlotante.vue";
import Results from "@/components/Results.vue";
</script>

<template>
    <div class="page-container">
        <TheHeader />
        <Filters />
        <Results />
        <PanelFlotante />
    </div>
</template>

<style scoped>
.page-container {
    padding-top: 125px;
    padding-bottom: 80px;
    min-height: 100vh;
    background-color: var(--color-bg-app);
    position: relative;
}
</style>
