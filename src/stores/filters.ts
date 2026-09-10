import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { getMedicamentosAxios, parseSearchQuery } from '@/services/apiAxios'
import { medicamentosBase } from '@/data/medicamentosBase'
import type { MedicamentoPrecioApi, NombreFarmacia } from '@/types'

const pathologyMap: Record<string, string> = {
    hipertension: 'Hipertensión',
    diabetes: 'Diabetes Tipo 2',
    tiroides: 'General',
    dislipidemia: 'General',
}

export function getPatologiaFromCondition(condition: string): string {
    return pathologyMap[condition] || condition
}

export const useFiltersStore = defineStore('filters', () => {
    const isDataLoaded = ref(false)

    const searchQuery = ref('')
    const parsedQuery = computed(() => parseSearchQuery(searchQuery.value))
    const selectedPharmacies = ref<NombreFarmacia[]>(['Farmatodo', 'Farmadón','Farmapaz','Farmatina'])
    const selectedCondition = ref<string | null>(null)
    const isMedicamentosModalOpen = ref(false)
    const selectedPathologyForModal = ref<string | null>(null)
    const isLoading = ref(false)
    const error = ref<string | null>(null)
    const products = ref<MedicamentoPrecioApi[]>([])
    const selectedDosis = ref<string[]>([])
    const selectedCantidad = ref<string>('todos')

    const filteredProducts = computed(() => {
        const query = searchQuery.value.toLowerCase()
        const parsed = parsedQuery.value
        const doseStr = parsed.dosis ? normalizeDosis(parsed.dosis).toLowerCase() : ''
        return products.value.filter((p) => {
            const matchesPharmacy = selectedPharmacies.value.length === 0 ||
                selectedPharmacies.value.includes(p.farmacia)
            const productName = p.nombre_producto_farmacia.toLowerCase()
            const productPrincipio = p.principio_activo.toLowerCase()
            const productDosisArray = (Array.isArray(p.dosis) ? p.dosis : [p.dosis]).map(normalizeDosis)

            const matchesSearch = !query ||
                productName.includes(query) ||
                productPrincipio.includes(query)
            const matchesDoseFromQuery = !doseStr ||
                productDosisArray.some(d => d.toLowerCase().includes(doseStr))
            const matchesSelectedDosis = doseStr.length > 0 || selectedDosis.value.length === 0 ||
                selectedDosis.value.some(d => productDosisArray.some(pd => pd.toLowerCase() === normalizeDosis(d).toLowerCase()))
            const matchesCantidad = selectedCantidad.value === 'todos' ||
                matchesCantidadRange(p.cantidad_unidades, selectedCantidad.value)
            return matchesPharmacy && matchesSearch && matchesDoseFromQuery && matchesSelectedDosis && matchesCantidad
        })
    })

    const availableDosis = computed(() => {
        const dosisSet = new Set<string>()
        products.value.forEach(p => {
            const doses = Array.isArray(p.dosis) ? p.dosis : [p.dosis]
            doses.forEach(d => {
                const normalized = normalizeDosis(d)
                if (!normalized.includes('/')) {
                    dosisSet.add(normalized)
                }
            })
        })
        return Array.from(dosisSet).sort()
    })

    function normalizeDosis(d: string): string {
    return d.replace(',', '.')
}

function matchesCantidadRange(cantidad: number, range: string): boolean {
        switch(range) {
            case '0-10': return cantidad <= 10
            case '10-30': return cantidad > 10 && cantidad <= 30
            case '30-60': return cantidad > 30 && cantidad <= 60
            case '60+': return cantidad > 60
            default: return true
        }
    }

function toggleDosis(dosis: string) {
    if (availableDosis.value.length === 1) return
    const idx = selectedDosis.value.indexOf(dosis)
    if (idx > -1) {
        selectedDosis.value.splice(idx, 1)
    } else {
        selectedDosis.value.push(dosis)
    }
}

    function setCantidadRange(range: string) {
        selectedCantidad.value = range
    }

    function clearFilters() {
        selectedDosis.value = []
        selectedCantidad.value = 'todos'
        searchQuery.value = ''
    }

    const medicamentosSinResultados = computed(() => {
        const idsConResultado = new Set(products.value.map(p => p.medicamento_base_id))
        return medicamentosBase.filter(m => !idsConResultado.has(m.id))
    })

    const medicamentosPorPatologia = computed(() => {
        if (!selectedPathologyForModal.value) return []
        return medicamentosBase.filter(
            (m) => m.patologia === selectedPathologyForModal.value
        )
    })

    async function loadMedicamentos() {
        isLoading.value = true
        error.value = null
        try {
            products.value = await getMedicamentosAxios(searchQuery.value)
            isDataLoaded.value = true
            console.log('Medicamentos sin resultados:', medicamentosSinResultados.value)
        } catch (e) {
            error.value = e instanceof Error ? e.message : 'Error al cargar medicamentos'
        } finally {
            isLoading.value = false
        }
    }

    let searchTimeout: ReturnType<typeof setTimeout> | null = null
    watch(searchQuery, (newQuery) => {
        if (!isDataLoaded.value) return
        if (searchTimeout) clearTimeout(searchTimeout)
        searchTimeout = setTimeout(async () => {
            isLoading.value = true
            try {
                products.value = await getMedicamentosAxios(newQuery)
            } catch (e) {
                error.value = e instanceof Error ? e.message : 'Error al cargar medicamentos'
            } finally {
                isLoading.value = false
            }
        }, 300)
    })

    watch(availableDosis, (dosises) => {
        if (dosises.length === 1 && selectedDosis.value.length === 0) {
            selectedDosis.value = [dosises[0]]
        }
    })

    function updateSearchQuery(query: string) {
        searchQuery.value = query
    }

    function togglePharmacy(farmacia: NombreFarmacia) {
        const idx = selectedPharmacies.value.indexOf(farmacia)
        if (idx > -1) {
            selectedPharmacies.value.splice(idx, 1)
        } else {
            selectedPharmacies.value.push(farmacia)
        }
    }

    function setCondition(condition: string | null) {
        selectedCondition.value = condition
    }

    function openMedicamentosModal(patologia: string) {
        selectedPathologyForModal.value = patologia
        isMedicamentosModalOpen.value = true
    }

    function closeMedicamentosModal() {
        isMedicamentosModalOpen.value = false
        selectedPathologyForModal.value = null
    }

    return {
        searchQuery,
        selectedPharmacies,
        selectedCondition,
        isMedicamentosModalOpen,
        selectedPathologyForModal,
        isLoading,
        error,
        filteredProducts,
        medicamentosPorPatologia,
        products,
        availableDosis,
        selectedDosis,
        selectedCantidad,
        medicamentosSinResultados,
        loadMedicamentos,
        updateSearchQuery,
        togglePharmacy,
        toggleDosis,
        setCondition,
        setCantidadRange,
        clearFilters,
        openMedicamentosModal,
        closeMedicamentosModal,
    }
})
