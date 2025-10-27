File: src/index.css

```css
body {
  margin: 0;
  font-family: 'Courier New', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f0f0f0;
}

* {
  box-sizing: border-box;
}

#root {
  min-height: 100vh;
}
```

Penjelasan baris-per-baris singkat:
- `body { margin: 0; }` : Menghapus margin default browser agar layout pas ke tepi.
- `font-family: 'Courier New', monospace;` : Mengatur font monospace untuk seluruh aplikasi.
- `-webkit-font-smoothing` / `-moz-osx-font-smoothing`: Menghaluskan render font di browser tertentu.
- `background-color: #f0f0f0;` : Latar belakang halaman berwarna abu-abu terang.
- `* { box-sizing: border-box; }` : Mengubah box sizing untuk semua elemen sehingga padding dan border termasuk ke dalam ukuran elemen.
- `#root { min-height: 100vh; }` : Memastikan kontainer root mengambil minimal tinggi layar.
