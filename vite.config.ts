import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      // Proxy the calendar JSON from the remote host to avoid CORS in development
      // Requesting /calendarList.json from the dev server will be forwarded to https://viserix.com/calendarList.json
      '/calendarList.json': {
        target: 'https://viserix.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/calendarList.json/, '/calendarList.json'),
        // ensure the dev-server doesn't cache the proxied response
        configure: (proxy) => {
          // `proxy` is an http-proxy instance; attach a response header modifier
          proxy.on && proxy.on('proxyRes', (proxyRes: any) => {
            try {
              if (proxyRes && proxyRes.headers) {
                proxyRes.headers['cache-control'] = 'no-store, no-cache, must-revalidate, proxy-revalidate';
                proxyRes.headers['pragma'] = 'no-cache';
                proxyRes.headers['expires'] = '0';
              }
            } catch (e) {
              // noop
            }
          });
        }
      },
    },
  },
  plugins: [
    react(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/index-4rACVWn4.js`,
        chunkFileNames: `assets/index-4rACVWn4-chunk.js`,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            return "assets/index-CbY7q7_C.css";
          }
          return "assets/[name][extname]";
        },
      },
    },
  },
}));
