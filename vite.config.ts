import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  console.log('--- BUILD TIME ENVIRONMENT INFO ---');
  console.log('process.env.DISABLE_HMR is:', process.env.DISABLE_HMR);
  console.log('-----------------------------------');

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      hmr: {
        protocol: 'wss',
        clientPort: 443,
      },
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: false,
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('three') || id.includes('@react-three')) {
                return 'three-bundle';
              }
              if (id.includes('jspdf') || id.includes('html2canvas')) {
                return 'pdf-bundle';
              }
              if (id.includes('recharts') || id.includes('d3')) {
                return 'charts-bundle';
              }
              return 'vendor';
            }
          }
        }
      }
    }
  };
});
