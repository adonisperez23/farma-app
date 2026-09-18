<script setup lang="ts">
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores";
const cartStore = useCartStore();
const router = useRouter();
</script>

<template>
    <header class="pwa-header">
        <div class="header-top">
            <div @click="router.push('/home')" class="brand">
                <a @click.prevent href="/inicio">
                    <img
                        src="/logo_pharmatch_with_name.svg"
                        alt="Pharmatch"
                        class="brand-logo"
                    />
                </a>
            </div>
            <div class="header-actions">
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
    cursor: pointer;
}

.brand-logo {
    height: 100px;
    width: auto;
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

.header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
}

.btn-legal {
    background: transparent;
    border: 1px solid var(--color-border);
    color: var(--color-text-muted);
    cursor: pointer;
    padding: 6px 12px;
    border-radius: 16px;
    font-size: 0.75rem;
    font-weight: 600;
    transition: all 0.2s ease-in-out;
}

.btn-legal:hover {
    background-color: var(--color-primary-light);
    border-color: var(--color-primary);
    color: var(--color-primary);
}
</style>
