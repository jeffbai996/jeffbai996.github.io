import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path
      }
    }
  },
  build: {
    outDir: '..',
    emptyOutDir: false, // Keep false to preserve non-build files in root
    sourcemap: false, // Disabled in production for security
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks - separate heavy dependencies
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-google': ['@google/generative-ai'],
          'vendor-supabase': ['@supabase/supabase-js'],
          // Utils chunk - chatbot utilities
          'chatbot-utils': [
            './src/utils/departmentContext.js',
            './src/utils/departmentCrawler.js',
            './src/utils/intentRecognition.js',
            './src/utils/conversationMemory.js',
            './src/utils/intelligentRouter.js'
          ]
        }
      }
    }
  }
})
