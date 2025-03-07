// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     exclude: ['lucide-react'],
//   },
// });



//Main
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:4000',
//         changeOrigin: true,
//         secure: false
//       },
//     },
//   },
// });





import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // define: {
  //   // Use placeholders that will be replaced at runtime
  //   'import.meta.env.VITE_BACK_END_URL': JSON.stringify('__VITE_BACK_END_URL__'),
  //   'import.meta.env.VITE_ML_API_URL': JSON.stringify('__VITE_ML_API_URL__')
  // },
  define: {
    'import.meta.env.VITE_BACK_END_URL': JSON.stringify(process.env.VITE_BACK_END_URL || 'http://localhost:4000'),
    'import.meta.env.VITE_ML_API_URL': JSON.stringify(process.env.VITE_ML_API_URL || 'http://localhost:5001')
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false
      },
    },
  },
});


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';


// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:4000', // Your backend server address
//         changeOrigin: true,
//       },
//     },
//   },
// });