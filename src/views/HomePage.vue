<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue'
import Filters from "@/components/features/Filters.vue";
import Results from "@/components/features/Results.vue";
import MedicamentosModal from "@/components/features/MedicamentosModal.vue";
import { useFiltersStore } from '@/stores'
import { useCartStore } from '@/stores'
import { onMounted } from 'vue'
const store = useFiltersStore()
const cartStore = useCartStore()

onMounted(async () => {
    await store.loadMedicamentos()
    cartStore.syncCartWithProducts(store.products)
})
</script>

<template>
    <IonPage>
        <IonContent class="page-content">
            <div class="content-spacer">
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
                <Filters />
                <Results />
            </div>
        </IonContent>
        <div
            id="cartModal"
            class="cart-modal-backdrop"
            :class="{ hidden: !cartStore.isCartModalOpen }"
            @click.self="cartStore.closeCartModal()"
        >
            <div class="cart-modal-content">
                <div class="modal-header">
                    <h3>Mi Lista de medicamentos</h3>
                    <button
                        id="btnCloseCart"
                        class="btn-close-modal"
                        @click="cartStore.closeCartModal()"
                    >
                        <span class="material-symbols-outlined">Cerrar</span>
                    </button>
                </div>

                <div class="modal-body">
                    <div
                        v-for="item in cartStore.cartItems"
                        :key="item.id"
                        class="cart-item"
                    >
                        <div class="item-details">
                            <p class="item-title">
                                {{ item.nombre_producto_farmacia }}
                            </p>
                            <p class="item-pharmacy">
                                Comprar en:
                                <strong>{{ item.farmacia }}</strong>
                            </p>
                        </div>
                        <div class="item-action">
                            <span class="item-price"
                                >Bs {{ item.precio_bs.toFixed(2) }}</span
                            >
                            <button
                                class="btn-remove"
                                @click="cartStore.removeFromCart(item.id)"
                                aria-label="Eliminar producto"
                            >
                                <span class="material-symbols-outlined">Eliminar</span>
                            </button>
                            <a
                                :href="item.url_producto"
                                target="_blank"
                                rel="noopener"
                                class="btn-redirect"
                            >
                                <span>Ir a Farmacia</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <p class="redirect-disclaimer">
                        <span class="material-symbols-outlined disclaimer-icon"
                            >info</span
                        >
                        Al pulsar "Ir a Farmacia" serás redirigido a la
                        plataforma oficial correspondiente.
                    </p>
                </div>
            </div>
        </div>
        <MedicamentosModal />
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
.item-details {
    display: flex;
    flex-direction: column;
    gap: 4px;
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
.btn-remove {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 1px solid var(--color-border);
    color: var(--color-text-muted);
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 8px;
    transition: all 0.2s ease;
    align-self: flex-end;
}
.btn-remove:hover {
    background-color: #fee2e2;
    border-color: #ef4444;
    color: #ef4444;
}
.btn-remove .material-symbols-outlined {
    font-size: 18px;
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

@media (min-width: 640px) {
    .cart-modal-backdrop {
        align-items: center;
    }
    .cart-modal-content {
        border-radius: 20px;
    }
}
</style>
