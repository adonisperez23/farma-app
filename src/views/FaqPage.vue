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
import { onMounted, onUnmounted } from "vue";

const faqItems = [
    {
        q: "¿Qué es Pharmatch?",
        a: "Pharmatch es un comparador gratuito de precios de medicamentos en farmacias de Maturín, estado Monagas. Permite buscar medicamentos por nombre o principio activo, filtrar por dosis y cantidad, y comparar precios entre farmacias antes de comprar.",
    },
    {
        q: "¿Cómo sé en qué farmacia está más barato un medicamento?",
        a: "Escribe el nombre del medicamento o su principio activo en el buscador. Los resultados se ordenan de menor a mayor precio y el primer resultado se marca con la etiqueta 'Mejor Precio' cuando corresponde.",
    },
    {
        q: "¿Los precios están actualizados?",
        a: "Los precios y la disponibilidad se recopilan de forma automatizada aproximadamente una vez al día. Antes de comprar, siempre confirma el precio vigente directamente en la farmacia de destino mediante el botón 'Ir a Farmacia'.",
    },
    {
        q: "¿Pharmatch vende medicamentos?",
        a: "No. Pharmatch es únicamente un comparador de precios. No procesamos pagos ni despachos. Al hacer clic en 'Ir a Farmacia' sales hacia el sitio o la aplicación oficial de la farmacia, donde completas la compra según sus propios términos.",
    },
    {
        q: "¿Qué significa el precio REF en dólares?",
        a: "El precio REF es el equivalente en dólares del precio en bolívares, calculado con la tasa de referencia del Banco Central de Venezuela (BCV) registrada al momento de la actualización de los datos. Es una referencia informativa para facilitar la comparación.",
    },
    {
        q: "¿Necesito crear una cuenta?",
        a: "No. Puedes usar todo el comparador sin registrarte. Tu lista de compra y tus preferencias se guardan localmente en tu dispositivo mediante el almacenamiento del navegador.",
    },
    {
        q: "¿Puedo usar Pharmatch en el teléfono como aplicación?",
        a: "Sí. Pharmatch es una PWA instalable: desde el botón 'Instalar App' del encabezado puedes añadirla a la pantalla de inicio de Android o iPhone y usarla como una app nativa.",
    },
    {
        q: "¿Qué pasa si un medicamento no aparece en los resultados?",
        a: "Es posible que el medicamento no tenga precio registrado en las farmacias seleccionadas o que no esté disponible. Puedes probar con el principio activo en lugar del nombre comercial, o contactarnos en contacto@pharmatch.info para que revisemos el caso.",
    },
    {
        q: "¿Los genéricos que aparecen son equivalentes a los de marca?",
        a: "Los genéricos aprobados contienen el mismo principio activo que el medicamento de marca. Sin embargo, en medicamentos de margen terapéutico estrecho siempre debes consultar con tu médico o farmacéutico antes de sustituir una marca por otra. Pharmatch es informativo y no sustituye la orientación profesional.",
    },
    {
        q: "¿Cómo reporto un precio incorrecto?",
        a: "Escríbenos a contacto@pharmatch.info con el nombre del producto y la farmacia. Incorporamos las correcciones en la siguiente actualización diaria de datos.",
    },
];

let scriptEl: HTMLScriptElement | null = null;

onMounted(() => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
            },
        })),
    };
    scriptEl = document.createElement("script");
    scriptEl.type = "application/ld+json";
    scriptEl.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(scriptEl);
});

onUnmounted(() => {
    if (scriptEl && scriptEl.parentNode) {
        scriptEl.parentNode.removeChild(scriptEl);
    }
});
</script>

<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/home" />
                </IonButtons>
                <IonTitle>Preguntas frecuentes</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent class="page-content">
            <div class="content-spacer">
                <h1>Preguntas frecuentes</h1>

                <section
                    v-for="(item, index) in faqItems"
                    :key="index"
                    class="legal-section"
                >
                    <h2>{{ item.q }}</h2>
                    <p>{{ item.a }}</p>
                </section>

                <section class="legal-section">
                    <h2>¿No encontraste tu respuesta?</h2>
                    <p>
                        Escríbenos a
                        <a href="mailto:contacto@pharmatch.info"
                            >contacto@pharmatch.info</a
                        >
                        o visita la página de
                        <router-link to="/contacto">Contacto</router-link>.
                        También puedes consultar nuestras
                        <router-link to="/guias">guías de medicamentos</router-link
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
    font-size: 1.5rem;
    color: var(--color-text-main);
    padding: 16px;
    margin-bottom: 16px;
}

.legal-section {
    background-color: var(--color-bg-surface);
    border-radius: 12px;
    padding: 16px;
    margin: 8px 16px;
    border: 1px solid var(--color-border);
}

.legal-section h2 {
    font-size: 1.05rem;
    color: var(--color-primary);
    margin-bottom: 8px;
}

.legal-section p {
    font-size: 0.9rem;
    color: var(--color-text-muted);
    line-height: 1.6;
    margin-bottom: 8px;
}

.legal-section a {
    color: var(--color-primary);
    font-weight: 600;
    text-decoration: none;
}
</style>
