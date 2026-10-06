# MediAhorro — Documentación del Proyecto

## Descripción

**MediAhorro** es una aplicación PWA de comparación de precios de medicamentos. Permite buscar medicamentos por nombre o principio activo, filtrar por dosis, cantidad y farmacia, y agregar productos a una lista de compra persistente.

---

## Stack Tecnológico

| Tecnología | Uso |
|---|---|
| **Vue 3** | Framework principal |
| **Pinia** | Gestión de estado global |
| **TypeScript** | Tipado estático |
| **Supabase** | Base de datos y API (PostgreSQL + REST) |
| **Axios** | Cliente HTTP |
| **Ionic Vue** | Componentes de UI y navegación PWA |
| **Vite** | Bundler y dev server |
| **vite-plugin-pwa** | Service worker, manifest e instalación de la PWA |
| **Tailwind CSS v4** | Reset/preflight global (design tokens en `theme/variables.css`) |

---

## Estructura de Carpetas

```
src/
├── components/
│   ├── features/       # Componentes de funcionalidad principal
│   │   ├── Filters.vue
│   │   ├── Results.vue
│   │   ├── MedicamentosModal.vue
│   │   └── OnboardingModal.vue
│   ├── layout/         # Layout de la aplicación
│   │   ├── TheHeader.vue
│   │   └── TheFooter.vue
│   └── shared/         # Componentes reutilizables
│       └── BaseModal.vue
├── stores/             # Stores de Pinia (estado global)
│   ├── filters.ts
│   ├── cart.ts
│   └── index.ts
├── services/           # Servicios de API
│   ├── apiAxios.ts
│   └── api.ts
├── types/              # Tipos TypeScript
│   ├── MedicamentoPrecioApi.ts
│   └── index.ts
├── data/               # Datos estáticos locales
│   └── medicamentosBase.ts
├── views/              # Vistas de página
│   ├── HomePage.vue
│   ├── TermsPage.vue
│   ├── PrivacyPage.vue
│   └── LegalNoticePage.vue
├── composables/        # Composables reutilizables
│   ├── usePwaInstall.ts
│   └── useOnboarding.ts
├── styles/             # Estilos globales
├── theme/              # Temas y variables CSS
├── router/             # Configuración de enrutamiento
├── App.vue             # Componente raíz
└── main.ts             # Punto de entrada
```

---

## Tipos Principales

Definidos en `src/types/MedicamentoPrecioApi.ts`:

```ts
interface MedicamentoPrecioApi {
    id: number
    medicamento_base_id: string
    farmacia: NombreFarmacia
    nombre_producto_farmacia: string
    principio_activo: string
    dosis: string | string[]       // Puede ser string o array de strings
    laboratorio: string
    es_combo: boolean
    presentacion: string
    cantidad_unidades: number
    forma_farmaceutica: string
    precio_original: number
    moneda: Moneda                  // "Bs" | "REF"
    precio_bs: number
    precio_unitario: number
    precio_normalizado: number
    disponibilidad: boolean
    url_producto: string
    score_similitud: number
    fecha_actualizacion: string
    tiene_componentes_mixtos: boolean
}

interface MedicamentoBase {
    id: string
    patologia: string
    principioActivo: string
    dosis: string[]
    alias?: string[]
    presentacionReferencia: number
}
```

---

## Stores

### `useFiltersStore` (`src/stores/filters.ts`)

Gestiona la búsqueda, filtrado y selección de medicamentos.

**Estado:**
| Ref | Tipo | Descripción |
|---|---|---|
| `searchQuery` | `string` | Texto de búsqueda del usuario |
| `parsedQuery` | `ParsedSearchQuery` | Query parseada con nombre y dosis |
| `selectedPharmacies` | `NombreFarmacia[]` | Farmacias seleccionadas |
| `selectedCondition` | `string \| null` | Patología seleccionada |
| `selectedDosis` | `string[]` | Dosis filtradas seleccionadas |
| `selectedCantidad` | `string` | Rango de cantidad seleccionado |
| `products` | `MedicamentoPrecioApi[]` | Productos obtenidos de la API |
| `isLoading` | `boolean` | Estado de carga |
| `error` | `string \| null` | Error de operación |

