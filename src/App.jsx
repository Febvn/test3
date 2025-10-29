/* src/App.jsx */
/* Mengimpor library React dan hooks (useState, useEffect) untuk fungsionalitas komponen dan manajemen state */
import React, { useState, useEffect } from 'react';
/* Mengimpor styled-components untuk membuat komponen React dengan gaya CSS */
import styled from 'styled-components';
/* Mengimpor komponen Navigation untuk navigasi */
import Navigation from './components/Navigation';
/* Mengimpor komponen ArticleList untuk menampilkan daftar artikel */
import ArticleList from './components/ArticleList';
/* Mengimpor komponen Pagination untuk navigasi halaman */
import Pagination from './components/Pagination';
/* Mengimpor komponen Footer untuk bagian bawah halaman */
import Footer from './components/Footer'; // <-- IMPORT FOOTER

/* AppContainer - Container utama aplikasi dengan font monospace dan latar belakang putih */
const AppContainer = styled.div`
  font-family: 'Courier New', monospace;
  background-color: #ffffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

/* MainContent - Konten utama aplikasi dengan padding dan flex-grow */
const MainContent = styled.main`
  flex: 1;
  padding: 20px;
`;

/* InfoBar - small debug/info line to show counts */
const InfoBar = styled.div`
  font-size: 14px;
  color: #000;
  background: #fff;
  border: 3px solid #000;
  padding: 8px 12px;
  display: inline-block;
  margin-bottom: 20px;
`;

/* Header - Bagian header dengan latar belakang hitam dan pola diagonal */
const Header = styled.header`
  background-color: #000;
  color: #fff;
  padding: 20px;
  margin-bottom: 30px;
  border: 6px solid #000;

  text-align: center;
  position: relative;
  overflow: hidden;
  
  /* Pseudo-element untuk menambahkan pola diagonal di atas latar belakang */
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
  
  /* Judul header dengan gaya tebal dan huruf besar */
  h1 {
    font-size: 48px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -2px;
    margin: 0;
    position: relative;
    z-index: 2;
  }
  
  /* Deskripsi header */
  p {
    font-size: 18px;
    margin: 10px 0 0;
    position: relative;
    z-index: 2;
  }
`;

/* LoadingMessage - Pesan loading dengan gaya khusus */
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

/* ErrorMessage - Pesan error dengan latar belakang merah */
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

/* Komponen App utama */
function App() {
  /* State untuk menyimpan daftar artikel */
  const [articles, setArticles] = useState([]);
  /* State untuk menampilkan status loading */
  const [loading, setLoading] = useState(false);
  /* State untuk menampilkan pesan error */
  const [error, setError] = useState(null);
  /* State untuk kategori artikel yang dipilih */
  const [category, setCategory] = useState('all');
  /* State untuk query pencarian */
  const [searchQuery, setSearchQuery] = useState('');
  /* State untuk tanggal awal filter */
  const [fromDate, setFromDate] = useState('');
  /* State untuk tanggal akhir filter */
  const [toDate, setToDate] = useState('');
  /* State untuk halaman saat ini */
  const [page, setPage] = useState(1);
  /* State untuk total hasil pencarian */
  const [totalResults, setTotalResults] = useState(0);
  
  /* Kunci API untuk NewsAPI */
// NOTE: API key must NOT be used in frontend code when deployed.
// We proxy requests through a serverless function at /api/news which
// uses process.env.NEWSAPI_KEY. Remove any hard-coded API keys.

  /* Jumlah artikel per halaman */
  const pageSize = 8;
  /* Hitung total halaman berdasarkan totalResults */
  const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));
  
  /* useEffect untuk mengambil artikel saat kategori, query pencarian, tanggal, atau halaman berubah */
  useEffect(() => {
    fetchArticles();
  }, [category, searchQuery, fromDate, toDate, page]);
  
  /* Fungsi untuk mengambil artikel dari NewsAPI */
  const fetchArticles = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize)
      });

      if (searchQuery) {
        // search uses /everything on server; do NOT include category
        params.set('searchQuery', searchQuery);
        if (fromDate) params.set('from', fromDate);
        if (toDate) params.set('to', toDate);
      } else {
        if (category && category !== 'all') params.set('category', category);
      }

      const res = await fetch(`/api/news?${params.toString()}`);
      const text = await res.text();
      if (!res.ok) {
        let parsed;
        try { parsed = JSON.parse(text); } catch (e) { parsed = { error: text }; }
        throw new Error(parsed.error || parsed.message || `HTTP ${res.status}`);
      }
      const data = text ? JSON.parse(text) : null;
      if (!data || data.status !== 'ok') throw new Error(data?.message || 'No articles returned');

      setArticles(data.articles || []);
      setTotalResults(data.totalResults || 0);
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* Fungsi untuk menangani perubahan kategori */
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
  };

  /* Fungsi untuk menangani pencarian artikel */
  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
  };

  /* Fungsi untuk mengatur tanggal awal filter */
  const handleFromDateChange = (date) => {
    setFromDate(date);
    setPage(1);
  };

  /* Fungsi untuk mengatur tanggal akhir filter */
  const handleToDateChange = (date) => {
    setToDate(date);
    setPage(1);
  };

  /* Fungsi untuk mengatur halaman saat ini */
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <AppContainer>
      <Header>
        <h1>BRUTAL NEWS</h1>
        <p>Just raw information, stay brutal.</p>
      </Header>
      <Navigation 
        activeCategory={category}
        onCategoryChange={handleCategoryChange}
        onSearch={handleSearch}
        onFilter={(from, to) => {
          // when Navigation's FilterModal calls onFilter, update App state
          setFromDate(from);
          setToDate(to);
          setPage(1);
        }}
      />
      <MainContent>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {loading && <LoadingMessage>Memuat artikel...</LoadingMessage>}
        {!loading && (
          <>
            {/* Use server-side pagination: assume `articles` already contains
                the items for the current page (returned by the API). This avoids
                slicing the array twice and ensures paging works correctly when
                the backend returns paged results. */}
          
            <ArticleList articles={articles} />
            <Pagination 
              currentPage={page} 
              totalPages={totalPages}
              pageSize={pageSize}
              onPageChange={handlePageChange} 
            />
          </>
        )}
      </MainContent>
      <Footer />
    </AppContainer>
  );
}

/* Mengeksport komponen App sebagai default export */
export default App;