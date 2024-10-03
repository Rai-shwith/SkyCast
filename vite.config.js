import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public', // Set the root to the public folder
  build: {
    outDir: '../dist', // Output build directory
  },
});