**Computed Properties:**

- **`filteredProducts`** — Aplica todos los filtros activos (farmacia, dosis, cantidad, búsqueda) sobre `products`
- **`availableDosis`** — Extrae las dosis individuales únicas de los productos. Excluye dosis de combinación (contienen `/`). Normaliza comas decimales a puntos.
- **`medicamentosSinResultados`** — Medicamentos base que no tienen resultados en la búsqueda actual
- **`medicamentosPorPatologia`** — Medicamentos base filtrados por patología seleccionada

**Funciones:**

| Función | Descripción |
|---|---|
| `loadMedicamentos()` | Obtiene productos desde la API de Supabase |
| `updateSearchQuery(query)` | Actualiza el searchQuery |
| `togglePharmacy(farmacia)` | Agrega o remueve una farmacia del filtro |
| `toggleDosis(dosis)` | Agrega o remueve una dosis del filtro |
| `setCantidadRange(range)` | Establece el rango de cantidad |
| `setCondition(condition)` | Establece la condición patológica |
| `clearFilters()` | Resetea todos los filtros a valores base |
| `openMedicamentosModal(patologia)` | Abre el modal de medicamentos por patología |
| `closeMedicamentosModal()` | Cierra el modal |

**Reglas de filtrado en `filteredProducts`:**

1. **Búsqueda por nombre**: `matchesSearch` filtra por `nombre_producto_farmacia` o `principio_activo`
2. **Búsqueda por dosis en query**: `matchesDoseFromQuery` filtra cuando la query contiene un patrón de dosis (ej. "5mg")
3. **Dosis seleccionadas**: `matchesSelectedDosis` usa match exacto (`===`) — solo se ignoran cuando hay un filtro de dosis en la query de búsqueda
4. **Cantidad**: `matchesCantidad` filtra por rangos (0-10, 10-30, 30-60, 60+)
5. **Farmacia**: `matchesPharmacy` filtra por farmacias seleccionadas

**Normalización de dosis:**

La función `normalizeDosis(d)` reemplaza comas por puntos en los strings de dosis. Esto garantiza que `"6,25mg"` y `"6.25mg"` se traten como el mismo valor en los filtros.

```ts
function normalizeDosis(d: string): string {
    return d.replace(',', '.')
}
```

---

### `useCartStore` (`src/stores/cart.ts`)

Gestiona el carrito de compra ("Mi Lista de Compra").

**Estado:**
| Ref | Tipo | Descripción |
|---|---|---|
| `cartItems` | `MedicamentoPrecioApi[]` | Items en el carrito |
| `isCartModalOpen` | `boolean` | Estado del modal del carrito |
| `isDuplicateModalOpen` | `boolean` | Estado del modal de "medicamento duplicado" |
| `duplicateItemName` | `string` | Nombre del medicamento que intentó agregarse duplicado |

**Computed:**
- **`cartCount`** — Cantidad de items en el carrito

**Funciones:**

| Función | Descripción |
|---|---|
| `addToCart(product)` | Agrega un producto al carrito. Si ya existe otro item con el mismo `nombre_producto_farmacia` **no lo agrega** y abre el modal de duplicado. Persiste en localStorage |
| `removeFromCart(productId)` | Remueve un producto del carrito por ID. Persiste en localStorage |
| `toggleCartModal()` | Abre/cierra el modal del carrito |
| `closeCartModal()` | Cierra el modal |
| `closeDuplicateModal()` | Cierra el modal de medicamento duplicado |
| `syncCartWithProducts(products)` | Valida el carrito contra la lista actual de productos: **descarta** los items cuyo `id` ya no existe (no modifica los items que siguen válidos) |

**Persistencia en localStorage:**

- Clave: `'mediAhorro_cart'`
- El carrito se carga desde `localStorage` al inicializar el store (`loadCartFromStorage`)
- Cada cambio en `cartItems` se guarda automáticamente mediante un `watch` reactivo (`saveCartToStorage`)
- Al cargar la app, `syncCartWithProducts` valida que todos los items del carrito existan aún en la API

