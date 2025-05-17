import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Ensure esbuild has appropriate resources
    minify: 'esbuild',
    target: 'es2015',
    sourcemap: true,
    chunkSizeWarningLimit: 2000, // Increased from 1000 to handle larger chunks
    assetsInlineLimit: 4096, // Limit the size of assets to be inlined
  },
  optimizeDeps: {
    // Force inclusion of problematic dependencies
    include: ['react', 'react-dom'],
    // Increase esbuild optimization
    esbuildOptions: {
      target: 'es2015',
      supported: {
        'top-level-await': true,
      },
    }
  },
  esbuild: {
    logOverride: {
      'this-is-undefined-in-esm': 'silent'
    },
    // Additional esbuild configuration for stability
    target: 'es2015',
    legalComments: 'none',
    treeShaking: true,
  },
  server: {
    // Allocate more memory for the dev server
    hmr: {
      overlay: true,
    },
    watch: {
      usePolling: false, // Disable polling to reduce CPU usage
    },
  }
});
