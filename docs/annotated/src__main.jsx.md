File: src/main.jsx

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

Penjelasan:
1. Import React core.
2. Import API modern ReactDOM untuk membuat root (`react-dom/client`).
3. Import komponen `App` (entry point aplikasi React).
4. Import stylesheet global `index.css`.
5. `ReactDOM.createRoot(...).render(...)` — inisialisasi aplikasi React ke elemen DOM dengan id `root`, membungkus dengan `React.StrictMode` untuk pengecekan dev.
