<script setup lang="ts">
import { nextTick } from "vue";
import { useFiltersStore } from "@/stores";
import BaseModal from "@/components/shared/BaseModal.vue";
const store = useFiltersStore();

function scrollToSearchArea() {
    const el =
        document.getElementById("results-section") ??
        document.getElementById("filters-section");
    if (!el) return;

    const header = document.querySelector<HTMLElement>(".pwa-header");
    el.style.scrollMarginTop = `${(header?.offsetHeight ?? 0) + 8}px`;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function selectTerm(term: string) {
    store.clearFilters();
    store.updateSearchQuery(term);
    store.closeMedicamentosModal();
    await store.waitForSearch();
    await nextTick();
    await new Promise((resolve) => requestAnimationFrame(resolve));
    scrollToSearchArea();
}

function selectMedicamento(med: { principioActivo: string }) {
    selectTerm(med.principioActivo);
}
</script>

<template>
    <BaseModal
        v-model="store.isMedicamentosModalOpen"
        title="Medicamentos para:"
        :subtitle="store.selectedPathologyForModal!"
        @close="store.closeMedicamentosModal()"
    >
        <!-- <p class="modal-subtitle">{{ store.selectedPathologyForModal }}</p> -->

        <div
            v-if="store.medicamentosPorPatologia.length === 0"
            class="empty-state"
        >
            <p>No hay medicamentos registrados para esta patología.</p>
        </div>

        <div v-else class="medicamento-list">
            <div
                v-for="med in store.medicamentosPorPatologia"
                :key="med.id"
                class="medicamento-card"
                @click="selectMedicamento(med)"
            >
                <div class="medicamento-info">
                    <h4 class="medicamento-name">{{ med.principioActivo }}</h4>
                    <div
                        v-if="med.alias && med.alias.length > 0"
                        class="medicamento-aliases"
                    >
                        <button
                            v-for="(alias, i) in med.alias"
                            :key="i"
                            type="button"
                            class="alias-tag"
                            @click.stop="selectTerm(alias)"
                        >
                            {{ alias }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </BaseModal>
</template>

<style scoped>
.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    gap: 12px;
    color: var(--color-text-muted);
}
.empty-icon {
    font-size: 48px;
}
.empty-state p {
    font-size: 0.9rem;
}
.medicamento-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.medicamento-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px;
    background-color: var(--color-bg-app);
    border: 1px solid var(--color-border);
    border-radius: 12px;
    transition: border-color 0.2s ease;
    cursor: pointer;
}
.medicamento-card:hover {
    border-color: var(--color-primary-border);
    background-color: var(--color-primary-light);
}
.medicamento-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
}
.medicamento-name {
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--color-text-main);
}
.medicamento-dosis {
    font-size: 0.8rem;
    color: var(--color-text-muted);
    font-weight: 500;
}
.medicamento-aliases {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
    margin-top: 4px;
}
.alias-tag {
    font-size: 0.7rem;
    background-color: var(--color-primary-light);
    color: var(--color-primary);
    padding: 2px 8px;
    border: 1px solid transparent;
    border-radius: 10px;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition:
        background-color 0.2s ease,
        color 0.2s ease;
}
.alias-tag:hover {
    background-color: var(--color-primary);
    color: #ffffff;
}
.alias-tag:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
}
.medicamento-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
}
.presentacion-ref {
    font-size: 0.75rem;
    color: var(--color-text-muted);
    font-weight: 600;
}
</style>
