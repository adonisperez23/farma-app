<script setup lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import TheHeader from "@/components/layout/TheHeader.vue";
import TheFooter from "@/components/layout/TheFooter.vue";
import { useCartStore, useFiltersStore } from "./stores";

const cartStore = useCartStore();
const filterStore = useFiltersStore();
</script>

<template>
    <ion-app>
        <TheHeader />
        <ion-router-outlet />
        <TheFooter
            v-if="
                (!cartStore.isCartModalOpen &&
                    filterStore.selectedPathologyForModal === null) ||
                (!filterStore.isMedicamentosModalOpen &&
                    filterStore.selectedPathologyForModal !== null)
            "
        />
    </ion-app>
</template>
