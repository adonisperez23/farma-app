import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import TermsPage from '../views/TermsPage.vue'
import PrivacyPage from '../views/PrivacyPage.vue'
import LegalNoticePage from '../views/LegalNoticePage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/terminos',
    name: 'Terms',
    component: TermsPage,
  },
  {
    path: '/privacidad',
    name: 'Privacy',
    component: PrivacyPage,
  },
  {
    path: '/aviso-legal',
    name: 'LegalNotice',
    component: LegalNoticePage,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
