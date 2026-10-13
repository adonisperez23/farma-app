<script setup lang="ts">
import { computed, ref, watch, nextTick } from "vue";
import { useFiltersStore, useCartStore } from "@/stores";
const store = useFiltersStore();
const cartStore = useCartStore();

const PAGE_SIZE = 10;
const currentPage = ref(1);

const totalItems = computed(() => store.filteredProducts.length);
const totalPages = computed(() =>
    Math.max(1, Math.ceil(totalItems.value / PAGE_SIZE)),
);
const pageStart = computed(() => (currentPage.value - 1) * PAGE_SIZE);
const pageEnd = computed(() =>
    Math.min(pageStart.value + PAGE_SIZE, totalItems.value),
);
const pagedProducts = computed(() =>
    store.filteredProducts.slice(pageStart.value, pageEnd.value),
);

const visiblePages = computed(() => {
    const total = totalPages.value;
    const current = currentPage.value;
    const maxVisible = 5;
    let start = Math.max(1, current - Math.floor(maxVisible / 2));
    let end = Math.min(total, start + maxVisible - 1);
    start = Math.max(1, end - maxVisible + 1);
    const pages: (number | "…")[] = [];
    if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push("…");
    }
    for (let p = start; p <= end; p++) pages.push(p);
    if (end < total) {
        if (end < total - 1) pages.push("…");
        pages.push(total);
    }
    return pages;
});

watch(
    () => store.searchQuery,
    () => {
        currentPage.value = 1;
    },
);

watch(
    () => [
        store.selectedDosis.slice(),
        store.selectedCantidad,
        store.selectedPharmacies.slice(),
    ],
    () => {
        currentPage.value = 1;
    },
);

watch(totalPages, (total) => {
    if (currentPage.value > total) currentPage.value = total;
});

async function goToPage(page: number) {
    const target = Math.min(Math.max(1, page), totalPages.value);
    if (target === currentPage.value) return;
    currentPage.value = target;
    await nextTick();
    scrollToResults();
}

