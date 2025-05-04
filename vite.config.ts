import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  base: "/app/", // wichtig für Deployment unter /app/
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Warnung, wenn die Chunk-Größe mehr als 600 KB beträgt
    chunkSizeWarningLimit: 1200, // Du kannst die Zahl nach Bedarf anpassen
    rollupOptions: {
      output: {
        // Manuelles Chunking: Alle node_modules werden in einen separaten "vendor"-Chunk gepackt
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
}));
