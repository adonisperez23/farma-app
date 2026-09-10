<script setup lang="ts">
import { useFiltersStore } from "@/stores";
import { useCartStore } from "@/stores";
const store = useFiltersStore();
const cartStore = useCartStore();
</script>

<template>
    <header class="pwa-header">
        <div class="header-top">
            <div class="brand">
                <h1 class="brand-title">PharMatch</h1>
            </div>
            <button
                class="btn-cart"
                @click="cartStore.toggleCartModal()"
                aria-label="Ver mi lista"
            >
                <span class="cart-count" v-if="cartStore.cartCount > 0">{{
                    cartStore.cartCount
                }}</span>
                <span class="btn-cart-text">Ver mi lista</span>
            </button>
        </div>

        <div class="search-container">
            <span class="material-symbols-outlined search-icon"></span>
            <input
                type="text"
                id="searchInput"
                class="search-input"
                placeholder="Buscar medicamento (ej. Losartán 50mg)..."
                autocomplete="off"
                v-model="store.searchQuery"
            />
            <button
                id="btnClear"
                class="btn-clear"
                :class="{ hidden: store.searchQuery.length === 0 }"
                aria-label="Limpiar búsqueda"
                @click="store.updateSearchQuery('')"
            >
                <span class="material-symbols-outlined">cancel</span>
            </button>
        </div>
    </header>
</template>

<style scoped>
.pwa-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: var(--color-bg-surface);
    box-shadow: var(--shadow-header);
    border-bottom: 1px solid var(--color-border);
    z-index: 1000;
    padding: 12px 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.brand {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--color-primary);
}

.brand-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text-main);
    letter-spacing: -0.3px;
}

.btn-install {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background-color: var(--color-primary-light);
    color: var(--color-primary);
    border: 1px solid var(--color-primary-border);
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}

.btn-install:hover {
    background-color: var(--color-primary);
    color: var(--color-bg-surface);
    border-color: var(--color-primary);
}

.icon-small {
    font-size: 18px;
}

.search-container {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
}

.search-icon {
    position: absolute;
    left: 12px;
    color: var(--color-text-muted);
    pointer-events: none;
    font-size: 20px;
}

.search-input {
    width: 100%;
    padding: 10px 40px 10px 40px;
    font-size: 0.95rem;
    color: var(--color-text-main);
    border: 1px solid var(--color-border);
    border-radius: 12px;
    background-color: #f1f5f9;
    outline: none;
    transition: all 0.2s ease;
}

.search-input::placeholder {
    color: var(--color-text-muted);
}

.search-input:focus {
    background-color: var(--color-bg-surface);
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(0, 123, 245, 0.15);
}

.btn-clear {
    position: absolute;
    right: 10px;
    background: transparent;
    border: none;
    color: var(--color-text-muted);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
}

.btn-clear:hover {
    color: var(--color-text-main);
}

.hidden {
    display: none;
}

.btn-cart {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background-color: var(--color-primary-light);
    color: var(--color-primary);
    border: 1px solid var(--color-primary-border);
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    position: relative;
}

.btn-cart:hover {
    background-color: var(--color-primary);
    color: var(--color-bg-surface);
}

.cart-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-success);
    color: #ffffff;
    font-size: 0.7rem;
    font-weight: 800;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    min-width: 20px;
    position: absolute;
    top: -6px;
    right: -6px;
}

.btn-cart .material-symbols-outlined {
    font-size: 20px;
}

.btn-cart-text {
    font-size: 0.85rem;
}
</style>
