<script setup lang="ts">
import { useFiltersStore, useCartStore } from "@/stores";
const store = useFiltersStore();
const cartStore = useCartStore();
</script>

<template>
    <main v-if="store.searchQuery.length > 0" class="results-container">
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
            v-for="(product, index) in store.filteredProducts"
            :key="product.id"
            class="product-card"
        >
            <div v-if="index === 0" class="card-tag">
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
                        <div>Bs</div>
                        <div>
                            {{ product.precio_bs.toFixed(2) }}
                        </div>
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
    </main>
    <h1 v-else class="results-container">
        Inserte un nombre de medicamento en el buscador para mostrar
        resultados...
    </h1>
</template>

<script setup lang="ts"></script>

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
}
.product-title {
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-text-main);
    margin: 0;
}
.product-subtitle {
    font-size: 0.8rem;
    color: var(--color-text-muted);
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
</style>
