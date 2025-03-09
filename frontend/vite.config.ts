import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import postcssPreset from "postcss-preset-env";
import path from 'path'; 

export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      '#': path.resolve(__dirname, 'src'),
      '#app': path.resolve(__dirname, 'src', 'app'),
      '#css': path.resolve(__dirname, 'src', 'css'),
      '#assets': path.resolve(__dirname, 'src', 'assets'),
      '#utils': path.resolve(__dirname, 'src', 'app', 'utils'),
      '#components': path.resolve(__dirname, 'src', 'app', 'components'),
    },
  },
  css: {
    modules: {
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      localsConvention: 'camelCase',
    },
    postcss: {
        plugins: [
            postcssPreset({
              browsers: 'last 2 versions',
            }),
          ],
    }
  },
});
