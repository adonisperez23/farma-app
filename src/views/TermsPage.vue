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
                <IonTitle>Términos y Condiciones</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent class="page-content">
            <div class="content-spacer">
                <h1>Términos y Condiciones de Uso</h1>

                <p>
                    Bienvenido a Pharmatch. Al acceder, navegar o utilizar esta
                    aplicación web el usuario  acepta cumplir y quedar
                    vinculado por los siguientes Términos y Condiciones de Uso.
                    Si no está de acuerdo con alguna parte de estos términos, le
                    rogamos no utilizar la Aplicación.
                </p>

                <section class="legal-section">
                    <h2>1. NATURALEZA DEL SERVICIO</h2>
                    <p>
                        <strong>1.1.</strong> Pharmatch es exclusivamente un
                        motor de búsqueda, agregador de información y
                        herramienta de comparación de precios de medicamentos de farmacia.
                    </p>
                    <p>
                        <strong>1.2.</strong> No somos una farmacia, droguería
                        ni laboratorio farmacéutico. La Aplicación no vende,
                        distribuye, almacena, comercializa ni despacha
                        medicamentos o productos médicos de ningún tipo.
                    </p>
                    <p>
                        <strong>1.3.</strong> La Aplicación no procesa
                        transacciones financieras, pagos ni pedidos. La función
                        del carrito o lista de la compra actúa únicamente como
                        una herramienta de consolidación informativa para el
                        Usuario.
                    </p>
                </section>

                <section class="legal-section">
                    <h2>
                        2. EXENCIÓN DE RESPONSABILIDAD MÉDICA Y SANITARIA
                    </h2>
                    <p>
                        <strong>2.1. Uso Informativo:</strong> Todo el contenido
                        presentado en la Aplicación —incluyendo nombres
                        comerciales, principios activos, precios, disponibilidad
                        y la clasificación de medicamentos por condiciones o
                        patologías (ej. hipertensión, diabetes, etc.)— tiene un
                        carácter estrictamente informativo y orientativo.
                    </p>
                    <p>
                        <strong>2.2. Sin Asesoramiento Médico:</strong> Bajo
                        ninguna circunstancia el contenido de esta Aplicación
                        debe ser interpretado como un diagnóstico, prescripción,
                        recomendación médica o sustituto de la consulta con un
                        profesional de la salud calificado.
                    </p>
                    <p>
                        <strong>2.3. Consulta Profesional:</strong> Se exhorta
                        al Usuario a consultar siempre a un médico o
                        farmacéutico antes de iniciar, modificar o suspender
                        cualquier tratamiento médico o adquirir un medicamento.
                    </p>
                    <p>
                        <strong>2.4. Equivalencia de Productos:</strong> La
                        inclusión de un medicamento en una categoría médica no
                        garantiza que sea el tratamiento adecuado para su
                        condición particular ni asegura su equivalencia
                        biofarmacéutica.
                    </p>
                </section>

                <section class="legal-section">
                    <h2>
                        3. EXACTITUD DE INFORMACIÓN, PRECIOS Y DISPONIBILIDAD DE
                        STOCK
                    </h2>
                    <p>
                        <strong>3.1. Origen de los Datos:</strong> La
                        información sobre productos, nombres y precios provistos
                        en la Aplicación es recolectada mediante técnicas
                        automatizadas de extracción de datos públicos e inspección de datos de acceso público en los
                        portales web y aplicaciones oficiales de terceros.
                    </p>
                    <p>
                        <strong>3.2. Frecuencia de Actualización:</strong> Los
                        datos se actualizan periódicamente (generalmente de
                        forma diaria). Por tanto, la información puede diferir
                        del precio, promociones o disponibilidad de inventario
                        en tiempo real reflejados por las cadenas de farmacias
                        al momento de su compra.
                    </p>
                    <p>
                        <strong>3.3. Ausencia de Garantía:</strong> No
                        garantizamos la exactitud, integridad, actualización o
                        disponibilidad ininterrumpida de los datos presentados.
                        Pharmatch no se responsabiliza por errores, disparidades
                        de precios, discrepancias en el stock o cambios
                        imprevistos por parte de las farmacias listadas.
                    </p>
                </section>

                <section class="legal-section">
                    <h2>4. ENLACES A TERCEROS Y REDIRECCIÓN </h2>
                    <p>
                        <strong>4.1.</strong> Al seleccionar un producto o
                        presionar botones como "Ir a la farmacia" la Aplicación lo redirigirá
                        mediante enlaces directos hacia los sitios
                        web o aplicaciones móviles oficiales de las farmacias
                        correspondientes.
                    </p>
                    <p>
                        <strong>4.2.</strong> Una vez que abandona nuestra
                        Aplicación, Usted queda sujeto a los términos y
                        condiciones, políticas de privacidad y condiciones de
                        venta de la respectiva cadena de farmacias o sitio de
                        terceros.
                    </p>
                    <p>
                        <strong>4.3.</strong> Pharmatch no asume responsabilidad
                        alguna por las compras, calidad del servicio, retrasos
                        en entregas, cobros erróneos o disputas comerciales que
                        surjan entre el Usuario y las farmacias de destino.
                    </p>
                </section>

                <section class="legal-section">
                    <h2>5. PROPIEDAD INTELECTUAL Y USO LEGÍTIMO DE MARCAS</h2>
                    <p>
                        <strong>5.1.</strong> Todos los nombres comerciales,
                        logotipos, marcas registradas, imágenes de productos y
                        nombres de cadenas de farmacias mostrados en la
                        Aplicación son propiedad exclusiva de sus respectivos
                        titulares.
                    </p>
                    <p>
                        <strong>5.2.</strong> Su aparición en esta Aplicación
                        responde únicamente a fines identificativos,
                        descriptivos y comparativos de datos públicos, sin que esto implique patrocinio,
                        respaldo, asociación o afiliación oficial entre
                        Pharmatch y las farmacias o laboratorios mencionados,
                        salvo que se especifique lo contrario.
                    </p>
                    <p>
                        <strong>5.3.</strong> El diseño, código fuente, interfaz
                        gráfica, algoritmos de coincidencia (matching) y marca
                        propia de la Aplicación son propiedad intelectual del
                        equipo desarrollador de Pharmatch. Queda prohibida la
                        reproducción o explotación no autorizada del software.
                    </p>
                </section>

                <section class="legal-section">
                    <h2>
                        6. PUBLICIDAD, ENLACES DE AFILIADOS Y PUBLICACIONES
                        PATROCINADAS
                    </h2>
                    <p>
                        <strong>6.1.</strong> La Aplicación puede exhibir
                        banners publicitarios, anuncios servidos por redes de
                        terceros (como Google AdMob), enlaces con parámetros de
                        afiliación o módulos de productos patrocinados.
                    </p>
                    <p>
                        <strong>6.2.</strong> La presencia de anuncios o enlaces
                        patrocinados no altera el orden ni los criterios
                        objetivos del algoritmo de comparación de precios
                        principales, garantizando la imparcialidad del servicio
                        de búsqueda.
                    </p>
                </section>

                <section class="legal-section">
                    <h2>7. LIMITACIÓN DE RESPONSABILIDAD</h2>
                    <p>
                        En la máxima medida permitida por la legislación
                        aplicable, Pharmatch, sus desarrolladores, operadores y
                        colaboradores no serán responsables por ningún daño
                        directo, indirecto, incidental, consecuente o punitivo
                        que derive del uso o de la imposibilidad de uso de esta
                        Aplicación, o de las decisiones médicas, económicas o de
                        compra adoptadas por el Usuario basadas en la
                        información aquí provista.
                    </p>
                </section>

                <section class="legal-section">
                    <h2>8. MODIFICACIONES A LOS TÉRMINOS Y AL SERVICIO</h2>
                    <p>
                        <strong>8.1.</strong> Nos reservamos el derecho de
                        modificar o actualizar estos Términos y Condiciones en
                        cualquier momento y sin previo aviso.
                    </p>
                    <p>
                        <strong>8.2.</strong> El uso continuado de la Aplicación
                        tras la publicación de cambios constituye la aceptación
                        expresa de los nuevos términos.
                    </p>
                    <p>
                        <strong>8.3.</strong> Nos reservamos el derecho de
                        suspender, modificar o discontinuar la Aplicación (o
                        cualquier parte de ella) de forma temporal o permanente
                        en cualquier momento.
                    </p>
                </section>

                <section class="legal-section">
                    <h2>9. CONTACTO</h2>
                    <p>
                        Si tiene alguna duda, pregunta o reclamo respecto a
                        estos Términos y Condiciones de Uso, o para cualquier
                        asunto relacionado con la Aplicación, puede ponerse en
                        contacto con nuestro equipo de atención a través del
                        siguiente canal corporativo:
                    </p>
                    <p>
                        <strong>Correo Electrónico de Contacto:</strong>
                        <a href="mailto:contacto@pharmatch.com"
                            >contacto@pharmatch.info</a
                        >
                    </p>
                    <p>
                        <strong>Sitio Web:</strong>
                        <a href="https://pharmatch.info">pharmatch.info</a>
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

h1 {
    font-size: 1.5rem;
    color: var(--color-text-main);
    padding: 16px;
    margin-bottom: 16px;
}

.content-spacer > p:first-of-type {
    font-size: 0.85rem;
    color: var(--color-text-muted);
    padding: 0 16px;
    margin-bottom: 16px;
    line-height: 1.6;
}

.legal-section {
    background-color: var(--color-bg-surface);
    border-radius: 12px;
    padding: 16px;
    margin: 8px 16px;
    border: 1px solid var(--color-border);
}

.legal-section h2 {
    font-size: 1rem;
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
}
</style>
