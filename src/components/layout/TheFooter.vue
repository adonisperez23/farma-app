<script setup lang="ts"></script>

<template>
    <footer class="pwa-footer">
        <div class="footer-content">
            <router-link to="/home" class="footer-brand">
                <img
                    src="/logo_pharmatch_with_name.svg"
                    alt="Pharmatch"
                    class="footer-logo"
                />
            </router-link>
            <nav class="footer-nav" aria-label="Enlaces legales y de información">
                <router-link class="footer-link" to="/guias">
                    Guías
                </router-link>
                <router-link class="footer-link" to="/faq">
                    FAQ
                </router-link>
                <router-link class="footer-link" to="/sobre-nosotros">
                    Sobre nosotros
                </router-link>
                <router-link class="footer-link" to="/contacto">
                    Contacto
                </router-link>
                <router-link class="footer-link" to="/terminos">
                    Términos y condiciones
                </router-link>
                <router-link class="footer-link" to="/privacidad">
                    Políticas de Privacidad
                </router-link>
                <router-link class="footer-link" to="/aviso-legal">
                    Aviso Legal
                </router-link>
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
    flex-wrap: wrap;
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
    flex-wrap: wrap;
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
    text-decoration: none;
}

.footer-link:hover {
    background-color: var(--color-primary-light);
    border-color: var(--color-primary);
    color: var(--color-primary);
}

.footer-link.router-link-active {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
    color: #ffffff;
    font-weight: 700;
    box-shadow: 0 2px 8px rgba(0, 123, 245, 0.25);
}

.footer-link.router-link-active:hover {
    background-color: var(--color-primary-hover);
    border-color: var(--color-primary-hover);
    color: #ffffff;
}

.footer-link:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
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
