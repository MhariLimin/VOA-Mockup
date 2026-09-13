import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Reference configuration for Bolt. The local scaffold intentionally runs
// with Vite defaults because this Windows environment blocks Vite's temporary
// bundled-config file. Vite handles this project's TSX without custom config.
export default defineConfig({
  plugins: [react()],
});
