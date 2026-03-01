import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'tekno.eus',
        short_name: 'Tekno.eus',
        description: 'Teknologia eta Digitalizazioa euskaraz, interaktiboa eta doakoa',
        theme_color: '#0891b2',
        background_color: '#f8fafc',
        display: 'standalone',
        lang: 'eu',
        icons: [
          { src: '/icons/icon.svg', sizes: 'any', type: 'image/svg+xml' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/tekno\.eus\/.*/i,
            handler: 'NetworkFirst',
            options: { cacheName: 'pages', networkTimeoutSeconds: 3 },
          },
        ],
      },
    }),
  ],
});
