import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/app': path.resolve(__dirname, './src/app'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/features': path.resolve(__dirname, './src/features'),
      '@/shared': path.resolve(__dirname, './src/shared'),
      '@/shared/components': path.resolve(__dirname, './src/shared/components'),
      '@/shared/ui': path.resolve(__dirname, './src/shared/components/ui'),
      '@/shared/lib': path.resolve(__dirname, './src/shared/lib'),
      '@/shared/theme': path.resolve(__dirname, './src/shared/theme'),
      '@/shared/i18n': path.resolve(__dirname, './src/shared/i18n'),
      '@/shared/providers': path.resolve(__dirname, './src/app/providers'),
      '@/shared/layout': path.resolve(__dirname, './src/shared/layout'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@': path.resolve(__dirname, './src'),
    },
  },
})
