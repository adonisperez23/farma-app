<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
    <footer class="pwa-footer">
        <div class="footer-content">
            <div class="footer-brand">
                <img src="/logo_pharmatch_with_name.svg" alt="MediAhorro" class="footer-logo" />
            </div>
            <nav class="footer-nav">
                <button class="footer-link" @click="router.push('/terminos')">Términos y condiciones de uso</button>
                <button class="footer-link" @click="router.push('/privacidad')">Políticas de Privacidad</button>
                <button class="footer-link" @click="router.push('/aviso-legal')">Aviso Legal</button>
            </nav>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 Pharmatch. Todos los derechos reservados.</p>
        </div>
    </footer>
</template>

<style scoped>
.pwa-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: var(--color-bg-surface);
    border-top: 1px solid var(--color-border);
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.06);
    z-index: 1000;
    display: flex;
    flex-direction: column;
}

.footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    gap: 16px;
}

.footer-brand {
    display: flex;
    align-items: center;
}

.footer-logo {
    height: 36px;
    width: auto;
}

.footer-nav {
    display: flex;
    gap: 8px;
}

.footer-link {
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

.footer-link:hover {
    background-color: var(--color-primary-light);
    border-color: var(--color-primary);
    color: var(--color-primary);
}

.footer-bottom {
    text-align: center;
    padding: 8px 16px;
    border-top: 1px solid var(--color-border);
}

.footer-bottom p {
    font-size: 0.7rem;
    color: var(--color-text-muted);
}

@media (min-width: 640px) {
    .footer-content {
        padding: 16px 32px;
    }

    .footer-link {
        font-size: 0.8rem;
        padding: 8px 16px;
    }
}
</style>
