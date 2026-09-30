import { ref } from "vue";

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const deferredPrompt = ref<BeforeInstallPromptEvent | null>(null);
const canInstall = ref(false);
const isIOS = detectIOS();
const isAndroid = detectAndroid();
const isInstalled = ref(checkInstalled());

function detectIOS(): boolean {
    if (typeof navigator === "undefined") return false;
    const ua = navigator.userAgent;
    const isMobileIOS = /iPad|iPhone|iPod/.test(ua);
    // iPadOS 13+ se reporta como Mac, pero tiene multitáctil
    const isIPadOS =
        navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
    return isMobileIOS || isIPadOS;
}

function detectAndroid(): boolean {
    if (typeof navigator === "undefined") return false;
    return /Android/i.test(navigator.userAgent);
}

function checkInstalled(): boolean {
    if (typeof window === "undefined") return false;
    // iOS Safari
    const nav = window.navigator as Navigator & { standalone?: boolean };
    if (nav.standalone === true) return true;
    // Chromium (Android/desktop)
    return window.matchMedia("(display-mode: standalone)").matches;
}

function onBeforeInstallPrompt(e: Event) {
    e.preventDefault();
    deferredPrompt.value = e as BeforeInstallPromptEvent;
    canInstall.value = true;
}

function onAppInstalled() {
    deferredPrompt.value = null;
    isInstalled.value = true;
    canInstall.value = false;
}

function onDisplayModeChange(e: MediaQueryListEvent) {
    if (e.matches) onAppInstalled();
}

if (typeof window !== "undefined") {
    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onAppInstalled);
    // Si la app se abre como app instalada, el evento puede no dispararse
    window
        .matchMedia("(display-mode: standalone)")
        .addEventListener("change", onDisplayModeChange);
}

export function usePwaInstall() {
    const showInstallButton = () => {
        if (isInstalled.value) return false;
        // Móvil: siempre ofrecemos instalar; si falla la API nativa
        // (entorno inseguro, cooldown, navegador sin soporte) mostramos
        // instrucciones manuales
        if (isIOS || isAndroid) return true;
        // Escritorio: sólo cuando el navegador marcó la app como instalable
        return canInstall.value;
    };

    const installApp = async (): Promise<"native" | "instructions" | "none"> => {
        if (deferredPrompt.value) {
            const promptEvent = deferredPrompt.value;
            deferredPrompt.value = null;
            canInstall.value = false;

            await promptEvent.prompt();
            const { outcome } = await promptEvent.userChoice;

            if (outcome === "accepted") {
                isInstalled.value = true;
            }
            return "native";
        }

        // iOS no dispara beforeinstallprompt; en Android puede no dispararse
        // (contexto inseguro, Chrome en cooldown, etc.) → instrucciones
        if (isIOS || isAndroid) return "instructions";
        return "none";
    };

    return {
        showInstallButton,
        installApp,
        isIOS,
        isAndroid,
        isInstalled,
    };
}
