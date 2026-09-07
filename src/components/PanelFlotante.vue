<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore'
const store = useCartStore()
</script>

<template>
    <aside class="cart-floating-panel">
        <!-- Resumen Fijo Inferior -->
        <div class="cart-summary">
            <div class="cart-metrics">
                <div class="cart-count">
                    <span class="material-symbols-outlined cart-icon"
                        >shopping_cart</span
                    >
                    <span class="count-badge">{{ store.cartCount }}</span>
                    <span class="count-text">Productos</span>
                </div>
                <div class="savings-info">
                    <span class="savings-label">Ahorro total est.:</span>
                    <span class="savings-amount">${{ store.totalSavings.toFixed(2) }}</span>
                </div>
            </div>

            <button id="btnOpenCart" class="btn-checkout" @click="store.toggleCartModal()">
                <span>Ver mi lista</span>
                <span class="material-symbols-outlined">arrow_forward</span>
            </button>
        </div>
    </aside>

    <!-- MODAL DEL CARRITO / DETALLE DE COMPRA -->
    <div
        id="cartModal"
        class="cart-modal-backdrop"
        :class="{ hidden: !store.isCartModalOpen }"
        @click.self="store.closeCartModal()"
    >
        <div class="cart-modal-content">
            <div class="modal-header">
                <h3>Mi Lista de Compra</h3>
                <button id="btnCloseCart" class="btn-close-modal" @click="store.closeCartModal()">
                    <span class="material-symbols-outlined">close</span>
                </button>
            </div>

            <div class="modal-body">
                <div
                    v-for="item in store.cartItems"
                    :key="item.id"
                    class="cart-item"
                >
                    <div class="item-details">
                        <p class="item-title">{{ item.title }}</p>
                        <p class="item-pharmacy">
                            Comprar en: <strong>{{ item.pharmacy }}</strong>
                        </p>
                    </div>
                    <div class="item-action">
                        <span class="item-price">${{ item.price.toFixed(2) }}</span>
                        <a
                            href="https://www.farmadon.com.ve"
                            target="_blank"
                            rel="noopener"
                            class="btn-redirect"
                        >
                            <span>Ir a Farmacia</span>
                            <span
                                class="material-symbols-outlined icon-redirect"
                                >open_in_new</span
                            >
                        </a>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <p class="redirect-disclaimer">
                    <span class="material-symbols-outlined disclaimer-icon"
                        >info</span
                    >
                    Al pulsar "Ir a Farmacia" serás redirigido a la plataforma
                    oficial correspondiente[cite: 1].
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.cart-floating-panel {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: var(--color-bg-surface);
    border-top: 1px solid var(--color-border);
    box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.08);
    padding: 12px 16px;
    z-index: 999;
}

.cart-summary {
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
}

.cart-metrics {
    display: flex;
    align-items: center;
    gap: 16px;
}

.cart-count {
    position: relative;
    display: flex;
    align-items: center;
    color: var(--color-text-main);
}

.cart-icon {
    font-size: 28px;
    color: var(--color-primary);
}

.count-badge {
    position: absolute;
    top: -6px;
    right: -8px;
    background-color: var(--color-primary);
    color: #ffffff;
    font-size: 0.7rem;
    font-weight: 700;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.count-text {
    display: none;
    font-size: 0.85rem;
    font-weight: 600;
    margin-left: 12px;
}

.savings-info {
    display: flex;
    flex-direction: column;
}

.savings-label {
    font-size: 0.7rem;
    color: var(--color-text-muted);
    text-transform: uppercase;
    font-weight: 600;
}

.savings-amount {
    font-size: 1.1rem;
    font-weight: 800;
    color: var(--color-success);
}

.btn-checkout {
    background-color: var(--color-success);
    color: #ffffff;
    border: none;
    padding: 10px 18px;
    border-radius: 12px;
    font-size: 0.9rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    transition:
        background-color 0.2s ease,
        transform 0.1s ease;
}

.btn-checkout:hover {
    background-color: #0ea5e9;
}

.btn-checkout:active {
    transform: scale(0.97);
}

.cart-modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(4px);
    z-index: 2000;
    display: flex;
    align-items: flex-end;
    justify-content: center;
}

.cart-modal-backdrop.hidden {
    display: none;
}

.cart-modal-content {
    background-color: var(--color-bg-surface);
    width: 100%;
    max-width: 600px;
    border-radius: 20px 20px 0 0;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-height: 80vh;
    overflow-y: auto;
    animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
    from {
        transform: translateY(100%);
    }
    to {
        transform: translateY(0);
    }
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 12px;
}

.modal-header h3 {
    font-size: 1.1rem;
    color: var(--color-text-main);
}

.btn-close-modal {
    background: transparent;
    border: none;
    color: var(--color-text-muted);
    cursor: pointer;
}

.modal-body {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    background-color: var(--color-bg-app);
    border-radius: 12px;
    border: 1px solid var(--color-border);
}

.item-title {
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--color-text-main);
}

.item-pharmacy {
    font-size: 0.8rem;
    color: var(--color-text-muted);
}

.item-action {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 6px;
}

.item-price {
    font-size: 1rem;
    font-weight: 800;
    color: var(--color-text-main);
}

.btn-redirect {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background-color: var(--color-primary);
    color: #ffffff;
    text-decoration: none;
    padding: 6px 10px;
    border-radius: 8px;
    font-size: 0.75rem;
    font-weight: 600;
}

.icon-redirect {
    font-size: 14px;
}

.modal-footer {
    border-top: 1px solid var(--color-border);
    padding-top: 12px;
}

.redirect-disclaimer {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.75rem;
    color: var(--color-text-muted);
}

.disclaimer-icon {
    font-size: 16px;
}

@media (min-width: 640px) {
    .count-text {
        display: inline;
    }
    .cart-modal-backdrop {
        align-items: center;
    }
    .cart-modal-content {
        border-radius: 20px;
    }
}
</style>
