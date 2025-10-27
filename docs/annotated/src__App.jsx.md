File: src/App.jsx

```jsx
// src/App.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navigation from './components/Navigation';
import ArticleList from './components/ArticleList';
import Pagination from './components/Pagination';
import Footer from './components/Footer'; // <-- IMPORT FOOTER

const AppContainer = styled.div`
  font-family: 'Courier New', monospace;
  background-color: #ffffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
`;

const Header = styled.header`
  background-color: #000;
  color: #fff;
  padding: 20px;
  margin-bottom: 30px;
  border: 6px solid #000;

  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      rgba(0, 0, 0, 0.1) 10px,
      rgba(0, 0, 0, 0.1) 20px
    );
    z-index: 1;
  }
  
  h1 {
    font-size: 48px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -2px;
    margin: 0;
    position: relative;
    z-index: 2;
  }
  
  p {
    font-size: 18px;
    margin: 10px 0 0;
    position: relative;
    z-index: 2;
  }
`;

const LoadingMessage = styled.div`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  padding: 20px;
  background-color: #fff;
  border: 6px solid #000;
  box-shadow: 12px 12px 0 #000;
  margin: 20px 0;
`;

const ErrorMessage = styled.div`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  padding: 20px;
  background-color: #ff3b30;
  color: #fff;
  border: 6px solid #000;
  box-shadow: 12px 12px 0 #000;
  margin: 20px 0;
`;

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('technology');
  const [searchQuery, setSearchQuery] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  
  const API_KEY = '5615ef546a5b4256a55af311eedf8480';
  const pageSize = 10;
  
  useEffect(() => {
    fetchArticles();
  }, [category, searchQuery, fromDate, toDate, page]);
  
  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    
    let url = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&pageSize=${pageSize}&page=${page}`;
    
    if (category !== 'all') {
      url += `&category=${category}`;
    }
    
    if (searchQuery) {
      url = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${API_KEY}&pageSize=${pageSize}&page=${page}`;
    }
    
    if (fromDate) {
      url += `&from=${fromDate}`;
    }
    
    if (toDate) {
      url += `&to=${toDate}`;
    }
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.status === 'ok') {
        setArticles(data.articles);
        setTotalResults(data.totalResults);
      } else {
        setError(data.message || 'Failed to fetch articles');
      }
    } catch (err) {
      setError('Failed to fetch articles. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
  };
  
  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
  };
  
  const handleDateFilter = (from, to) => {
    setFromDate(from);
    setToDate(to);
    setPage(1);
  };
  
  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };
  
  return (
    <AppContainer>
      <MainContent>
        <Header>
          <h1>BRUTAL NEWS</h1>
          <p>No filters, just raw information</p>
        </Header>
        
        <Navigation 
          activeCategory={category} 
          onCategoryChange={handleCategoryChange}
          onSearch={handleSearch}
          onFilter={handleDateFilter}
        />
        
        {loading && <LoadingMessage>Loading articles...</LoadingMessage>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        {!loading && !error && (
          <>
            <ArticleList articles={articles} />
            <Pagination 
              currentPage={page} 
              totalPages={Math.ceil(totalResults / pageSize)} 
              onPageChange={handlePageChange} 
            />
          </>
        )}
      </MainContent>
      
      <Footer /> {/* <-- GUNAKAN FOOTER DI SINI */}
    </AppContainer>
  );
}

export default App;
```

Penjelasan (baris-per-baris / blok) dalam Bahasa Indonesia:

1. Baris 1-3: Import React, hook `useState` dan `useEffect` dan `styled-components` untuk styling berbasis JS.
2. Baris 4-7: Import komponen-komponen lain yang dipakai seperti navigasi, daftar artikel, pagination dan footer.
3. Baris 9-18: `AppContainer` — styled component untuk wrapper utama aplikasi (mengatur font dan layout vertikal).
4. Baris 20-23: `MainContent` — area utama konten (mengambil sisa ruang dengan flex:1).
5. Baris 25-72: `Header` — styling header dengan background hitam, overlay pattern, dan aturan untuk h1/p.
6. Baris 74-85: `LoadingMessage` — tampilan loading dengan border dan shadow.
7. Baris 87-98: `ErrorMessage` — tampilan error (merah) saat fetch gagal.
8. Baris 100-111: `App` function component: deklarasi state untuk artikel, loading, error, kategori, query, tanggal, halaman, dan total hasil.
9. Baris 113-114: `API_KEY` dan `pageSize` (API key disimpan secara statis di sini; sebaiknya pindah ke env var untuk produksi).
10. Baris 116-118: `useEffect` memicu `fetchArticles` setiap ada perubahan pada filter/kategori/halaman.
11. Baris 120-165: `fetchArticles` — membangun URL request berdasarkan kondisi (kategori, search, from/to) lalu mem-fetch dari NewsAPI, meng-set state berdasarkan respon.
12. Baris 167-187: Handler untuk perubahan kategori, pencarian, filter tanggal, dan perubahan halaman.
13. Baris 189-225: JSX render: header, `Navigation` (props untuk komunikasi), kondisi loading/error, `ArticleList` dan `Pagination`, dan `Footer`.
14. Baris 227: Export default `App`.

Catatan tambahan:
- Kode ini bergantung pada response structure dari NewsAPI (fields `articles` dan `totalResults`).
- `API_KEY` hardcoded untuk pengembangan; pindahkan ke `.env` untuk produksi.
- Jika Anda ingin penjelasan per-baris lebih rinci (satu komentar untuk setiap baris), saya bisa memperluas file annotasi ini menjadi daftar dengan nomor baris lengkap.
