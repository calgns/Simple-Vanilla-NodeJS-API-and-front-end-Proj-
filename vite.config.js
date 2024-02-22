import { defineConfig } from 'vite';
import path from "node:path";
import process from "node:process";

export default defineConfig({
  // Include dependencies for pre-bundling
  optimizeDeps: {
    include: ['/src/assets/js/*.js', '/src/assets/json/*.json'], // Replace with actual dependency names if needed
  },
  // Set the server port strictly
  root: "src",
  publicDir: "/src/assets/**/*",
  build: {outDir: "../dist"},
  server: {
    // base: '/',
    port:  8080,
    strictPort: true,
  },
  resolve: {
    alias: { "/src": path.resolve(process.cwd(), "src") }
  },
});
