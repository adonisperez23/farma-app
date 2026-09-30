import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import type { MedicamentoPrecioApi } from "@/types";

const CART_STORAGE_KEY = "mediAhorro_cart";

export const useCartStore = defineStore("cart", () => {
    const cartItems = ref<MedicamentoPrecioApi[]>([]);
    const isCartModalOpen = ref(false);
    const isDuplicateModalOpen = ref(false);
    const duplicateItemName = ref("");

    const cartCount = computed(() => cartItems.value.length);

    function loadCartFromStorage() {
        try {
            const stored = localStorage.getItem(CART_STORAGE_KEY);
            if (stored) {
                cartItems.value = JSON.parse(stored);
            }
        } catch {
            cartItems.value = [];
        }
    }

    function saveCartToStorage() {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems.value));
    }

    function syncCartWithProducts(products: MedicamentoPrecioApi[]) {
        const validIds = new Set(products.map((p) => p.id));
        cartItems.value = cartItems.value.filter((item) =>
            validIds.has(item.id),
        );
        saveCartToStorage();
    }

    function addToCart(product: MedicamentoPrecioApi) {
        const exists = cartItems.value.find(
            (item) =>
                item.nombre_producto_farmacia ===
                product.nombre_producto_farmacia,
        );
        if (exists) {
            duplicateItemName.value = product.nombre_producto_farmacia;
            isDuplicateModalOpen.value = true;
            return;
        }
        cartItems.value.push({
            ...product,
            farmacia: product.farmacia,
            precio_bs: product.precio_bs,
        });
        saveCartToStorage();
    }

    function removeFromCart(productId: number) {
        cartItems.value = cartItems.value.filter(
            (item) => item.id !== productId,
        );
        saveCartToStorage();
    }

    function toggleCartModal() {
        isCartModalOpen.value = !isCartModalOpen.value;
    }

    function closeCartModal() {
        isCartModalOpen.value = false;
    }

    function closeDuplicateModal() {
        isDuplicateModalOpen.value = false;
    }

    const totalCart = computed(() => {
        return cartItems.value.reduce(
            (acum, item) => (acum += item.precio_bs),
            0,
        );
    });

    watch(cartItems, saveCartToStorage, { deep: true });

    loadCartFromStorage();

    return {
        cartItems,
        isCartModalOpen,
        isDuplicateModalOpen,
        duplicateItemName,
        cartCount,
        addToCart,
        removeFromCart,
        toggleCartModal,
        closeCartModal,
        closeDuplicateModal,
        syncCartWithProducts,
        totalCart,
    };
});
