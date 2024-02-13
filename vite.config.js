// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  // Define the entry point for your application
  rollupOptions: {
    input: './src/page/index.html', // Replace with your actual entry point file
  },
  // Include dependencies for pre-bundling
  optimizeDeps: {
    include: ['/src/assets/js/*.js', '/src/assets/json/*.json'], // Replace with actual dependency names if needed
  },
  // Set the server port strictly
  server: {
    port:  8080,
    strictPort: true,
  },
});
