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
</script>

<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/home" />
                </IonButtons>
                <IonTitle>Contacto</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent class="page-content">
            <div class="content-spacer">
                <h1>Contacto</h1>

                <section class="legal-section">
                    <h2>Atención al usuario</h2>
                    <p>
                        En Pharmatch queremos escucharte. Si tienes preguntas
                        sobre cómo usar el comparador, encontraste un precio
                        desactualizado, detectaste un producto que ya no está
                        disponible o simplemente quieres enviarnos una sugerencia,
                        escríbenos y te responderemos lo antes posible.
                    </p>
                    <p>
                        <strong>Correo electrónico:</strong>
                        <a href="mailto:contacto@pharmatch.info"
                            >contacto@pharmatch.info</a
                        >
                    </p>
                </section>

                <section class="legal-section">
                    <h2>Qué incluir en tu mensaje</h2>
                    <p>
                        Para poder atenderte de forma rápida y precisa,
                        incluye cuando sea posible:
                    </p>
                    <ul>
                        <li>
                            El nombre exacto del medicamento y la farmacia
                            involucrada (si tu consulta es sobre un precio).
                        </li>
                        <li>
                            La ciudad o zona desde donde usas la plataforma.
                        </li>
                        <li>
                            Una captura de pantalla del problema, si aplica.
                        </li>
                        <li>Tu correo de contacto para poder responderte.</li>
                    </ul>
                </section>

                <section class="legal-section">
                    <h2>Consultas legales y de privacidad</h2>
                    <p>
                        Para notificaciones legales, consultas sobre el
                        tratamiento de datos o temas de propiedad intelectual,
                        también puedes usar el correo de contacto. Enlaces
                        útiles:
                    </p>
                    <ul>
                        <li>
                            <router-link to="/privacidad"
                                >Políticas de Privacidad</router-link
                            >
                        </li>
                        <li>
                            <router-link to="/terminos"
                                >Términos y Condiciones de Uso</router-link
                            >
                        </li>
                        <li>
                            <router-link to="/aviso-legal"
                                >Aviso Legal y Descargo de
                                Responsabilidad</router-link
                            >
                        </li>
                        <li>
                            <router-link to="/faq"
                                >Preguntas frecuentes</router-link
                            >
                        </li>
                    </ul>
                </section>

                <section class="legal-section">
                    <h2>Tiempo de respuesta</h2>
                    <p>
                        Nuestro equipo procesa los mensajes en un plazo habitual
                        de 48 a 72 horas hábiles. Las correcciones de precios
                        reportadas se incorporan en la siguiente actualización
                        diaria de datos del comparador.
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
    font-size: 1.1rem;
    color: var(--color-primary);
    margin-bottom: 8px;
}

.legal-section p {
    font-size: 0.9rem;
    color: var(--color-text-muted);
    line-height: 1.6;
    margin-bottom: 8px;
}

.legal-section ul {
    margin-left: 20px;
    margin-bottom: 8px;
}

.legal-section li {
    font-size: 0.9rem;
    color: var(--color-text-muted);
    line-height: 1.6;
    margin-bottom: 4px;
}

.legal-section a {
    color: var(--color-primary);
    font-weight: 600;
    text-decoration: none;
}
</style>
