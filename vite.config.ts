import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        vue(),
        tailwindcss(),
        VitePWA({
            registerType: "autoUpdate",
            devOptions: {
                enabled: true,
            },
            workbox: {
                navigateFallback: "/index.html",
                globPatterns: ["**/*.{js,css,html,ico,png,jpg,svg}"],
            },
            injectRegister: "auto",
            manifest: {
                name: "Pharmatch",
                short_name: "Pharmatch",
                description: "Buscador y comparador de precios de medicamentos",
                theme_color: "#0ea5e9",
                icons: [
                    {
                        src: "/logo_pharmat.svg",
                        sizes: "192x192",
                        type: "image/svg",
                    },
                ],
            },
        }),
    ],
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        },
    },
});
