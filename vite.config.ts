import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import {resolve} from 'path';
import dts from 'vite-plugin-dts';
import {visualizer} from 'rollup-plugin-visualizer';
import {libInjectCss} from 'vite-plugin-lib-inject-css';
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: 'src/lib',
    }),
    visualizer({open: false}),
    libInjectCss(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'zyzPkg',
      fileName: 'zyz-pkg',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
