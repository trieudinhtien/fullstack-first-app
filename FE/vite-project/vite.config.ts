import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@assets": path.join(__dirname, "src/assets"),
      "@components": path.join(__dirname, "src/components"),
      "@pages": path.join(__dirname, "src/pages"),
      "@stores": path.join(__dirname, "src/stores"),
    },
  },

  server: {
    port: 3000,
    open: true,
  },
});
