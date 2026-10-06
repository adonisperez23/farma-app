import { ref } from "vue";

export interface OnboardingStep {
    icon: string;
    title: string;
    text: string;
    bullets?: string[];
}

const STORAGE_KEY = "mediAhorro_onboarding_v1";

const isOpen = ref(false);
const step = ref(0);

const steps: OnboardingStep[] = [
    {
        icon: "💊",
        title: "Compara precios de tu medicamento",
        text: "Pharmatch compara precios del mismo medicamento en varias farmacias para que elijas el mejor deal.",
        bullets: [
            "Farmatodo",
            "Farmadón",
            "Farmapaz",
            "Farmatina",
            "Precios en bolivares (Bs)",
        ],
    },
    {
        icon: "🔍",
        title: "Busca tu medicamento",
        text: "Escribe en el buscador el nombre del medicamento o su principio activo, por ejemplo: Losartán 50mg.",
        bullets: [
            "Los resultados se actualizan solos mientras escribes (no hace falta pulsar Enter)",
            "Incluye la dosis en la misma búsqueda para acotar más rápido",
            "Toca la ✕ para borrar la búsqueda",
        ],
    },
    {
        icon: "🎛️",
        title: "Afina con filtros",
        text: "Los filtros te ayudan a ver solo lo que te interesa.",
        bullets: [
            "Farmacias: elige en cuáles quieres buscar",
            "Condición rápida: chips como Hipertensión o Diabetes abren una lista de medicamentos por patología",
            "Dosis y Cantidad de comprimidos: restringen los resultados",
            "Usa «Ocultar filtros» para ganar espacio en pantalla",
        ],
    },
    {
        icon: "🏷️",
        title: "Entiende los resultados",
        text: "Cada tarjeta resume un producto disponible para comprar.",
        bullets: [
            "La primera tarjeta tiene la etiqueta MEJOR PRECIO (la opción más barata)",
            "Verás nombre, laboratorio, presentación y farmacia",
            "El precio aparece en Bs y también en REF (referencia)",
            "El punto verde indica que está Disponible",
            "Toca «Agregar a mi lista» para guardarlo",
        ],
    },
    {
        icon: "🛒",
        title: "Arma tu lista de compra",
        text: "Tu lista reúne los medicamentos que quieres comprar y su total estimado.",
        bullets: [
            "El botón «Ver mi lista» (arriba) muestra lo que agregaste, con el total",
            "«Ir a Farmacia» te lleva al sitio oficial de esa farmacia para comprar",
            "El mismo medicamento no se puede agregar dos veces",
            "Tu lista se guarda en este dispositivo aunque cierres la app",
        ],
    },
    {
        icon: "📲",
        title: "Úsala como app",
        text: "Puedes instalar Pharmatch en tu teléfono y tenerla siempre a mano.",
        bullets: [
            "Toca «📥 Instalar App» en la parte superior",
            "En iPhone: Compartir → Añadir a pantalla de inicio → Añadir",
            "En Android/escritorio: menú ⋮ → Instalar aplicación → Instalar",
        ],
    },
];

function hasSeenOnboarding(): boolean {
    if (typeof window === "undefined") return true;
    return window.localStorage.getItem(STORAGE_KEY) === "done";
}

function markSeen(): void {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, "done");
}

function open(): void {
    step.value = 0;
    isOpen.value = true;
}

function close(): void {
    isOpen.value = false;
    markSeen();
}

function next(): void {
    if (step.value < steps.length - 1) {
        step.value += 1;
    } else {
        close();
    }
}

function prev(): void {
    if (step.value > 0) {
        step.value -= 1;
    }
}

export function useOnboarding() {
    return {
        isOpen,
        step,
        steps,
        hasSeenOnboarding,
        open,
        close,
        next,
        prev,
    };
}
