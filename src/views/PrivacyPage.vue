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
                <IonTitle>Políticas de Privacidad</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent class="page-content">
            <div class="content-spacer">
                <h1>Políticas de Privacidad</h1>

                <section class="legal-section">
                    <h2>1. INFORMACIÓN QUE RECOPILAMOS Y CÓMO LA OBTENEMOS</h2>
                    <p>
                        La Aplicación está diseñada bajo el principio de minimización de datos: no requerimos que los usuarios creen una cuenta, inicien sesión ni proporcionen datos personales identificables (como nombres, direcciones físicas o números de teléfono) para hacer uso de las funciones de búsqueda y comparación de precios.
                    </p>
                    <p><strong>A. Datos Recopilados Automáticamente </strong></p>
                    <p>
                        Al navegar o consultar la Aplicación, nuestros servidores y servicios de analítica pueden registrar automáticamente información técnica y de tráfico no identificable, que incluye:
                    </p>
                    <ul>
                        <li><strong>Datos de uso e interacción:</strong> Términos o nombres de medicamentos e insumos consultados en el buscador, filtros de patologías/condiciones seleccionados (ej. hipertensión, diabetes), marcas o farmacias consultadas y tasa de clics en los enlaces de redirección.</li>
                        <li><strong>Información técnica del dispositivo:</strong> Dirección IP (anonimizada), tipo de navegador, sistema operativo, idioma preferido y resolución de pantalla.</li>
                    </ul>
                    <p><strong>B. Almacenamiento Local en el Dispositivo </strong></p>
                    <p>
                        No utilizamos cookies publicitarias ni de rastreo invasivo de primera parte. Sin embargo, para mejorar la experiencia del usuario, la Aplicación utiliza almacenamiento local en el navegador:
                    </p>
                    <ul>
                        <li><strong>Preferencias del usuario:</strong> Para recordar la selección de farmacias favoritas, filtros por defecto, el historial de búsquedas recientes dentro del dispositivo o los elementos añadidos a la lista.</li>
                    </ul>
                    <p>Estos datos se guardan exclusivamente en el dispositivo del Usuario y no se transmiten ni almacenan en nuestros servidores centrales.</p>
                </section>

                <section class="legal-section">
                    <h2>2. USO DE LA INFORMACIÓN RECOPILADA</h2>
                    <p>
                        La información técnica y agregada no personal recopilada se utiliza estrictamente para los siguientes fines:
                    </p>
                    <ul>
                        <li><strong>Prestación y Optimización del Servicio:</strong> Procesar las consultas de búsqueda a través de nuestra API interna, mostrar precios actualizados y garantizar la estabilidad del servidor.</li>
                        <li><strong>Mejora del Motor de Búsqueda:</strong> Analizar patrones de búsqueda de forma anónima para identificar los medicamentos o condiciones médicas de mayor interés y optimizar los procesos diarios de recolección de datos.</li>
                        <li><strong>Mantenimiento Técnico y Seguridad:</strong> Monitorear el rendimiento de la aplicación, prevenir actividades fraudulentas o ataques cibernéticos y resolver fallos técnicos.</li>
                    </ul>
                </section>

                <section class="legal-section">
                    <h2>3. REDIRECCIÓN A FARMACIAS</h2>
                    <p>
                        Al seleccionar un producto o hacer clic en botones de redirección ("Ir a la farmacia"), la Aplicación lo redirigirá hacia la ficha del producto en el sitio web o la aplicación móvil oficial de la farmacia correspondiente mediante enlaces directos.
                    </p>

                    <p><strong>Sitios Web de Terceros:</strong> Una vez redirigido fuera de la Aplicación, el manejo de su información se regirá por la política de privacidad y los términos propios de la farmacia de destino. Le recomendamos leer detenidamente las políticas de dichos sitios externos.</p>
                </section>

                <section class="legal-section">
                    <h2>4. PUBLICIDAD Y ANUNCIOS DE TERCEROS</h2>
                    <p>
                        Para mantener la gratuidad de la Aplicación y cubrir los costos operativos de servidor e infraestructura, exhibimos anuncios servidos por <strong>Google AdSense</strong>.
                    </p>
                    <p><strong>A. Google AdSense y cookies publicitarias </strong></p>
                    <p>
                        Google, como proveedor externo, utiliza cookies (incluida la cookie DART deDoubleClick) para publicar anuncios en función de las visitas anteriores del usuario a este u otros sitios web.
                    </p>
                    <ul>
                        <li><strong>Publicidad contextual:</strong> Los anuncios mostrados priorizan criterios contextuales relacionados con el contenido de la página y no con datos personales identificables, ya que la Aplicación no requiere cuentas ni registros.</li>
                        <li><strong>Control del Usuario:</strong> Puede inhabilitar la publicidad personalizada de Google y de terceros ajustando su configuración en <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Anuncios Settings</a>, o desactivando la cookie DART en <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">Política de tecnologías publicitarias de Google</a>.</li>
                        <li><strong>Cookies de terceros:</strong> El uso de cookies por parte de Google está sujeto a las políticas de privacidad de Google. Para más información, consulte <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer">Cómo usa Google las cookies</a> y el portal <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">AboutAds Choices</a> para opt out de anunciantes participantes.</li>
                    </ul>
                    <p><strong>B. Patrocinios Directos y Módulos Destacados</strong></p>
                    <p>En caso de mostrar anuncios o productos destacados provenientes de acuerdos comerciales directos con laboratorios o establecimientos de salud, estos siempre estarán identificados explícitamente con la etiqueta "Patrocinado" o "Sugerencia", asegurando la transparencia e imparcialidad del comparador de precios principal.</p>
                </section>


                <section class="legal-section">
                    <h2>5. TRANSFERENCIA Y DIVULGACIÓN DE DATOS</h2>
                    <p>No vendemos, alquilamos ni comercializamos datos personales de nuestros usuarios.</p>
                    <p>Únicamente compartiremos datos anónimos o agregados bajo las siguientes circunstancias excepcionales:</p>
                    <ul>
                        <li><strong>Proveedores de Servicios e Infraestructura:</strong> Con plataformas de alojamiento en la nube o bases de datos que procesan las peticiones de la API de forma estrictamente confidencial y bajo altos estándares de seguridad cibernética.</li>
                        <li><strong>Requerimiento Legal:</strong> Si es exigido por ley, orden judicial o autoridad gubernamental competente, dentro del marco normativo aplicable.</li>
                    </ul>
                </section>

                <section class="legal-section">
                    <h2>6. SEGURIDAD DE LA INFORMACIÓN</h2>
                    <p>
                        Implementamos medidas de seguridad técnicas, organizativas y cifrado mediante protocolo seguro HTTPS (SSL/TLS) para proteger la transmisión de datos entre su navegador o dispositivo y nuestros servidores. No obstante, recuerde que ningún método de transmisión por Internet o almacenamiento electrónico es 100% inexpugnable.
                    </p>
                </section>

                <section class="legal-section">
                    <h2>7. DERECHOS DE LOS USUARIOS Y MENORES DE EDAD</h2>
                    <p><strong>Derecho de Eliminación de Datos Locales:</strong> Puede eliminar en cualquier momento la información guardada localmente (listas de compras, historial o preferencias) con solo borrar las cookies y los datos de navegación del sitio web/PWA desde las opciones de su navegador.</p>
                    <p><strong>Menores de Edad:</strong> La Aplicación no está dirigida intencionalmente a menores de 18 años ni recopila a sabiendas datos de menores.</p>
                </section>

                <section class="legal-section">
                    <h2>8. CAMBIOS A ESTA POLÍTICA DE PRIVACIDAD</h2>
                    <p>
                        Nos reservamos el derecho de actualizar o modificar esta Política de Privacidad en cualquier momento para reflejar cambios legislativos, técnicos o en la oferta del servicio. Las modificaciones entrarán en vigor inmediatamente tras la publicación del documento actualizado.
                    </p>
                </section>

                <section class="legal-section">
                    <h2>9. CANAL CORPORATIVO DE CONTACTO</h2>
                    <p>
                        Si tiene preguntas, inquietudes o solicitudes relacionadas con esta Política de Privacidad, el tratamiento de datos técnicos o el funcionamiento general de la plataforma, puede ponerse en contacto con el equipo de soporte a través de nuestro canal de atención oficial:
                    </p>
                    <p><strong>Correo Electrónico</strong> contacto@pharmatch.info</p>
                    <p><strong>Sitio Web:</strong> <a href="https://pharmatch.info">pharmatch.info</a></p>
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

.update-date {
    font-size: 0.8rem;
    color: var(--color-text-muted);
    padding: 0 16px;
    margin-bottom: 16px;
    line-height: 1.6;
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
}
</style>
