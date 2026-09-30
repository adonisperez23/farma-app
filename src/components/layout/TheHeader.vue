<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCartStore, useFiltersStore } from "@/stores";
import BaseModal from "@/components/shared/BaseModal.vue";
import { usePwaInstall } from "@/composables/usePwaInstall";

const cartStore = useCartStore();
const filterStore = useFiltersStore();
const router = useRouter();
const { showInstallButton, installApp, isIOS, isAndroid } = usePwaInstall();
const isInstallModalOpen = ref(false);

function onToggleCartModal() {
    filterStore.isMedicamentosModalOpen = false;
    filterStore.selectedPathologyForModal = null;
    cartStore.toggleCartModal();
}

async function onInstallClick() {
    const result = await installApp();
    if (result === "instructions") {
        isInstallModalOpen.value = true;
    }
}
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
            <div class="install-wrap">
                <button
                    v-if="showInstallButton()"
                    class="btn-install"
                    @click="onInstallClick"
                >
                    <span>📥 Instalar App</span>
                </button>
            </div>
            <div class="header-actions">
                <button
                    class="btn-cart"
                    @click="onToggleCartModal"
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

    <BaseModal
        :modelValue="isInstallModalOpen"
        :title="
            isIOS
                ? 'Instalar en tu iPhone'
                : isAndroid
                  ? 'Instalar en tu Android'
                  : 'Instalar la app'
        "
        subtitle="Sigue estos pasos"
        @close="isInstallModalOpen = false"
    >
        <template v-if="isIOS">
            <ol class="install-steps">
                <li>
                    Toca el botón <strong>Compartir</strong> (cuadrado con
                    flecha <strong>↑</strong>) en la barra de Safari.
                </li>
                <li>
                    Selecciona <strong>"Añadir a pantalla de inicio"</strong>.
                </li>
                <li>
                    Toca <strong>"Añadir"</strong> en la esquina superior
                    derecha.
                </li>
            </ol>
            <p class="install-note">
                ¿Usas Chrome en iOS? Toca el menú <strong>⋮</strong> y elige
                "Añadir a pantalla de inicio".
            </p>
        </template>
        <template v-else>
            <ol class="install-steps">
                <li>
                    Toca el menú <strong>⋮</strong> (esquina superior derecha
                    de Chrome).
                </li>
                <li>
                    Selecciona <strong>"Instalar aplicación"</strong> o
                    <strong>"Añadir a pantalla de inicio"</strong>.
                </li>
                <li>Toca <strong>"Instalar"</strong> para confirmar.</li>
            </ol>
            <p class="install-note">
                Si la opción no aparece, abre la web desde un dominio con
                <strong>HTTPS</strong>.
            </p>
        </template>
    </BaseModal>
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

.install-steps {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-left: 20px;
    color: var(--color-text-main);
    font-size: 0.95rem;
    line-height: 1.5;
}

.install-steps li::marker {
    font-weight: 700;
    color: var(--color-primary);
}

.install-note {
    font-size: 0.85rem;
    color: var(--color-text-muted);
    background-color: var(--color-bg-app);
    border-radius: 8px;
    padding: 10px 12px;
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

@media (max-width: 640px) {
    .header-top {
        flex-wrap: wrap;
        gap: 8px;
    }

    .install-wrap {
        order: 3;
        width: 100%;
    }

    .btn-install {
        width: 100%;
        justify-content: center;
        padding: 10px 14px;
    }
}
</style>
