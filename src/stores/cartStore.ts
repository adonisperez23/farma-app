import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { products, initialCartItems } from '@/data/products'

interface CartItem {
    id: number
    title: string
    pharmacy: string
    price: number
}

export const useCartStore = defineStore('cart', () => {
    const searchQuery = ref('Losartán 50mg')
    const selectedPharmacies = ref<string[]>(['farmatodo', 'farmadon'])
    const selectedCondition = ref<string | null>(null)
    const cartItems = ref<CartItem[]>(initialCartItems)
    const isCartModalOpen = ref(false)

    const cartCount = computed(() => cartItems.value.length)

    const totalSavings = computed(() => {
        const cheapestPrices: Record<string, number> = {}
        products.forEach((p) => {
            const matchesPharmacy = selectedPharmacies.value.includes(
                p.pharmacyId
            )
            const matchesCondition =
                selectedCondition.value === null ||
                p.condition === selectedCondition.value
            if (matchesPharmacy && matchesCondition) {
                if (!cheapestPrices[p.title] || p.price < cheapestPrices[p.title]) {
                    cheapestPrices[p.title] = p.price
                }
            }
        })
        const cartTotal = cartItems.value.reduce((sum, item) => sum + item.price, 0)
        const cheapestTotal = Object.values(cheapestPrices).reduce(
            (sum, price) => sum + price,
            0
        )
        return Math.max(0, cartTotal - cheapestTotal)
    })

    const filteredProducts = computed(() => {
        return products.filter((p) => {
            const matchesPharmacy = selectedPharmacies.value.includes(
                p.pharmacyId
            )
            const matchesCondition =
                selectedCondition.value === null ||
                p.condition === selectedCondition.value
            return matchesPharmacy && matchesCondition
        })
    })

    function addToCart(product: (typeof products)[0]) {
        const exists = cartItems.value.find((item) => item.id === product.id)
        if (!exists) {
            cartItems.value.push({
                id: product.id,
                title: product.title,
                pharmacy: product.pharmacyName,
                price: product.price,
            })
        }
    }

    function removeFromCart(productId: number) {
        cartItems.value = cartItems.value.filter(
            (item) => item.id !== productId
        )
    }

    function toggleCartModal() {
        isCartModalOpen.value = !isCartModalOpen.value
    }

    function closeCartModal() {
        isCartModalOpen.value = false
    }

    function updateSearchQuery(query: string) {
        searchQuery.value = query
    }

    function togglePharmacy(pharmacyId: string) {
        const idx = selectedPharmacies.value.indexOf(pharmacyId)
        if (idx > -1) {
            selectedPharmacies.value.splice(idx, 1)
        } else {
            selectedPharmacies.value.push(pharmacyId)
        }
    }

    function setCondition(condition: string | null) {
        selectedCondition.value = condition
    }

    return {
        searchQuery,
        selectedPharmacies,
        selectedCondition,
        cartItems,
        isCartModalOpen,
        cartCount,
        totalSavings,
        filteredProducts,
        products,
        addToCart,
        removeFromCart,
        toggleCartModal,
        closeCartModal,
        updateSearchQuery,
        togglePharmacy,
        setCondition,
    }
})
