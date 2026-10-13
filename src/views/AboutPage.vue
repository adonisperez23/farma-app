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
                <IonTitle>Sobre nosotros</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent class="page-content">
            <div class="content-spacer">
                <h1>Sobre Pharmatch</h1>

                <section class="legal-section">
                    <h2>¿Qué es Pharmatch?</h2>
                    <p>
                        Pharmatch es un comparador de precios de medicamentos
                        creado con un objetivo simple: que cada persona en
                        Maturín, estado Monagas, pueda saber antes de salir de
                        casa cuánto cuesta un medicamento y en qué farmacia
                        está más conveniente.
                    </p>
                    <p>
                        Nuestra plataforma reúne los precios publicados por
                        farmacias como Farmatodo, Farmadón, Farmapaz y
                        Farmatina, los organiza por principio activo, dosis y
                        presentación, y los presenta ordenados de menor a mayor
                        precio para que comparar sea inmediato.
                    </p>
                </section>

                <section class="legal-section">
                    <h2>Cómo recopilamos los precios</h2>
                    <p>
                        Los precios y la disponibilidad se recopilan de forma
                        automatizada mediante procesos que inspeccionan catálogos
                        y fuentes públicas de cada farmacia aproximadamente una
                        vez al día. No manipulamos el orden de los resultados por
                        acuerdos comerciales: el criterio es siempre el precio.
                    </p>
                    <p>
                        Cuando un producto aparece primero con la etiqueta "Mejor
                        Precio", es porque, según el último dato disponible, es
                        la opción más económica de entre las farmacias
                        seleccionadas.
                    </p>
                </section>

                <section class="legal-section">
                    <h2>Nuestra independencia</h2>
                    <p>
                        Pharmatch es una plataforma independiente. No pertenecemos
                        a ninguna cadena de farmacias ni a laboratorios, y no
                        vendemos medicamentos directamente. Cuando haces clic en
                        "Ir a Farmacia" sales de nuestra web hacia el sitio o la
                        aplicación oficial de la farmacia correspondiente, donde
                        se completa la compra según sus propios términos.
                    </p>
                    <p>
                        Si en el futuro exhibimos anuncios o contenido
                        patrocinado, estos estarán claramente identificados como
                        tales para distinguirlos de los resultados orgánicos del
                        comparador.
                    </p>
                </section>

                <section class="legal-section">
                    <h2>Privacidad primero</h2>
                    <p>
                        No requerimos que crees una cuenta ni inicies sesión para
                        usar el comparador. Tu lista de compra, el historial de
                        búsquedas y tus preferencias se guardan únicamente en tu
                        dispositivo, mediante el almacenamiento local del
                        navegador. Puedes eliminarlos en cualquier momento
                        borrando los datos del sitio desde la configuración de tu
                        navegador.
                    </p>
                    <p>
                        Para conocer todos los detalles, consulta nuestras
                        <router-link to="/privacidad"
                            >Políticas de Privacidad</router-link
                        >
                        y nuestros
                        <router-link to="/terminos"
                            >Términos y Condiciones</router-link
                        >.
                    </p>
                </section>

                <section class="legal-section">
                    <h2>Contenido informativo y responsable</h2>
                    <p>
                        Además del comparador, publicamos
                        <router-link to="/guias">guías originales</router-link>
                        sobre medicamentos genéricos, principios activos, dosis
                        y consejos prácticos para comprar con criterio. Todo este
                        contenido es meramente informativo y no sustituye la
                        consulta médica ni la orientación de un farmacéutico
                        colegiado.
                    </p>
                </section>

                <section class="legal-section">
                    <h2>Contacto</h2>
                    <p>
                        ¿Preguntas, sugerencias o encontraste un precio
                        desactualizado? Escríbenos a
                        <a href="mailto:contacto@pharmatch.info"
                            >contacto@pharmatch.info</a
                        >
                        o visita nuestra página de
                        <router-link to="/contacto">Contacto</router-link>.
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

.legal-section a {
    color: var(--color-primary);
    font-weight: 600;
    text-decoration: none;
}
</style>
