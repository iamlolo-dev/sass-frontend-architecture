import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/components': path.resolve(__dirname, './src/shared/components'),
      '@/lib': path.resolve(__dirname, './src/shared/lib'),
      '@/theme': path.resolve(__dirname, './src/shared/theme'),
      '@/i18n': path.resolve(__dirname, './src/shared/i18n'),
      '@/providers': path.resolve(__dirname, './src/shared/providers'),
      '@/features': path.resolve(__dirname, './src/features'),
      '@': path.resolve(__dirname, './src'),
    },
  },
})
