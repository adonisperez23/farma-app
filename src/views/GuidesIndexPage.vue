<script setup lang="ts">
import {
    IonContent,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
} from "@ionic/vue";
import { articles } from "@/data/articles";
</script>

<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/home" />
                </IonButtons>
                <IonTitle>Guías de medicamentos</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent class="page-content">
            <div class="content-spacer">
                <h1>Guías de medicamentos</h1>

                <section class="intro-section">
                    <p>
                        Artículos originales para que compares y compres
                        medicamentos con más criterio: genéricos, principios
                        activos, dosis, filtros del comparador y consejos
                        prácticos para ahorrar en cada visita a la farmacia.
                    </p>
                </section>

                <router-link
                    v-for="article in articles"
                    :key="article.slug"
                    :to="`/guias/${article.slug}`"
                    class="article-card"
                >
                    <h2 class="article-title">{{ article.title }}</h2>
                    <p class="article-excerpt">{{ article.excerpt }}</p>
                    <span class="article-cta">Leer guía →</span>
                </router-link>
            </div>
        </IonContent>
    </IonPage>
</template>

<style scoped>
.page-content {
    --background: var(--color-bg-app);
}

.content-spacer {
    padding-top: 125px;
    padding-bottom: 100px;
}

@media (max-width: 639px) {
    .content-spacer {
        padding-bottom: 200px;
    }
}

h1 {
    font-size: 1.5rem;
    color: var(--color-text-main);
    padding: 16px;
    margin-bottom: 16px;
}

.intro-section {
    background-color: var(--color-bg-surface);
    border-radius: 12px;
    padding: 16px;
    margin: 8px 16px;
    border: 1px solid var(--color-border);
}

.intro-section p {
    font-size: 0.9rem;
    color: var(--color-text-muted);
    line-height: 1.6;
    margin: 0;
}

.article-card {
    display: block;
    background-color: var(--color-bg-surface);
    border: 1px solid var(--color-border);
    border-radius: 12px;
    padding: 16px;
    margin: 8px 16px;
    text-decoration: none;
    transition:
        transform 0.15s ease,
        box-shadow 0.15s ease;
}

.article-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    border-color: var(--color-primary-border);
}

.article-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--color-text-main);
    margin: 0 0 8px;
    line-height: 1.4;
}

.article-excerpt {
    font-size: 0.875rem;
    color: var(--color-text-muted);
    line-height: 1.6;
    margin: 0 0 10px;
}

.article-cta {
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--color-primary);
}
</style>
