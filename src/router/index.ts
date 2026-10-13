import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw, type RouteLocationNormalized } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import TermsPage from '../views/TermsPage.vue'
import PrivacyPage from '../views/PrivacyPage.vue'
import LegalNoticePage from '../views/LegalNoticePage.vue'
import AboutPage from '../views/AboutPage.vue'
import ContactPage from '../views/ContactPage.vue'
import FaqPage from '../views/FaqPage.vue'
import GuidesIndexPage from '../views/GuidesIndexPage.vue'
import GuideDetailPage from '../views/GuideDetailPage.vue'
import { getArticleBySlug } from '../data/articles'

const SITE_URL = 'https://pharmatch.info'

interface RouteMeta {
    title?: string
    description?: string
}

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'Home',
        component: HomePage,
        meta: {
            title: 'Pharmatch — Comparador de precios de medicamentos',
            description:
                'Compara precios de medicamentos en farmacias de Maturín, Monagas. Busca por nombre o principio activo, filtra por dosis y ahorra en tu compra.',
        } satisfies RouteMeta,
    },
    {
        path: '/terminos',
        name: 'Terms',
        component: TermsPage,
        meta: {
            title: 'Términos y Condiciones de Uso — Pharmatch',
            description:
                'Términos y condiciones de uso de Pharmatch, el comparador de precios de medicamentos.',
        } satisfies RouteMeta,
    },
    {
        path: '/privacidad',
        name: 'Privacy',
        component: PrivacyPage,
        meta: {
            title: 'Políticas de Privacidad — Pharmatch',
            description:
                'Políticas de privacidad de Pharmatch: qué datos recopilamos, cómo se usan y tus derechos como usuario.',
        } satisfies RouteMeta,
    },
    {
        path: '/aviso-legal',
        name: 'LegalNotice',
        component: LegalNoticePage,
        meta: {
            title: 'Aviso Legal — Pharmatch',
            description:
                'Aviso legal y descargo de responsabilidad de Pharmatch, comparador independiente de precios de medicamentos.',
        } satisfies RouteMeta,
    },
    {
        path: '/sobre-nosotros',
        name: 'About',
        component: AboutPage,
        meta: {
            title: 'Sobre nosotros — Pharmatch',
            description:
                'Conoce Pharmatch: cómo recopilamos precios de medicamentos, nuestra independencia y compromiso con tu privacidad.',
        } satisfies RouteMeta,
    },
    {
        path: '/contacto',
        name: 'Contact',
        component: ContactPage,
        meta: {
            title: 'Contacto — Pharmatch',
            description:
                'Contacta al equipo de Pharmatch para preguntas, sugerencias o reportar precios desactualizados.',
        } satisfies RouteMeta,
    },
    {
        path: '/faq',
        name: 'Faq',
        component: FaqPage,
        meta: {
            title: 'Preguntas frecuentes — Pharmatch',
            description:
                'Respuestas a las preguntas más frecuentes sobre Pharmatch: precios, disponibilidad, lista de compra y más.',
        } satisfies RouteMeta,
    },
    {
        path: '/guias',
        name: 'Guides',
        component: GuidesIndexPage,
        meta: {
            title: 'Guías de medicamentos — Pharmatch',
            description:
                'Guías originales sobre medicamentos genéricos, principios activos, dosis y consejos para comparar precios.',
        } satisfies RouteMeta,
    },
    {
        path: '/guias/:slug',
        name: 'GuideDetail',
        component: GuideDetailPage,
        meta: {
            title: 'Guía de medicamentos — Pharmatch',
            description: 'Guía informativa de Pharmatch sobre medicamentos.',
        } satisfies RouteMeta,
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

function setMetaTag(selector: string, attr: 'name' | 'property', key: string, content: string) {
    let el = document.head.querySelector<HTMLMetaElement>(selector)
    if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
    }
    el.setAttribute('content', content)
}

function setCanonical(href: string) {
    let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', 'canonical')
        document.head.appendChild(el)
    }
    el.setAttribute('href', href)
}

router.afterEach((to: RouteLocationNormalized) => {
    const meta = to.meta as RouteMeta
    let title = meta.title || 'Pharmatch — Comparador de precios de medicamentos'
    let description =
        meta.description ||
        'Compara precios de medicamentos en farmacias de Maturín, Monagas.'

    if (to.name === 'GuideDetail') {
        const article = getArticleBySlug(String(to.params.slug ?? ''))
        if (article) {
            title = `${article.title} — Pharmatch`
            description = article.excerpt
        }
    }

    document.title = title
    setMetaTag('meta[name="description"]', 'name', 'description', description)
    setCanonical(`${SITE_URL}${to.path === '/' ? '' : to.path}`)
})

export default router
