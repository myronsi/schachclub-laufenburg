import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
      componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Warnung, wenn die Chunk-Größe mehr als 600 KB beträgt
    chunkSizeWarningLimit: 600, // Du kannst die Zahl nach Bedarf anpassen

    rollupOptions: {
      output: {
        // Manuelles Chunking: Alle node_modules werden in einen separaten "vendor"-Chunk gepackt
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';  // Diese Zeile sorgt dafür, dass alle node_modules in einen "vendor" Chunk gepackt werden
          }
        }
      }
    }
  }
}));
