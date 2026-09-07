<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore'
const store = useCartStore()
</script>

<template>
    <section class="filters-section">
        <!-- 1. Filtro por Farmacias (Checkboxes Horizontales) -->
        <div class="pharmacy-filter-container">
            <span class="filter-label">Farmacias:</span>
            <div class="pharmacy-checkboxes">
                <label class="checkbox-tag">
                    <input
                        type="checkbox"
                        name="pharmacy"
                        value="farmatodo"
                        :checked="store.selectedPharmacies.includes('farmatodo')"
                        @change="store.togglePharmacy('farmatodo')"
                    />
                    <span class="custom-checkbox"></span>
                    Farmatodo
                </label>
                <label class="checkbox-tag">
                    <input
                        type="checkbox"
                        name="pharmacy"
                        value="farmadon"
                        :checked="store.selectedPharmacies.includes('farmadon')"
                        @change="store.togglePharmacy('farmadon')"
                    />
                    <span class="custom-checkbox"></span>
                    Farmadón
                </label>
                <label class="checkbox-tag">
                    <input
                        type="checkbox"
                        name="pharmacy"
                        value="farmaahorro"
                        :checked="store.selectedPharmacies.includes('farmaahorro')"
                        @change="store.togglePharmacy('farmaahorro')"
                    />
                    <span class="custom-checkbox"></span>
                    FarmaAhorro
                </label>
            </div>
        </div>

        <!-- 2. Filtro por Patología/Condición (Carrusel Deslizable) -->
        <div class="pathology-filter-container">
            <span class="filter-label">Condición rápida:</span>
            <div class="pathology-carousel">
                <button
                    class="chip-button"
                    :class="{ active: store.selectedCondition === 'hipertension' }"
                    @click="store.setCondition('hipertension')"
                >
                    <span class="chip-icon">❤️</span>
                    <span>Hipertensión</span>
                </button>
                <button
                    class="chip-button"
                    :class="{ active: store.selectedCondition === 'diabetes' }"
                    @click="store.setCondition('diabetes')"
                >
                    <span class="chip-icon">🩸</span>
                    <span>Diabetes</span>
                </button>
                <button
                    class="chip-button"
                    :class="{ active: store.selectedCondition === 'tiroides' }"
                    @click="store.setCondition('tiroides')"
                >
                    <span class="chip-icon">🛡️</span>
                    <span>Tiroides</span>
                </button>
                <button
                    class="chip-button"
                    :class="{ active: store.selectedCondition === 'dislipidemia' }"
                    @click="store.setCondition('dislipidemia')"
                >
                    <span class="chip-icon">🫀</span>
                    <span>Dislipidemia</span>
                </button>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.filters-section {
    background-color: var(--color-bg-surface);
    border-bottom: 1px solid var(--color-border);
    padding: 12px 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.filter-label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--color-text-muted);
    margin-bottom: 6px;
    display: block;
}

.pharmacy-checkboxes {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    padding-bottom: 2px;
    scrollbar-width: none;
}

.pharmacy-checkboxes::-webkit-scrollbar {
    display: none;
}

.checkbox-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--color-text-main);
    cursor: pointer;
    white-space: nowrap;
    user-select: none;
}

.checkbox-tag input[type="checkbox"] {
    display: none;
}

.custom-checkbox {
    width: 18px;
    height: 18px;
    border: 2px solid var(--color-text-muted);
    border-radius: 4px;
    display: inline-block;
    position: relative;
    transition: all 0.2s ease;
}

.checkbox-tag input[type="checkbox"]:checked + .custom-checkbox {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
}

.checkbox-tag input[type="checkbox"]:checked + .custom-checkbox::after {
    content: "";
    position: absolute;
    left: 5px;
    top: 2px;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}

.pathology-carousel {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    scroll-behavior: smooth;
    padding-bottom: 4px;
    scrollbar-width: none;
}

.pathology-carousel::-webkit-scrollbar {
    display: none;
}

.chip-button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background-color: var(--color-bg-app);
    border: 1px solid var(--color-border);
    padding: 8px 14px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--color-text-main);
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s ease;
}

.chip-button:hover {
    border-color: var(--color-primary-border);
    background-color: var(--color-primary-light);
}

.chip-button.active {
    background-color: var(--color-primary-light);
    color: var(--color-primary);
    border-color: var(--color-primary);
}

.chip-icon {
    font-size: 1rem;
}
</style>
