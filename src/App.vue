<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import TheHeader from '@/components/layout/TheHeader.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
</script>

<template>
  <ion-app>
    <TheHeader />
    <ion-router-outlet />
    <TheFooter />
  </ion-app>
</template>
