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
import { computed, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getArticleBySlug } from "@/data/articles";

const route = useRoute();
const router = useRouter();

const article = computed(() =>
    getArticleBySlug(String(route.params.slug ?? "")),
);

watchEffect(() => {
    if (!article.value) {
        router.replace("/guias");
    }
});
</script>

<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/guias" />
                </IonButtons>
                <IonTitle>{{ article?.title ?? "Guía" }}</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent class="page-content">
            <div v-if="article" class="content-spacer">
                <h1>{{ article.title }}</h1>

                <section class="article-section">
                    <p class="article-lead">{{ article.excerpt }}</p>
                </section>

                <section
                    v-for="(section, index) in article.sections"
                    :key="index"
                    class="article-section"
                >
                    <h2 v-if="section.heading">{{ section.heading }}</h2>
                    <p v-for="(p, pi) in section.paragraphs" :key="pi">
                        {{ p }}
                    </p>
                    <ul v-if="section.list">
                        <li v-for="(li, lii) in section.list" :key="lii">
                            {{ li }}
                        </li>
                    </ul>
                </section>

                <section class="article-section disclaimer">
                    <p>
                        Este contenido es informativo y no sustituye la consulta
                        médica, la receta ni la orientación de un farmacéutico
                        colegiado. Antes de comprar o sustituir un medicamento,
                        consulta con un profesional de la salud.
                    </p>
                </section>

                <section class="article-section">
                    <h2>Compara precios ahora</h2>
                    <p>
                        ¿Listo para comprar? Vuelve al
                        <router-link to="/home"
                            >buscador de medicamentos</router-link
                        >
                        y compara precios entre farmacias. También puedes
                        explorar las demás
                        <router-link to="/guias">guías</router-link>
                        o revisar las
                        <router-link to="/faq"
                            >preguntas frecuentes</router-link
                        >.
                    </p>
                </section>
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
    font-size: 1.4rem;
    color: var(--color-text-main);
    padding: 16px;
    margin-bottom: 16px;
    line-height: 1.35;
}

.article-section {
    background-color: var(--color-bg-surface);
    border-radius: 12px;
    padding: 16px;
    margin: 8px 16px;
    border: 1px solid var(--color-border);
}

.article-section h2 {
    font-size: 1.1rem;
    color: var(--color-primary);
    margin-bottom: 8px;
}

.article-section p {
    font-size: 0.9rem;
    color: var(--color-text-muted);
    line-height: 1.65;
    margin-bottom: 8px;
}

.article-section p:last-child {
    margin-bottom: 0;
}

.article-lead {
    font-weight: 500;
    color: var(--color-text-main) !important;
}

.article-section ul {
    margin-left: 20px;
    margin-bottom: 8px;
}

.article-section li {
    font-size: 0.9rem;
    color: var(--color-text-muted);
    line-height: 1.6;
    margin-bottom: 4px;
}

.article-section a {
    color: var(--color-primary);
    font-weight: 600;
    text-decoration: none;
}

.disclaimer {
    border-color: var(--color-primary-border);
    background-color: var(--color-primary-light);
}

.disclaimer p {
    color: var(--color-text-main);
}
</style>