function scrollToResults() {
    const el = document.getElementById("results-section");
    if (!el) return;
    const header = document.querySelector<HTMLElement>(".pwa-header");
    el.style.scrollMarginTop = `${(header?.offsetHeight ?? 0) + 8}px`;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const featuredProducts = computed(() =>
    store.products
        .filter((p) => p.disponibilidad)
        .slice(0, 10),
);
</script>

<template>
    <main
        v-if="store.searchQuery.length > 0"
        id="results-section"
        class="results-container"
    >
        <div class="results-header">
            <h2 class="results-title">
                Resultados para "<span class="search-term">{{
                    store.searchQuery
                }}</span
                >"
            </h2>
        </div>

        <h2 v-if="store.filteredProducts.length === 0" class="results-title">
            No hay medicamentos disponibles con este nombre
        </h2>

        <article
            v-for="(product, index) in pagedProducts"
            :key="product.id"
            class="product-card"
        >
            <div v-if="currentPage === 1 && index === 0" class="card-tag">
                <span>Mejor Precio</span>
            </div>
            <div class="card-content">
                <div class="product-info">
                    <h3 class="product-title">
                        {{ product.nombre_producto_farmacia }}
                    </h3>
                    <p class="product-subtitle">
                        {{ product.laboratorio }} • {{ product.presentacion }}
                    </p>
                    <div class="pharmacy-badge">
                        <span class="pharmacy-name">{{
                            product.farmacia
                        }}</span>
                    </div>
                </div>
                <div class="product-pricing">
                    <div class="price-amount">
                        <div>
                            {{ product.precio_bs.toFixed(2) }}
                        </div>
                        <div>Bs</div>
                    </div>
                    <div v-if="store.refRate" class="price-usd">
                        <div>REF</div>
                        <div>
                            {{ (product.precio_bs / store.refRate).toFixed(2) }}
                        </div>
                    </div>
                    <span
                        class="stock-status in-stock"
                        v-if="product.disponibilidad"
                    >
                        <span class="status-dot"></span> Disponible
                    </span>
                </div>
            </div>
            <button class="btn-add-cart" @click="cartStore.addToCart(product)">
                <span>Agregar a mi lista</span>
            </button>
        </article>

        <nav
            v-if="totalPages > 1"
            class="pagination"
            aria-label="Paginación de resultados"
        >
            <p class="pagination-info">
                Mostrando {{ pageStart + 1 }}–{{ pageEnd }} de
                {{ totalItems }} resultados
            </p>
            <div class="pagination-controls">
                <button
                    class="page-btn page-nav-btn"
                    :disabled="currentPage === 1"
                    aria-label="Página anterior"
                    @click="goToPage(currentPage - 1)"
                >
                    ‹
                </button>
                <button
                    v-for="(page, i) in visiblePages"
                    :key="i"
                    class="page-btn"
                    :class="{ active: page === currentPage }"
                    :disabled="page === '…'"
                    :aria-current="
                        page === currentPage ? 'page' : undefined
                    "
                    :aria-label="
                        page === '…'
                            ? undefined
                            : `Página ${page}`
                    "
                    @click="page !== '…' && goToPage(page)"
                >
                    {{ page }}
                </button>
                <button
                    class="page-btn page-nav-btn"
                    :disabled="currentPage === totalPages"
                    aria-label="Página siguiente"
                    @click="goToPage(currentPage + 1)"
                >
                    ›
                </button>
            </div>
        </nav>
    </main>
    <main v-else id="home-content" class="results-container home-intro">
        <section class="intro-block">
            <h1 class="intro-title">
                Compara precios de medicamentos y ahorra en tu compra
            </h1>
            <p class="intro-text">
                <strong>Pharmatch</strong> es el comparador de precios de
                medicamentos de Maturín, estado Monagas. Busca cualquier
                medicamento por su nombre comercial o por su principio activo y
                compara en segundos los precios en farmacias como Farmatodo,
                Farmadón, Farmapaz y Farmatina.
            </p>
            <p class="intro-text">
                Filtra por dosis y cantidad de comprimidos, arma tu lista de
                compra y consulta el total en bolívares y en dólares (referencia
                BCV) antes de salir a la farmacia. Los precios se actualizan a
                diario para que siempre veas la opción más conveniente.
            </p>
            <p class="intro-hint">
                Escribe un nombre en el buscador de arriba para empezar, o
                revisa algunos medicamentos destacados:
            </p>
        </section>

        <article
            v-for="product in featuredProducts"
            :key="product.id"
            class="product-card"
        >
            <div class="card-content">
                <div class="product-info">
                    <h3 class="product-title">
                        {{ product.nombre_producto_farmacia }}
                    </h3>
                    <p class="product-subtitle">
                        {{ product.laboratorio }} • {{ product.presentacion }}
                    </p>
                    <div class="pharmacy-badge">
                        <span class="pharmacy-name">{{
                            product.farmacia
                        }}</span>
                    </div>
                </div>
                <div class="product-pricing">
                    <div class="price-amount">
                        <div>
                            {{ product.precio_bs.toFixed(2) }}
                        </div>
                        <div>Bs</div>
                    </div>
                    <div v-if="store.refRate" class="price-usd">
                        <div>REF</div>
                        <div>
                            {{ (product.precio_bs / store.refRate).toFixed(2) }}
                        </div>
                    </div>
                    <span
                        class="stock-status in-stock"
                        v-if="product.disponibilidad"
                    >
                        <span class="status-dot"></span> Disponible
                    </span>
                </div>
            </div>
            <button class="btn-add-cart" @click="cartStore.addToCart(product)">
                <span>Agregar a mi lista</span>
            </button>
        </article>

        <section class="intro-block">
            <h2 class="intro-subtitle">¿Cómo funciona Pharmatch?</h2>
            <p class="intro-text">
                1. Escribe el nombre del medicamento o su principio activo (por
                ejemplo, "Losartán 50mg"). 2. Selecciona las farmacias donde
                quieres comparar. 3. Filtra por dosis y cantidad de
                comprimidos. 4. Agrega las opciones más convenientes a tu lista
                de compra y revisa el total antes de ir a la farmacia.
            </p>
            <p class="intro-text">
                Pharmatch es un comparador independiente: no vendemos
                medicamentos ni favorecemos a ninguna farmacia. Nuestro único
                objetivo es que encuentres el mejor precio disponible.
            </p>
        </section>
    </main>
