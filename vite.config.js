import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import windiCSS from 'vite-plugin-windicss'; // Import WindiCSS

export default defineConfig({
  plugins: [
    react(),
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.jsx'],
      refresh: true,
    }),
    windiCSS(), // Use WindiCSS plugin
  ],
  resolve: {
    alias: {
      '@': '/resources/js', // Adjust this alias based on your project structure
    },
  },
});
