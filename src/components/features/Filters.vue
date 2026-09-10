<script setup lang="ts">
import { useFiltersStore, getPatologiaFromCondition } from '@/stores'
import { onMounted } from 'vue'
const store = useFiltersStore()

function handleConditionClick(condition: string) {
    store.setCondition(condition)
    const patologia = getPatologiaFromCondition(condition)
    store.openMedicamentosModal(patologia)
}

onMounted(() => {
    store.loadMedicamentos()
})
</script>

<template>
    <section class="filters-section">
        <div class="pharmacy-filter-container">
            <span class="filter-label">Farmacias:</span>
            <div class="pharmacy-checkboxes">
                <label class="checkbox-tag">
                    <input
                        type="checkbox"
                        name="pharmacy"
                        value="Farmatodo"
                        :checked="store.selectedPharmacies.includes('Farmatodo')"
                        @change="store.togglePharmacy('Farmatodo')"
                    />
                    <span class="custom-checkbox"></span>
                    Farmatodo
                </label>
                <label class="checkbox-tag">
                    <input
                        type="checkbox"
                        name="pharmacy"
                        value="Farmadón"
                        :checked="store.selectedPharmacies.includes('Farmadón')"
                        @change="store.togglePharmacy('Farmadón')"
                    />
                    <span class="custom-checkbox"></span>
                    Farmadón
                </label>
                <label class="checkbox-tag">
                    <input
                        type="checkbox"
                        name="pharmacy"
                        value="Farmapaz"
                        :checked="store.selectedPharmacies.includes('Farmapaz')"
                        @change="store.togglePharmacy('Farmapaz')"
                    />
                    <span class="custom-checkbox"></span>
                    Farmapaz
                </label>
                <label class="checkbox-tag">
                    <input
                        type="checkbox"
                        name="pharmacy"
                        value="Farmatina"
                        :checked="store.selectedPharmacies.includes('Farmatina')"
                        @change="store.togglePharmacy('Farmatina')"
                    />
                    <span class="custom-checkbox"></span>
                    Farmatina
                </label>
            </div>
        </div>

        <div class="pathology-filter-container">
            <span class="filter-label">Condición rápida:</span>
            <div class="pathology-carousel">
                <button
                    class="chip-button"
                    :class="{ active: store.selectedCondition === 'hipertension' }"
                    @click="handleConditionClick('hipertension')"
                >
                    <span class="chip-icon">❤️</span>
                    <span>Hipertensión</span>
                </button>
                <button
                    class="chip-button"
                    :class="{ active: store.selectedCondition === 'diabetes' }"
                    @click="handleConditionClick('diabetes')"
                >
                    <span class="chip-icon">🩸</span>
                    <span>Diabetes</span>
                </button>
            </div>
        </div>

        <div v-if="store.availableDosis.length > 0" class="dosis-filter-container">
            <span class="filter-label">Dosis:</span>
            <div class="dosis-chips">
                <button
                    v-for="dosis in store.availableDosis"
                    :key="dosis"
                    class="chip-button"
                    :class="{ active: store.selectedDosis.includes(dosis) }"
                    :disabled="store.availableDosis.length === 1"
                    @click="store.toggleDosis(dosis)"
                >
                    {{ dosis }}
                </button>
            </div>
        </div>

        <div class="cantidad-filter-container">
            <span class="filter-label">Cantidad de comprimidos:</span>
            <select
                class="cantidad-select"
                :value="store.selectedCantidad"
                @change="store.setCantidadRange(($event.target as HTMLSelectElement).value)"
            >
                <option value="todos">Todos</option>
                <option value="0-10">Menos de 10</option>
                <option value="10-30">10 - 30</option>
                <option value="30-60">30 - 60</option>
                <option value="60+">Más de 60</option>
            </select>
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
    transition:
        transform 0.3s ease-out,
        max-height 0.3s ease-out,
        opacity 0.3s ease-out;
    transform: translateY(0);
    max-height: 500px;
    opacity: 1;
    overflow: hidden;
}
.filters-section.hidden {
    transform: translateY(-100%);
    max-height: 0;
    opacity: 0;
    padding: 0 16px;
    border: none;
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
.chip-button:disabled {
    cursor: not-allowed;
    opacity: 1;
}
.chip-icon {
    font-size: 1rem;
}
.dosis-chips {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}
.cantidad-select {
    padding: 8px 14px;
    border-radius: 12px;
    border: 1px solid var(--color-border);
    background-color: var(--color-bg-app);
    color: var(--color-text-main);
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    outline: none;
    transition: border-color 0.2s ease;
}
.cantidad-select:focus {
    border-color: var(--color-primary);
}
.cantidad-select option {
    background-color: var(--color-bg-surface);
    color: var(--color-text-main);
}
</style>