---

## Servicios

### `apiAxios` (`src/services/apiAxios.ts`)

Cliente HTTP configurado con Axios para comunicarse con la API de Supabase (`/precios_farmacia`).

**Funciones:**

| Función | Descripción |
|---|---|
| `getMedicamentosAxios(query?)` | Busca medicamentos por nombre o dosis en la API |
| `parseSearchQuery(query)` | Parsea una query de búsqueda, extrayendo nombre y dosis mediante regex |
| `testConnectionAxios()` | Verifica conexión con Supabase |

**Patrones de dosis para parseo:**
- `\d+(?:\.\d+)?\s*UI\s*(?:\/|x)?\s*(?:ml)?$`
- `\d+(?:\.\d+)?\s*mg\/ml$`
- `\d+(?:\.\d+)?\s*mg\d*$`
- `\d+(?:\.\d+)?\s*mcg$`
- `\d+(?:\.\d+)?\s*g$`

---

## Componentes

### `Filters.vue` (`src/components/features/Filters.vue`)

Panel lateral de filtros con:
- **Farmacias**: Checkboxes para Farmatodo, Farmadón, Farmapaz, Farmatina
- **Condición rápida**: Chips para Hipertensión y Diabetes
- **Dosis**: Chips dinámicos basados en `store.availableDosis`
- **Cantidad**: Selector de rangos (Todos, 0-10, 10-30, 30-60, 60+)

### `Results.vue` (`src/components/features/Results.vue`)

Lista de resultados que muestra:
- `store.filteredProducts` — Productos filtrados
- Cada card muestra nombre, laboratorio, presentación, farmacia, precio y disponibilidad
- Botón "Agregar a mi lista" que llama a `cartStore.addToCart(product)`
- El **primer producto** de la lista (la API ordena por `precio_bs.asc`) muestra la etiqueta **"Mejor Precio"** (`v-if="index === 0"`)

### `MedicamentosModal.vue` (`src/components/features/MedicamentosModal.vue`)

Modal que muestra medicamentos base por patología:
- Se abre desde `Filters.vue` al seleccionar una condición
- Muestra `store.medicamentosPorPatologia`
- Al hacer clic en un medicamento, `selectMedicamento(med)` coloca solo el `principioActivo` en el buscador, resetea filtros con `store.clearFilters()`, y cierra el modal
- Los **alias** (marcas comerciales) se renderizan como `<button class="alias-tag">`; al hacer clic, `@click.stop="selectTerm(alias)"` busca el alias en el buscador (mismo flujo: `clearFilters()` → `updateSearchQuery(alias)` → cerrar modal). El `.stop` evita que el clic burbulee a la tarjeta y dispare la búsqueda por principio activo
- Tras iniciar la búsqueda, `scrollToSearchArea()` ubica la pantalla en la sección correspondiente: en **móvil (≤640px)** hace scroll hasta `#filters-section` (la sección de filtros ocupa mucha pantalla) y en **escritorio** hasta `#results-section`. El offset se calcula dinámico con `el.style.scrollMarginTop = header.offsetHeight + 8px` (header fijo `.pwa-header`) y se usa `scrollIntoView({ behavior: "smooth" })`. Aplica tanto al nombre del medicamento como a los alias

### `TheHeader.vue` (`src/components/layout/TheHeader.vue`)

