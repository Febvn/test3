{
  // Nama proyek/aplikasi
  "name": "news-portal",
  
  // Menandakan ini adalah proyek private (tidak akan dipublish ke npm registry)
  "private": true,
  
  // Versi proyek (masih dalam pengembangan awal)
  "version": "0.0.0",
  
  // Menentukan bahwa modul ES6 akan digunakan (import/export syntax)
  "type": "module",
  
  // Script-script yang dapat dijalankan dengan npm/yarn
  "scripts": {
    // Menjalankan development server dengan Vite
    "dev": "vite",
    
    // Membuild proyek untuk production
    "build": "vite build",
    
    // Menjalankan ESLint untuk memeriksa kualitas code
    // --ext js,jsx : hanya memeriksa file .js dan .jsx
    // --report-unused-disable-directives : melaporkan directive ESLint yang tidak terpakai
    // --max-warnings 0 : gagal jika ada warning (zero tolerance)
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    
    // Menjalankan preview dari build production secara lokal
    "preview": "vite preview"
  },
  
  // Dependencies yang dibutuhkan aplikasi untuk berjalan di production
  "dependencies": {
    // React library untuk membangun user interface
    "react": "^18.2.0",
    
    // DOM-specific methods untuk React
    "react-dom": "^18.2.0",
    
    // Library CSS-in-JS untuk styling components
    "styled-components": "^5.3.11"
  },
  
  // Dependencies yang hanya dibutuhkan selama development
  "devDependencies": {
    // Type definitions untuk React (berguna untuk TypeScript dan IDE support)
    "@types/react": "^18.2.15",
    
    // Type definitions untuk ReactDOM
    "@types/react-dom": "^18.2.7",
    
    // Plugin React untuk Vite (menyediakan Fast Refresh dan optimasi)
    "@vitejs/plugin-react": "^4.0.3",
    
    // Linter untuk JavaScript/TypeScript (memeriksa kualitas code)
    "eslint": "^8.45.0",
    
    // Aturan linting khusus untuk React
    "eslint-plugin-react": "^7.32.2",
    
    // Aturan linting untuk React Hooks
    "eslint-plugin-react-hooks": "^4.6.0",
    
    // Plugin untuk React Refresh (hot reloading)
    "eslint-plugin-react-refresh": "^0.4.3",
    
    // Build tool modern yang cepat untuk development dan production
    "vite": "^4.4.5"
  }
}