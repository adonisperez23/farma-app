export interface ArticleSection {
    heading?: string;
    paragraphs?: string[];
    list?: string[];
}

export interface Article {
    slug: string;
    title: string;
    excerpt: string;
    sections: ArticleSection[];
}

export const articles: Article[] = [
    {
        slug: "medicamentos-genericos",
        title: "¿Qué es un medicamento genérico y cuándo conviene comprarlo?",
        excerpt:
            "Los genéricos contienen el mismo principio activo que el de marca, suelen costar mucho menos y deben cumplir los mismos estándares de calidad. Te explicamos cómo identificarlos y qué revisar antes de comprar.",
        sections: [
            {
                paragraphs: [
                    "Un medicamento genérico es una copia farmacéutica del medicamento original (llamado de marca o innovador). Contiene exactamente el mismo principio activo, en la misma cantidad y con la misma forma farmacéutica: comprimidos, cápsulas, jarabe, inyectable, entre otras. La principal diferencia con el de marca suele ser el nombre comercial y, sobre todo, el precio.",
                    "Los laboratorios que fabrican genéricos no tienen que repetir las pruebas clínicas originales del medicamento innovador; en su lugar, demuestran mediante estudios de bioequivalencia que su producto libera el principio activo en el organismo de forma comparable al de marca. Por eso un genérico aprobado se considera terapéuticamente equivalente.",
                ],
            },
            {
                heading: "¿Por qué son más baratos?",
                paragraphs: [
                    "El laboratorio que lanzó el medicamento original invirtió años y millones de dólares en investigación, ensayos clínicos y registro. Cuando esa protección expira, cualquier laboratorio autorizado puede fabricar el mismo principio activo sin asumir ese costo de desarrollo. Esa es la razón principal por la que un genérico puede costar entre un 30 % y un 80 % menos que el de marca.",
                ],
            },
            {
                heading: "Qué revisar antes de comprar",
                list: [
                    "Principio activo: debe coincidir exactamente con el de tu receta.",
                    "Dosis o concentración: por ejemplo, 50 mg frente a 100 mg no son intercambiables.",
                    "Presentación: comprimidos recubiertos, de liberación prolongada o jarabe no son equivalentes entre sí.",
                    "Registro sanitario: en Venezuela, verifica que el producto cuente con el registro del organismo competente.",
                    "Vencimiento y sello de la farmacia: vigila siempre la fecha de caducidad al recibir el producto.",
                ],
            },
            {
                heading: "Cuándo no intercambiar por tu cuenta",
                paragraphs: [
                    "Existen medicamentos de margen terapéutico estrecho (por ejemplo, algunos anticonvulsivantes, anticoagulantes o medicamentos tiroides) donde pequeñas diferencias en la absorción sí pueden afectar el control de la enfermedad. En esos casos, siempre consulta con tu médico o farmacéutico antes de sustituir el producto de marca por un genérico o viceversa.",
                    "Pharmatch es un comparador de precios: mostramos las opciones disponibles en las farmacias para que compares, pero la decisión de qué marca o laboratorio comprar debe validarse con un profesional de la salud.",
                ],
            },
        ],
    },
    {
        slug: "principio-activo-vs-marca",
        title: "Principio activo vs. nombre de marca: cómo buscar correctamente",
        excerpt:
            "Buscar por principio activo te permite comparar todas las marcas que contienen el mismo componente y encontrar el mejor precio. Aprende a hacerlo en el buscador de Pharmatch.",
        sections: [
            {
                paragraphs: [
                    "Cada medicamento tiene un nombre comercial (la marca con la que lo conoce el público) y un principio activo (el compuesto químico que produce el efecto terapéutico). Por ejemplo, el paracetamol es un principio activo presente en marcas como Tylenol o Panadol, y el losartán es el principio activo de medicamentos para la hipertensión comercializados bajo distintos nombres.",
                    "Cuando buscas solo por nombre de marca, te limitas a un solo producto. Cuando buscas por principio activo, el comparador te muestra todas las marcas y presentaciones que contienen ese mismo compuesto, ordenadas por precio.",
                ],
            },
            {
                heading: "Cómo hacer la búsqueda",
                list: [
                    "Por nombre de marca: escribe 'Tylenol' si ya sabes qué producto quieres.",
                    "Por principio activo: escribe 'paracetamol' para ver todas las opciones disponibles.",
                    "Con dosis: escribe 'losartán 50mg' y el buscador separa automáticamente el nombre de la dosis y filtra los resultados que coincidan.",
                    "Con principio activo y dosis: escribe 'ibuprofeno 400' para ver únicamente las presentaciones de 400 mg.",
                ],
            },
            {
                heading: "El filtro de dosis hace el trabajo por ti",
                paragraphs: [
                    "Después de una búsqueda, Pharmatch detecta las dosis disponibles para ese medicamento y te muestra chips de filtro. Si solo existe una dosis, el filtro se selecciona automáticamente. Puedes combinarlo con el filtro de cantidad de comprimidos para comparar presentaciones similares: por ejemplo, dos cajas de 30 comprimidos frente a una de 60.",
                ],
            },
            {
                heading: "Consejo final",
                paragraphs: [
                    "La combinación más efectiva es buscar por principio activo, filtrar por la dosis de tu receta y comparar el precio por farmacia. Así descubres rápidamente si el mismo medicamento está más barato en otra cadena y cuánto puedes ahorrar en total antes de salir.",
                ],
            },
        ],
    },
    {
        slug: "comparar-precios-bs-usd",
        title: "Cómo comparar precios en bolívares y dólares en Venezuela",
        excerpt:
            "Pharmatch muestra los precios en bolívares y, cuando hay tasa disponible, su equivalente en dólares (REF). Te explicamos cómo interpretar ambos valores y tomar mejores decisiones de compra.",
        sections: [
            {
                paragraphs: [
                    "En Venezuela es común que los precios de medicamentos se muevan con la tasa del dólar. Por eso, además del precio en bolívares, Pharmatch muestra cuando es posible el valor equivalente en dólares (etiquetado como REF), utilizando la tasa de referencia del Banco Central de Venezuela (BCV) registrada al momento de la actualización de los datos.",
                ],
            },
            {
                heading: "Qué significa cada número",
                list: [
                    "Precio en Bs: el monto en bolívares que pagarías en la farmacia según el último dato recopilado.",
                    "REF (USD): el precio en bolívares dividido entre la tasa BCV conocida; te sirve para comparar con el dólar.",
                    "Total de tu lista: la suma en bolívares de todos los medicamentos que agregaste, con su equivalente REF debajo.",
                ],
            },
            {
                heading: "Por qué comparar en USD ayuda",
                paragraphs: [
                    "Cuando la tasa cambia con rapidez, el precio en bolívares de un mismo medicamento puede variar de un día para otro sin que el valor real del producto cambie. Expresarlo en dólares te da una referencia más estable para decidir si conviene comprar hoy o esperar, y para comparar entre farmacias que actualizan sus precios en momentos distintos.",
                ],
            },
            {
                heading: "Limitaciones a tener en cuenta",
                paragraphs: [
                    "La tasa REF es informativa. Pharmatch actualiza los precios una vez al día y no controla promociones, costos de envío ni disponibilidad en tiempo real. Antes de comprar, confirma el precio final directamente en la farmacia o en su plataforma oficial, a la que llegas desde el botón 'Ir a la farmacia'.",
                ],
            },
        ],
    },
    {
        slug: "filtros-dosis-cantidad",
        title: "Guía de filtros: dosis, cantidad de comprimidos y farmacias",
        excerpt:
            "Los filtros de Pharmatch están diseñados para que encuentres exactamente la presentación de tu receta. Aquí te explicamos cómo usarlos de forma efectiva.",
        sections: [
            {
                heading: "Filtro de farmacias",
                paragraphs: [
                    "Al inicio de la página puedes elegir qué farmacias quieres comparar: Farmatodo, Farmadón, Farmapaz y Farmatina. Si desmarcas algunas, los resultados se reducen a las que te interesan. Si quieres ver todas, simplemente marca las cuatro.",
                ],
            },
            {
                heading: "Condición rápida",
                paragraphs: [
                    "Los chips de 'Condición rápida' agrupan medicamentos por patología frecuente: hipertensión, diabetes, colesterol, gastritis, alergias, salud mental, entre otras. Al tocar un chip se abre una lista con los medicamentos asociados a esa condición, lo que te ayuda a explorar opciones aunque no recuerdes el nombre exacto del producto.",
                ],
            },
            {
                heading: "Filtro de dosis",
                paragraphs: [
                    "Cuando escribes un medicamento en el buscador, Pharmatch detecta las dosis disponibles (por ejemplo, 25 mg, 50 mg y 100 mg) y muestra chips para filtrar. Esto evita comparar presentaciones que no corresponden a tu receta y te ahorra tiempo descartando resultados irrelevantes.",
                ],
            },
            {
                heading: "Filtro de cantidad de comprimidos",
                paragraphs: [
                    "El selector de cantidad permite restringir los resultados a cajas con menos de 10, entre 10 y 30, entre 30 y 60 o más de 60 comprimidos. Es útil cuando el médico indica una duración del tratamiento y necesitas calcular cuántas cajas comprar para ese periodo.",
                ],
            },
            {
                heading: "Limpiar filtros",
                paragraphs: [
                    "Si acumulaste demasiados filtros y los resultados se vuelven vacíos, usa el botón de limpiar búsqueda para empezar de nuevo con una consulta en blanco.",
                ],
            },
        ],
    },
    {
        slug: "lista-de-compra",
        title: "Cómo armar tu lista de compra y calcular el total antes de ir",
        excerpt:
            "Agrega medicamentos de distintas farmacias a tu lista, revisa el total en bolívares y dólares, y llega a la farmacia con todo decidido.",
        sections: [
            {
                paragraphs: [
                    "Una de las funciones más prácticas de Pharmatch es la lista de compra. Permite reunir en un solo lugar todos los medicamentos que necesitas, incluso si están en farmacias distintas, y ver el gasto total antes de salir de casa.",
                ],
            },
            {
                heading: "Agregar productos",
                paragraphs: [
                    "En cada tarjeta de resultado aparece el botón 'Agregar a mi lista'. Al tocarlo, el medicamento se suma a tu lista junto con la farmacia del resultado. Si intentas agregar el mismo producto dos veces, la app te avisa para evitar duplicados en el cálculo del total.",
                ],
            },
            {
                heading: "Revisar el total",
                paragraphs: [
                    "El botón 'Ver mi lista' en la parte superior abre el resumen con todos los productos elegidos. Al final verás el total en bolívares y, cuando hay tasa disponible, su equivalente en dólares (REF). Este cálculo te permite definir cuánto llevar y decidir si conviene priorizar algunos medicamentos según tu presupuesto.",
                ],
            },
            {
                heading: "Ir a la farmacia",
                list: [
                    "Cada producto de la lista incluye un enlace 'Ir a Farmacia' que te lleva a la ficha oficial del producto en la web o app de la farmacia.",
                    "Desde ahí puedes verificar el precio vigente, el stock y realizar la compra según el procedimiento de cada cadena.",
                    "Pharmatch no procesa pagos ni despachos: solo te conecta con la farmacia oficial.",
                ],
            },
            {
                heading: "Tu lista es privada",
                paragraphs: [
                    "Los elementos de tu lista se guardan en tu dispositivo (almacenamiento local del navegador). No requieren cuenta ni se envían a nuestros servidores, por lo que puedes usarla con confidencialidad en tu teléfono o computadora.",
                ],
            },
        ],
    },
    {
        slug: "hipertension-comparar",
        title: "Medicamentos para hipertensión: cómo compararlos con criterio",
        excerpt:
            "Los medicamentos antihipertensivos son de los más buscados en Venezuela. Aprende a comparar por principio activo, dosis y presentación sin caer en errores comunes.",
        sections: [
            {
                paragraphs: [
                    "La hipertensión arterial es una de las condiciones crónicas más frecuentes y sus tratamientos suelen ser de uso prolongado, por lo que comparar precios de forma constante se traduce en ahorro significativo durante el año.",
                ],
            },
            {
                heading: "Principios activos más comunes",
                paragraphs: [
                    "Entre los antihipertensivos más utilizados están losartán, amlodipino, enalapril, hidroclorotiazida, atenolol y valsartán. Muchos pacientes toman una combinación de dos principios activos; en el buscador de Pharmatch puedes consultar cada uno por separado y sumar ambos a tu lista de compra.",
                ],
            },
            {
                heading: "Errores comunes al comparar",
                list: [
                    "Comparar 50 mg contra 100 mg sin darse cuenta: usa el filtro de dosis para evitarlo.",
                    "Comparar cajas de 30 comprimidos contra de 60 sin mirar el precio unitario: el filtro de cantidad ayuda a homogenizar la comparación.",
                    "Asumir que la marca más cara es mejor: los genéricos aprobados contienen el mismo principio activo.",
                    "Olvidar la presentación de liberación prolongada (LP): no es intercambiable con la de liberación inmediata.",
                ],
            },
            {
                heading: "Consejo de uso responsable",
                paragraphs: [
                    "Nunca cambies la dosis ni el principio activo de tu tratamiento por tu cuenta basándote en el precio. Usa Pharmatch para identificar dónde está más barato el medicamento que te recetó tu médico, y consulta con el profesional de salud ante cualquier duda de sustitución.",
                ],
            },
        ],
    },
    {
        slug: "actualizacion-precios",
        title: "¿Con qué frecuencia se actualizan los precios de Pharmatch?",
        excerpt:
            "Los datos de precios y disponibilidad se recopilan diariamente de forma automatizada. Entiende el proceso y cómo verificar el precio vigente en la farmacia.",
        sections: [
            {
                paragraphs: [
                    "Pharmatch funciona mediante procesos automatizados que recopilan periódicamente los precios publicados en los catálogos y páginas oficiales de las farmacias participantes. La base de datos se actualiza aproximadamente una vez al día, por lo que los precios que ves reflejan la situación del mercado en las últimas 24 horas.",
                ],
            },
            {
                heading: "Qué implica la actualización diaria",
                list: [
                    "Los precios se ordenan de menor a mayor en cada búsqueda, así que el resultado 'Mejor Precio' refleja el dato más reciente disponible.",
                    "La disponibilidad (indicada con el punto verde 'Disponible') proviene de la última inspección del catálogo.",
                    "La tasa REF se mantiene con la última tasa BCV conocida registrada en el sistema.",
                ],
            },
            {
                heading: "Por qué puede haber diferencias",
                paragraphs: [
                    "El comercio farmacéutico es dinámico: promociones, agotamientos de stock y ajustes de precio pueden ocurrir en cualquier momento del día. Por ese motivo, siempre recomendamos verificar el precio y la disponibilidad directamente en la farmacia de destino antes de realizar la compra; el botón 'Ir a la farmacia' de cada tarjeta te lleva al sitio oficial correspondiente.",
                ],
            },
            {
                heading: "Encontraste un precio desactualizado?",
                paragraphs: [
                    "Si detectas una diferencia importante entre lo mostrado en Pharmatch y el precio real de una farmacia, escríbenos a contacto@pharmatch.info con el nombre del producto y la farmacia. Revisamos el caso y lo corregimos en la siguiente actualización de datos.",
                ],
            },
        ],
    },
];

export function getArticleBySlug(slug: string): Article | undefined {
    return articles.find((a) => a.slug === slug);
}
