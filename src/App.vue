<script setup lang="ts">
import { computed } from "vue";
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import TheHeader from "@/components/layout/TheHeader.vue";
import TheFooter from "@/components/layout/TheFooter.vue";
import BaseModal from "@/components/shared/BaseModal.vue";
import { useCartStore, useFiltersStore } from "./stores";
import { useOnboarding } from "@/composables/useOnboarding";
import { usePwaInstall } from "@/composables/usePwaInstall";

const cartStore = useCartStore();
const filterStore = useFiltersStore();
const onboarding = useOnboarding();
const { isInstallModalOpen } = usePwaInstall();

const isAnyModalOpen = computed(
    () =>
        cartStore.isCartModalOpen ||
        cartStore.isDuplicateModalOpen ||
        filterStore.isMedicamentosModalOpen ||
        onboarding.isOpen.value ||
        isInstallModalOpen.value
);
</script>

<template>
    <ion-app>
        <TheHeader />
        <ion-router-outlet />
        <TheFooter v-if="!isAnyModalOpen" />
        <BaseModal
            :modelValue="cartStore.isDuplicateModalOpen"
            title="Medicamento duplicado"
            @close="cartStore.closeDuplicateModal()"
        >
            <p class="duplicate-message">
                "{{ cartStore.duplicateItemName }}" ya está en tu lista de
                compra, por lo que no se agregó de nuevo.
            </p>
            <p class="duplicate-note">
                El mismo medicamento no puede agregarse dos veces a la lista.
            </p>
            <button class="btn-ack" @click="cartStore.closeDuplicateModal()">
                Entendido
            </button>
        </BaseModal>
    </ion-app>
</template>

<style scoped>
.duplicate-message {
    font-size: 0.95rem;
    line-height: 1.5;
    color: var(--color-text-main);
    margin: 0;
}

.duplicate-note {
    font-size: 0.85rem;
    line-height: 1.4;
    color: var(--color-text-muted);
    background-color: var(--color-bg-app);
    border-radius: 8px;
    padding: 10px 12px;
    margin: 0;
}

.btn-ack {
    width: 100%;
    background-color: var(--color-primary);
    color: #ffffff;
    border: none;
    padding: 10px;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s ease;
}

.btn-ack:hover {
    opacity: 0.9;
}
</style>