Header fijo de la aplicación (no contiene campo de búsqueda; el buscador vive en `HomePage.vue`):
- Logo "Pharmatch" (navega a `/home`)
- **Botón "📥 Instalar App"** — visible en móvil siempre que la app no esté instalada y en escritorio sólo cuando Chrome la marca como instalable. Abre el diálogo nativo de instalación o, si la API no está disponible, un modal con instrucciones manuales (ver [Instalación de la PWA](#instalación-de-la-pwa))
- Botón "Ver mi lista" con badge de conteo (`cartStore.cartCount`)
- En pantallas ≤640px el botón de instalación pasa a una segunda fila a todo el ancho

### `TheFooter.vue` (`src/components/layout/TheFooter.vue`)

Footer con enlaces legales (términos, privacidad, aviso legal) y navegación a `/home`.

**Visibilidad:** el footer se renderiza solo cuando **ningún modal está activo**. En `App.vue`, el `v-if` evalúa un computado `isAnyModalOpen` que hace OR de:

| Modal | Estado |
|---|---|
| Carrito ("Ver mi lista") | `cartStore.isCartModalOpen` |
| Medicamento duplicado | `cartStore.isDuplicateModalOpen` |
| Medicamentos por patología | `filterStore.isMedicamentosModalOpen` |
| Tutorial / onboarding | `useOnboarding().isOpen` |
| Instalar app | `usePwaInstall().isInstallModalOpen` |

El estado del modal de instalación vive en el composable `usePwaInstall` (ref de módulo `isInstallModalOpen`) para que `TheHeader.vue` (que lo abre) y `App.vue` (que oculta el footer) compartan el mismo estado.

> **Cuidado con los refs de `useOnboarding`:** `isOpen` y `step` son `Ref` de nivel de módulo. Fuera de un template hay que usar `.value` (ej. `onboarding.isOpen.value` en el computado de `App.vue`). Escribir `onboarding.isOpen` sin `.value` en `<script>` devuelve el objeto Ref (siempre truthy) y el footer nunca se renderizaría.

### `BaseModal.vue` (`src/components/shared/BaseModal.vue`)

Modal reutilizable con slots (`header`/default), props `modelValue`, `title`, `subtitle` y evento `close`. **Nota**: sólo emite `close`, no `update:modelValue` — usar `:modelValue` + `@close` en vez de `v-model`.

### `OnboardingModal.vue` (`src/components/features/OnboardingModal.vue`)

Modal de bienvenida multipaso que enseña el flujo completo de consulta de medicamentos. Reutiliza `BaseModal` (slot `header`/default; la navegación vive en el slot default porque `BaseModal` no tiene slot `footer`).

**Pasos (6):**

| # | Icono | Título | Contenido |
|---|---|---|---|
| 1 | 💊 | Compara precios de tu medicamento | Farmacias (Farmatodo, Farmadón, Farmapaz, Farmatina) y precios en Bs |
| 2 | 🔍 | Busca tu medicamento | Placeholder `Buscar medicamento (ej. Losartán 50mg)...`, búsqueda automática sin Enter, dosis en la query, botón ✕ |
| 3 | 🎛️ | Afina con filtros | Farmacias, Condición rápida (chips de patología), Dosis, Cantidad, botón Ocultar/Mostrar filtros |
| 4 | 🏷️ | Entiende los resultados | Etiqueta "Mejor Precio" en la primera tarjeta, laboratorio • presentación, Bs y REF, "Disponible", "Agregar a mi lista" |
| 5 | 🛒 | Arma tu lista de compra | "Ver mi lista", "Total para compra", "Ir a Farmacia", deduplicación |
| 6 | 📲 | Úsala como app | Botón "📥 Instalar App", pasos iOS/Android, persistencia en el dispositivo |

**Navegación:** "Saltar" (izquierda), puntos de progreso, "Atrás" (desde el paso 2) y "Siguiente" → "Empezar" en el último paso. Cerrar con ✕ o tocando el fondo equivale a Saltar (ambas opciones marcan el onboarding como visto).

**Íconos:** se usan **emoji** (no Material Symbols) porque la fuente de íconos no está cargada en el proyecto.

---

## Composable: `useOnboarding` (`src/composables/useOnboarding.ts`)

Singleton con estado a nivel de módulo (patrón `usePwaInstall`):

| Elemento | Descripción |
|---|---|
| `isOpen` | Estado de visibilidad del modal |
| `step` | Paso actual (0-based) |
| `steps` | Array de 6 `OnboardingStep` (`icon`, `title`, `text`, `bullets?`) |
| `hasSeenOnboarding()` | `true` si `localStorage['mediAhorro_onboarding_v1'] === "done"` (o si no hay `window`) |
| `open()` | Reinicia `step` a 0 y abre el modal |
| `close()` | Cierra el modal y marca el onboarding como visto |
| `next()` | Avanza un paso; en el último paso llama a `close()` |
| `prev()` | Retrocede un paso (no baja de 0) |

**Disparador:** en `HomePage.vue`, dentro de `onMounted`, después de `await store.loadMedicamentos()` y `cartStore.syncCartWithProducts(...)`, si `!onboarding.hasSeenOnboarding()` se abre el modal tras un `setTimeout` de 400 ms (deja asentarse el layout).

**Reapertura:** el header (`TheHeader.vue`) incluye un botón **"?"** (`aria-label="Cómo usar"`) que cierra el carrito y el modal de patología (si están abiertos) y llama a `onboarding.open()`. Permite volver a ver el tutorial en cualquier momento aunque ya se haya completado.

**Persistencia:** clave `mediAhorro_onboarding_v1` en `localStorage`, valor `"done"`. Se marca en cualquier salida del modal (Empezar, Saltar o ✕).

---

## Instalación de la PWA

La app puede instalarse desde el navegador (Android/Chrome, escritorio) o añadirse a la pantalla de inicio (iOS/Safari).

### Manifest (`vite.config.ts`)

Configurado con `vite-plugin-pwa`:

- `name` / `short_name`: **"Pharmatch"**, `description`, `theme_color: "#0ea5e9"`
- **Iconos**: `/logo_pharmat.svg` declarado como `192x192` y `512x512` (`image/svg+xml`) — Chrome exige iconos de ambos tamaños para considerar la app instalable
- `start_url: "/"`, `display: "standalone"`, `scope: "/"` y `background_color`: valores por defecto que inyecta el plugin
- Service worker: `registerType: "autoUpdate"`, `navigateFallback: "/index.html"` (handler `fetch` de Workbox)

### `index.html`

- `<link rel="apple-touch-icon" href="/logo_pharmat.svg">` — iOS ignora los SVG para touch icons y usa un screenshot de la página como fallback

### Composable: `usePwaInstall` (`src/composables/usePwaInstall.ts`)

Singleton con listeners registrados a nivel de módulo (se registran al importar, antes de que el navegador emita el evento):

| Elemento | Descripción |
|---|---|
| `beforeinstallprompt` | Hace `preventDefault()`, guarda el evento en `deferredPrompt` y activa `canInstall` |
| `appinstalled` | Marca `isInstalled` y oculta el botón |
| `display-mode: standalone` | Si la app se abre como instalada, oculta el botón |
| `isIOS` | UA (`iPad\|iPhone\|iPod`) o iPadOS (`MacIntel` + `maxTouchPoints > 1`) |
| `isAndroid` | UA (`/Android/i`) |
| `isInstalled` | `navigator.standalone` (iOS) o `display-mode: standalone` (Chromium) |
| `showInstallButton()` | `false` si está instalada; `true` siempre en iOS/Android; en escritorio sólo si `canInstall` |
| `installApp()` | Con `deferredPrompt` → `prompt()` nativo (`"native"`); sin él en móvil → `"instructions"`; sin él en escritorio → `"none"` |
| `isInstallModalOpen` | Ref de módulo que controla la visibilidad del modal de instrucciones de instalación (`"instructions"`). Compartido entre `TheHeader.vue` y `App.vue` (usa el footer). |

### UI en `TheHeader.vue`

- Botón **"📥 Instalar App"** con `v-if="showInstallButton()"`
- Al clicar, `installApp()` decide:
  - `"native"` → diálogo nativo de Chrome
  - `"instructions"` → abre `BaseModal` con pasos manuales:
    - **iOS**: Compartir (cuadrado con ↑) → "Añadir a pantalla de inicio" → "Añadir"
    - **Android**: menú **⋮** → "Instalar aplicación" / "Añadir a pantalla de inicio" → "Instalar"

### Requisitos de instalabilidad (Chrome)

1. **Contexto seguro**: HTTPS o `localhost` — un `http://192.168.x.x` desde la LAN **no** cuenta: sin contexto seguro Chrome no registra el SW ni emite `beforeinstallprompt`
2. Manifest válido: nombre, `start_url`, `display` e iconos 192 + 512
3. Service worker registrado con handler `fetch`
4. Chrome puede no reemitir `beforeinstallprompt` tras un rechazo previo (cooldown) — en móvil el botón sigue visible y muestra instrucciones manuales

### Cómo probar en un móvil (dev)

**Port-forwarding con DevTools:**

1. PC: `pnpm dev` corriendo → Chrome → `chrome://inspect` → pestaña *Port forwarding* → *Add port forwarding*: puerto `5173` → origen `localhost:5173` (habilitado)
2. Teléfono (con depuración USB activa, conectado al PC): abrir `http://localhost:5173` en Chrome
3. Resultado: `localhost` es contexto seguro → SW + `beforeinstallprompt` activos → tocar el botón → diálogo nativo → instalada → el botón desaparece

**Con `http://192.168.x.x:5173` (inseguro):** el botón se ve igual, pero al tocarlo abre el modal de instrucciones — Chrome no ofrecerá instalación nativa.

---

## Flujo de Usuario

### 1. Carga Inicial
```
onMounted → loadMedicamentos() → productos desde API
                         → loadCartFromStorage() → restaurar carrito desde localStorage
                         → syncCartWithProducts() → validar y sincronizar carrito
```

### 2. Búsqueda de Medicamento por Patología
```
Usuario hace clic en "Hipertensión" (chip)
  → handleConditionClick('hipertension')
    → store.setCondition('hipertension')
    → store.openMedicamentosModal('Hipertensión')
      → MedicamentosModal muestra medicamentos base de Hipertensión
        → Usuario hace clic en un medicamento
          → selectMedicamento(med) / selectTerm(alias)
            → store.clearFilters()  (resetea dosis, cantidad, farmacias)
            → store.updateSearchQuery(med.principioActivo o alias)
            → store.closeMedicamentosModal()
            → scrollToSearchArea()  (móvil: #filters-section · escritorio: #results-section)
              → Results muestra productos del principio activo
```

### 3. Búsqueda Directa
```
Usuario escribe en el buscador (ej. "Losartán 50mg")
  → parseSearchQuery() extrae nombre="Losartán" y dosis="50mg"
  → getMedicamentosAxios() filtra por nombre y dosis en la API
  → Results muestra productos filtrados
```

### 4. Filtrado por Dosis
```
Usuario hace clic en chip "5mg"
  → store.toggleDosis('5mg')
  → selectedDosis se actualiza
  → filteredProducts re-computa con match exacto
  → Solo productos con dosis "5mg" aparecen en resultados
```

### 5. Agregar al Carrito
```
Usuario hace clic en "Agregar a mi lista" en Results.vue
  → cartStore.addToCart(product)
    → ¿Ya existe un item con el mismo nombre_producto_farmacia?
      → Sí: NO agrega → isDuplicateModalOpen = true
            → App muestra el modal "Medicamento duplicado"
              → "Entendido" → closeDuplicateModal()
      → No: Agrega al carrito → saveCartToStorage() → localStorage
```

### 6. Instalación de la App
```
Usuario hace clic en "📥 Instalar App" (TheHeader)
  → installApp() (usePwaInstall)
    → hay deferredPrompt (entorno seguro)
      → prompt() → diálogo nativo de Chrome
        → accepted → appinstalled → botón se oculta
        → dismissed → se limpia deferredPrompt; en móvil un nuevo clic
                      abre el modal de instrucciones
    → sin deferredPrompt (iOS o Android)
      → BaseModal con instrucciones manuales
```

### 7. Onboarding de Bienvenida
```
onMounted (HomePage) → loadMedicamentos() + syncCartWithProducts()
  → ¿hasSeenOnboarding()?  (localStorage 'mediAhorro_onboarding_v1')
    → No: setTimeout(400ms) → onboarding.open() → OnboardingModal (6 pasos)
         → Saltar / ✕ / "Empezar" → close() → marca 'done' en localStorage
    → Sí: no se muestra
Reapertura: header botón "?" → cierra carrito/patología → onboarding.open()
```

---

## Normalización de Dosis

Las dosis pueden venir en diferentes formatos del backend (ej. `6.25mg` vs `6,25mg`). El sistema normaliza:

1. **`normalizeDosis(d)`**: Reemplaza `,` por `.` en strings de dosis
2. **`availableDosis`**: Normaliza cada dosis antes de agregar al Set → `"6,25mg"` y `"6.25mg"` se fusionan en un solo valor
3. **`filteredProducts`**: Normaliza las dosis de productos y del usuario antes de comparar → match exacto funciona correctamente
4. Dosis de combinación (con `/` como `"2.5mg/50mg"`) se excluyen del filtro de dosis disponibles

---

## Persistencia de Datos

### LocalStorage

- **Clave**: `'mediAhorro_cart'`
- **Formato**: JSON string de `MedicamentoPrecioApi[]`
- **Ciclo de vida**:
  - Al iniciar: `loadCartFromStorage()` parsea el JSON y restaura `cartItems`
  - En cada cambio: `watch(cartItems, saveCartToStorage, { deep: true })` guarda automáticamente
  - Al cargar productos: `syncCartWithProducts(products)` valida y descarta items obsoletos

### Validación de Carta

`syncCartWithProducts` compara los IDs del carrito contra los IDs de los productos actuales de la API. Si un producto fue eliminado o ya no está disponible, se elimina del carrito.

---

## Configuración de Entorno

Variables de entorno requeridas en `.env`:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key
```

---

## Comandos de Desarrollo

```bash
# Instalar dependencias
pnpm install

# Servidor de desarrollo
pnpm dev

# Build de producción
pnpm build

# Vista previa del build
pnpm preview

# Type check (incluye archivos .vue)
pnpm exec vue-tsc --noEmit
```

> No hay script de lint: ESLint/Prettier no están instalados en el proyecto.

---

## Notas de Implementación

- **Filtrado de dosis**: Utiliza match exacto (`===`) en lugar de `.includes()` para evitar coincidencias parciales entre dosis simples y combinaciones
- **Desacoplamiento de búsqueda y dosis**: Cuando el usuario busca por nombre de medicamento, el filtro de dosis se ignora automáticamente (`doseStr.length > 0` como condición de bypass)
- **Dosis de combinación**: Se excluyen de `availableDosis` para evitar que arrays de medicamentos aparezcan en el filtro
- **Deduplicación en carrito**: Se verifica por `nombre_producto_farmacia` (no por `id` ni por `laboratorio`), para evitar que el mismo medicamento aparezca dos veces en la lista. Si se detecta el duplicado no se agrega y se muestra el modal "Medicamento duplicado"
- **Offset dinámico del header (HomePage)**: el header `.pwa-header` es `position: fixed` y en móviles es más alto (logo + fila de instalación). En vez de un `padding-top` fijo, `HomePage.vue` mide `header.offsetHeight + 12` y lo aplica a `.content-spacer` mediante la CSS var `--header-h` (fallback `125px`). La medición se actualiza con `ResizeObserver` sobre el header y con `resize`/`orientationchange` de la ventana — cubre también el caso en que el botón "📥 Instalar App" aparece/desaparece tras montar. Patrón análogo al `scrollMarginTop` de `MedicamentosModal.vue`
- **Logo compacto en móvil**: en `TheHeader.vue`, `@media (max-width: 640px)` reduce `.brand-logo` de `100px` a `56px` de alto para que el header no ocupe media pantalla en teléfonos y no desborde las acciones (logo + "?" + "Ver mi lista")
- **Tasa REF (`refRate`)**: el backend (farma-scrapper) solo persiste `tasa_bcv_usd` en filas con `moneda === "REF"` (~20% de los productos); el resto queda en `null`. En el store, `refRate` hace fallback a `knownRefRate` (última tasa vista en cualquier carga/búsqueda, actualizada por un `watch` sobre `products`), de modo que el precio REF siga visible en tarjetas y carrito aunque el resultado actual no traiga filas REF. El `Ref` del total del carrito tiene `v-if="store.refRate"` para no mostrar Infinity/NaN cuando no hay tasa conocida
