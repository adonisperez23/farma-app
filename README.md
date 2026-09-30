# MediAhorro Frontend

Plataforma de ahorro saludable construida con Ionic Vue 3, TypeScript y Tailwind CSS. Es una **PWA** (Progressive Web App) instalable en Android, iOS y escritorio.

## Tecnologías

- [Ionic Framework](https://ionicframework.com/) - UI components
- [Vue 3](https://vuejs.org/) - Framework de frontend
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático
- [Vite](https://vite.dev/) - Build tool
- [Pinia](https://pinia.vuejs.org/) - Gestión de estado
- [Supabase](https://supabase.com/) - Base de datos y API (PostgREST)
- [Tailwind CSS v4](https://tailwindcss.com/) - Estilos utilitarios
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) - Service worker y manifest
- [pnpm](https://pnpm.io/) - Gestor de paquetes

## Instalación

```bash
pnpm install
```

### Variables de entorno

Copia `.env.example` a `.env` y completa los valores (la app falla al iniciar sin ellas):

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key
```

## Desarrollo

```bash
pnpm dev
```

## Build

```bash
pnpm build

# Vista previa del build
pnpm preview
```

## Type check

```bash
pnpm exec vue-tsc --noEmit
```

## Documentación

Ver [Doc.MD](./Doc.MD) para arquitectura, stores, flujos de usuario e instrucciones de instalación de la PWA.