</template>

<style scoped>
.results-container {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 600px;
    margin: 0 auto;
}
.results-header {
    display: flex;
    flex-direction: column;
    gap: 4px;
}
.results-title {
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--color-text-muted);
}
.intro-block {
    background-color: var(--color-bg-surface);
    border: 1px solid var(--color-border);
    border-radius: 16px;
    padding: 20px 16px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
}
.intro-title {
    font-size: 1.25rem;
    font-weight: 800;
    color: var(--color-text-main);
    margin: 0 0 12px;
    line-height: 1.35;
}
.intro-subtitle {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--color-text-main);
    margin: 0 0 12px;
}
.intro-text {
    font-size: 0.9rem;
    color: var(--color-text-muted);
    line-height: 1.65;
    margin: 0 0 10px;
}
.intro-text:last-child {
    margin-bottom: 0;
}
.intro-hint {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--color-primary);
    margin: 4px 0 0;
}
.search-term {
    color: var(--color-text-main);
    font-weight: 700;
}
.sort-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.75rem;
    color: var(--color-primary);
    font-weight: 600;
}
.sort-icon {
    font-size: 16px;
}
.product-card {
    background-color: var(--color-bg-surface);
    border: 1px solid var(--color-border);
    border-radius: 16px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    position: relative;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
}
.product-card.bestPrice {
    border: 2px solid var(--color-success);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.12);
}
.card-tag {
    position: absolute;
    top: -12px;
    left: 16px;
    background-color: var(--color-success);
    color: #ffffff;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 12px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    text-transform: uppercase;
    letter-spacing: 0.3px;
}
.tag-icon {
    font-size: 14px;
}
.card-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    margin-top: 4px;
}
.product-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    min-width: 0;
}
.product-title {
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-text-main);
    margin: 0;
    overflow-wrap: anywhere;
    word-break: break-word;
}
.product-subtitle {
    font-size: 0.8rem;
    color: var(--color-text-muted);
    overflow-wrap: anywhere;
    word-break: break-word;
}
.pharmacy-badge {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 8px;
    color: var(--color-primary);
    font-size: 0.85rem;
    font-weight: 600;
}
.pharmacy-icon {
    font-size: 18px;
}
.product-pricing {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
    flex-shrink: 0;
}
.price-amount {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 1.35rem;
    font-weight: 800;
    color: var(--color-text-main);
}
.price-usd {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-primary);
    gap: 4px;
}
.usd-filter-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.75rem;
    color: var(--color-primary);
    font-weight: 600;
    margin-top: 4px;
}
.stock-status {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--color-text-muted);
}
.status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--color-success);
}
.btn-add-cart {
    width: 100%;
    background-color: var(--color-primary-light);
    color: var(--color-primary);
    border: 1px solid var(--color-primary-border);
    padding: 10px;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
}
.btn-add-cart:hover {
    background-color: var(--color-primary);
    color: #ffffff;
}
.btn-add-cart:active {
    transform: scale(0.98);
}
.pagination {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding-top: 8px;
}
.pagination-info {
    font-size: 0.8rem;
    color: var(--color-text-muted);
    text-align: center;
}
.pagination-controls {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: center;
}
.page-btn {
    min-width: 36px;
    height: 36px;
    padding: 0 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-bg-surface);
    border: 1px solid var(--color-border);
    color: var(--color-text-muted);
    border-radius: 16px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}
.page-btn:hover:not(:disabled) {
    background-color: var(--color-primary-light);
    border-color: var(--color-primary);
    color: var(--color-primary);
}
.page-btn.active {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
    color: #ffffff;
}
.page-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
}
.page-btn:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
}
.page-nav-btn {
    font-size: 1.1rem;
}
@media (max-width: 480px) {
    .card-content {
        flex-direction: column;
        align-items: stretch;
    }
    .product-pricing {
        align-items: flex-start;
    }
    .page-btn {
        min-width: 32px;
        height: 32px;
        font-size: 0.8rem;
    }
}
</style>
