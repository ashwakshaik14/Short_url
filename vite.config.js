import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: parseInt(import.meta.env.VITE_PORT) || 5173, // Use Vite's PORT or fallback to 5173
  },
});
