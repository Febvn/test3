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
  // CARI BARIS INI (sekitar line 75):
// NOTE: API key must NOT be used in frontend code when deployed.
// We proxy requests through a serverless function at /api/news which
// uses process.env.NEWSAPI_KEY. Remove any hard-coded API keys.

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
    
  // Build endpoint and params. Use `everything` when searching or when date filters are applied,
  // because `top-headlines` does not support `from`/`to`.
  // Call our serverless proxy on the same origin. The proxy will add the API key.
  let endpoint = '/api/get-news';
    let params = new URLSearchParams({
      pageSize: String(pageSize),
      page: String(page),
      country: 'us'
    });

    // Category applies only to top-headlines
    if (category !== 'all') {
      params.set('category', category);
    }

    // If there's a search query, switch to everything endpoint (supports date filtering)
    if (searchQuery) {
      // still call our proxy; it will map to the 'everything' endpoint server-side
      endpoint = '/api/get-news';
      params = new URLSearchParams({
        q: searchQuery,
        pageSize: String(pageSize),
        page: String(page)
      });
    }

    // If user applied date filters but there's no search query, use 'everything' and a generic q
    // so the API honors the from/to params. Using q='news' as a broad default.
    if (!searchQuery && (fromDate || toDate)) {
      // use proxy; proxy will call 'everything' server-side and we provide a generic q
      endpoint = '/api/get-news';
      params = new URLSearchParams({
        q: 'news',
        pageSize: String(pageSize),
        page: String(page)
      });
    }

    if (fromDate) params.set('from', fromDate);
    if (toDate) params.set('to', toDate);

    const url = `${endpoint}?${params.toString()}`;
    
    try {
      /* Mengambil data dari API */
      const response = await fetch(url);
      const data = await response.json();
      console.log('NewsAPI response', data);
      console.log('Requested url:', url);

      /* Memproses data jika status 'ok' */
      if (data.status === 'ok') {
        // Jika API mengembalikan lebih sedikit artikel daripada pageSize,
        // cobalah mengambil halaman API berikutnya dan gabungkan hasilnya
        // sampai kita punya pageSize item atau tidak ada lagi.
        let collected = Array.isArray(data.articles) ? [...data.articles] : [];
        const totalResultsFromAPI = data.totalResults || 0;

        // Bangun ulang endpoint & params agar mudah mengambil halaman berikutnya
        let endpoint = url.split('?')[0];
        const baseParams = new URLSearchParams(url.split('?')[1] || '');
        // Hitung jumlah halaman API maksimal yang tersedia
        const maxApiPages = Math.max(1, Math.ceil(totalResultsFromAPI / pageSize));

        let apiPage = parseInt(baseParams.get('page') || page, 10);

        while (collected.length < pageSize && apiPage < maxApiPages) {
          apiPage += 1;
          baseParams.set('page', String(apiPage));
          const nextUrl = `${endpoint}?${baseParams.toString()}`;
          console.log('Fetching additional page to fill pageSize:', nextUrl);
          // Fetch next API page
          // Note: this may increase API usage / hit rate limits on NewsAPI. Use cautiously.
          // If you hit rate limits, consider increasing pageSize server-side or adjusting logic.
          // eslint-disable-next-line no-await-in-loop
          const nextResp = await fetch(nextUrl);
          // eslint-disable-next-line no-await-in-loop
          const nextData = await nextResp.json();
          if (nextData.status !== 'ok' || !Array.isArray(nextData.articles) || nextData.articles.length === 0) {
            break;
          }
          // Add unique articles (by url) to avoid duplicates
          for (const a of nextData.articles) {
            if (!collected.some(x => x.url === a.url)) {
              collected.push(a);
            }
            if (collected.length >= pageSize) break;
          }
        }

        // Set articles (limit to pageSize) and totalResults
        setArticles(collected.slice(0, pageSize));
        setTotalResults(totalResultsFromAPI);
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
            {/* Debug/info: show how many articles were received and totalResults */}
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