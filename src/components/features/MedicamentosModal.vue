<script setup lang="ts">
import { useFiltersStore } from "@/stores";
import BaseModal from "@/components/shared/BaseModal.vue";
const store = useFiltersStore();

function selectMedicamento(med: { principioActivo: string }) {
    store.clearFilters()
    store.updateSearchQuery(med.principioActivo)
    store.closeMedicamentosModal()
}
</script>

<template>
    <BaseModal
        v-model="store.isMedicamentosModalOpen"
        title="Medicamentos Base"
        @close="store.closeMedicamentosModal()"
    >
        <p class="modal-subtitle">{{ store.selectedPathologyForModal }}</p>

        <div
            v-if="store.medicamentosPorPatologia.length === 0"
            class="empty-state"
        >
            <p>No hay medicamentos base registrados para esta patología.</p>
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
                        <span
                            v-for="(alias, i) in med.alias"
                            :key="i"
                            class="alias-tag"
                            >{{ alias }}</span
                        >
                    </div>
                </div>
            </div>
        </div>
    </BaseModal>
</template>

<script setup lang="ts"></script>

<style scoped>
.modal-subtitle {
    font-size: 0.85rem;
    color: var(--color-primary);
    font-weight: 600;
    margin-top: -8px;
    margin-bottom: 8px;
}
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
    border-radius: 10px;
    font-weight: 500;
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
