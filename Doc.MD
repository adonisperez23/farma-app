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

---

## Estructura de Carpetas

```
src/
├── components/
│   ├── features/       # Componentes de funcionalidad principal
│   │   ├── Filters.vue
│   │   ├── Results.vue
│   │   └── MedicamentosModal.vue
│   ├── layout/         # Layout de la aplicación
│   │   └── TheHeader.vue
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
│   └── MedicamentoPrecioApi.ts
├── data/               # Datos estáticos locales
│   └── medicamentosBase.ts
├── views/              # Vistas de página
│   └── HomePage.vue
├── composables/        # Composables reutilizables
│   └── useScrollDirection.ts
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

**Computed:**
- **`cartCount`** — Cantidad de items en el carrito

**Funciones:**

| Función | Descripción |
|---|---|
| `addToCart(product)` | Agrega un producto al carrito (sin duplicados por laboratorio). Persiste en localStorage |
| `removeFromCart(productId)` | Remueve un producto del carrito por ID. Persiste en localStorage |
| `toggleCartModal()` | Abre/cierra el modal del carrito |
| `closeCartModal()` | Cierra el modal |
| `syncCartWithProducts(products)` | Valida el carrito contra la lista actual de productos. Descarta productos que ya no existen en la API y actualiza los que sí |

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
- Productos con `score_similitud >= 90` se marcan como "Mejor Precio"

### `MedicamentosModal.vue` (`src/components/features/MedicamentosModal.vue`)

Modal que muestra medicamentos base por patología:
- Se abre desde `Filters.vue` al seleccionar una condición
- Muestra `store.medicamentosPorPatologia`
- Al hacer clic en un medicamento, `selectMedicamento(med)` coloca solo el `principioActivo` en el buscador, resetea filtros con `store.clearFilters()`, y cierra el modal

### `TheHeader.vue` (`src/components/layout/TheHeader.vue`)

Header fijo con:
- Logo "PharMatch"
- Campo de búsqueda enlazado a `store.searchQuery`
- Botón "Ver mi lista" con badge de conteo (`cartStore.cartCount`)

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
          → selectMedicamento(med)
            → store.clearFilters()  (resetea dosis, cantidad, farmacias)
            → store.updateSearchQuery(med.principioActivo)
            → store.closeMedicamentosModal()
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
    → Verifica duplicado por laboratorio
    → Agrega al carrito
    → saveCartToStorage() → localStorage
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

# Type check
npx tsc --noEmit

# Lint
pnpm lint
```

---

## Notas de Implementación

- **Filtrado de dosis**: Utiliza match exacto (`===`) en lugar de `.includes()` para evitar coincidencias parciales entre dosis simples y combinaciones
- **Desacoplamiento de búsqueda y dosis**: Cuando el usuario busca por nombre de medicamento, el filtro de dosis se ignora automáticamente (`doseStr.length > 0` como condición de bypass)
- **Dosis de combinación**: Se excluyen de `availableDosis` para evitar que arrays de medicamentos aparezcan en el filtro
- **Deduplicación en carrito**: Se verifica por `laboratorio`, no por `id`, para evitar agregar el mismo laboratorio dos veces
