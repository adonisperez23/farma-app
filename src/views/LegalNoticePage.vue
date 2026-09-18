<script setup lang="ts">
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton } from '@ionic/vue'
</script>

<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/home" />
                </IonButtons>
                <IonTitle>Aviso Legal</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent class="page-content">
            <div class="content-spacer">
                <h1>Aviso Legal y Descargo de Responsabilidad</h1>

                <section class="legal-section">
                    <h2>1. Imparcialidad y Neutralidad del Algoritmo</h2>
                    <p>
                        Los resultados de búsqueda y listados de precios que se muestran en la Aplicación se ordenan y clasifican mediante criterios estrictamente objetivos de menor a mayor precio.
                    </p>
                    <p>
                        El ordenamiento de las tarjetas de productos no está alterado por acuerdos comerciales, favoritismos o compensaciones económicas de ninguna cadena de farmacias o laboratorio.
                    </p>
                    <p>
                        En caso de exhibir anuncios, tarjetas de productos sugeridos o banners patrocinados, estos se encontrarán visiblemente diferenciados con la etiqueta "Patrocinado" o "Sugerencia", garantizando en todo momento la transparencia e imparcialidad del comparador principal.
                    </p>
                </section>

                <section class="legal-section">
                    <h2>2. Independencia Comercial y Marcas Registradas</h2>
                    <p>
                        Pharmatch es un desarrollo tecnológico de carácter independiente. La plataforma no pertenece, no está afiliada, ni cuenta con el patrocinio u homologación oficial de las cadenas de farmacias, droguerías o laboratorios cuyos nombres o precios se citan en el Servicio.
                    </p>
                    <p>
                        Todos los nombres comerciales, marcas registradas, logotipos e imágenes de productos o farmacias exhibidos en la Aplicación son propiedad exclusiva de sus respectivos titulares.
                    </p>
                    <p>
                        Su inclusión en este comparador responde exclusivamente a fines informativos, descriptivos e identificativos de datos de acceso público, facilitando la consulta consolidada de precios para el consumidor.
                    </p>
                </section>

                <section class="legal-section">
                    <h2>3. Descargo de Responsabilidad Sanitaria y Uso Responsable</h2>
                    <p>
                        <strong>Clasificación por Condición Médica:</strong> La categorización de productos por patologías o condiciones de salud (ej. medicamentos para hipertensión, diabetes, tiroides, entre otros) es únicamente una guía organizativa y un filtro facilitador de búsqueda dentro de la plataforma.
                    </p>
                    <p>
                        <strong>Sin Recomendación Farmacéutica:</strong> La inclusión de un medicamento o principio activo en una categoría no representa una indicación médica de consumo ni garantiza la equivalencia biofarmacéutica o terapéutica entre distintas marcas o presentaciones comerciales.
                    </p>
                    <p>
                        <strong>Sustitución de Criterio Profesional:</strong> La información contenida en la Aplicación en ningún caso reemplaza el diagnóstico, la receta o la orientación de un médico o farmacéutico colegiado. La decisión y compra final de cualquier tratamiento debe ser validada con un profesional de la salud calificado.
                    </p>
                </section>

                <section class="legal-section">
                    <h2>4. Variación de Datos, Precios y Stock en Tiempo Real</h2>
                    <p>
                        Los datos presentados en la Aplicación son recabados periódicamente (una vez al día) mediante procesos automatizados de inspección de fuentes públicas y catálogos en línea de las farmacias.
                    </p>
                    <p>
                        Debido a la naturaleza dinámica del comercio minorista y del sector farmacéutico, Pharmatch no garantiza que el precio, la vigencia de promociones o la disponibilidad de inventario reflejados en la plataforma coincidan exactamente con la información en tiempo real de la farmacia al momento en que el Usuario sea redirigido o acuda a realizar su compra.
                    </p>
                    <p>
                        Corresponde al Usuario verificar la exactitud de la oferta, condiciones de pago e inventario directamente en la plataforma o establecimiento oficial de la farmacia de destino antes de finalizar su adquisición.
                    </p>
                </section>

                <section class="legal-section">
                    <h2>5. Enlaces Externos y Redirección de Compra</h2>
                    <p>
                        Al hacer clic en los enlaces de compra o redirección ("Ir a la farmacia"), el Usuario abandona el entorno de la Aplicación y es dirigido a sitios web o aplicaciones móviles operadas por terceros.
                    </p>
                    <p>
                        Pharmatch no ejerce control sobre la disponibilidad, funcionamiento, políticas de privacidad, cargos por envío o calidad del servicio prestado por los comercios de destino, quedando eximida de cualquier reclamación derivada de la transacción comercial entre el Usuario y la farmacia correspondiente.
                    </p>
                </section>

                <section class="legal-section">
                    <h2>6. Canal de Atención Corporativo</h2>
                    <p>
                        Para cualquier notificación legal, aclaración sobre marcas, reporte de inconsistencias en datos o consultas sobre el Servicio, puede comunicarse con el equipo administrador mediante nuestro canal corporativo oficial:
                    </p>
                    <p><strong>Correo Electrónico de Contacto:</strong> contacto@Pharmatch.info</p>
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
}
</style>
