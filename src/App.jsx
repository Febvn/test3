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
  const API_KEY = '5615ef546a5b4256a55af311eedf8480';
  /* Jumlah artikel per halaman */
  const pageSize = 10;
  
  /* useEffect untuk mengambil artikel saat kategori, query pencarian, tanggal, atau halaman berubah */
  useEffect(() => {
    fetchArticles();
  }, [category, searchQuery, fromDate, toDate, page]);
  
  /* Fungsi untuk mengambil artikel dari NewsAPI */
  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    
   let url = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&pageSize=${pageSize}&page=${page}&country=us`;
    /* Menambahkan kategori ke URL jika bukan 'all' */
    if (category !== 'all') {
      url += `&category=${category}`;
    }
    
    /* Mengubah URL jika ada query pencarian */
    if (searchQuery) {
      url = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${API_KEY}&pageSize=${pageSize}&page=${page}`;
    }
    
    /* Menambahkan filter tanggal awal */
    if (fromDate) {
      url += `&from=${fromDate}`;
    }
    
    /* Menambahkan filter tanggal akhir */
    if (toDate) {
      url += `&to=${toDate}`;
    }
    
    try {
      /* Mengambil data dari API */
      const response = await fetch(url);
      const data = await response.json();
      
      /* Memproses data jika status 'ok' */
      if (data.status === 'ok') {
        setArticles(data.articles);
        setTotalResults(data.totalResults);
      } else {
        /* Menampilkan pesan error jika status bukan 'ok' */
        setError(data.message || 'Failed to fetch articles');
      }
    } catch (err) {
      /* Menampilkan pesan error jika terjadi kesalahan */
      setError('Failed to fetch articles. Please try again later.');
    } finally {
      /* Menghentikan status loading */
      setLoading(false);
    }
  };
  
  /* Fungsi untuk menangani perubahan kategori */
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
  };
  
  /* Fungsi untuk menangani pencarian */
  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
  };
  
  /* Fungsi untuk menangani filter tanggal */
  const handleDateFilter = (from, to) => {
    setFromDate(from);
    setToDate(to);
    setPage(1);
  };
  
  /* Fungsi untuk menangani perubahan halaman */
  const handlePageChange = (newPage) => {
    setPage(newPage);
    /* Menggulir ke atas halaman saat halaman berubah */
    window.scrollTo(0, 0);
  };
  
  /* Render struktur aplikasi */
  return (
    <AppContainer>
      <MainContent>
        {/* Header dengan judul dan deskripsi */}
        <Header>
          <h1>BRUTAL NEWS</h1>
          <p>No filters, just raw information</p>
        </Header>
        
        {/* Komponen navigasi dengan kategori, pencarian, dan filter */}
        <Navigation 
          activeCategory={category} 
          onCategoryChange={handleCategoryChange}
          onSearch={handleSearch}
          onFilter={handleDateFilter}
        />
        
        {/* Menampilkan pesan loading saat sedang mengambil data */}
        {loading && <LoadingMessage>Loading articles...</LoadingMessage>}
        {/* Menampilkan pesan error jika terjadi kesalahan */}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        {/* Menampilkan daftar artikel dan pagination jika tidak ada loading atau error */}
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
      
      {/* Komponen footer di bagian bawah halaman */}
      <Footer /> {/* <-- GUNAKAN FOOTER DI SINI */}
    </AppContainer>
  );
}

/* Mengekspor komponen App sebagai default */
export default App;