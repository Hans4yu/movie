import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // Ensure that the base path is set to the root
  build: {
    outDir: "dist", // Ensure this matches Vercel's deployment structure
    rollupOptions: {
      input: "index.html", // Ensure correct entry point
    },
  },
  server: {
    historyApiFallback: true, // Enables SPA routing on the development server
  },
});
//work
