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
  const pageSize = 10;
  
  /* useEffect untuk mengambil artikel saat kategori, query pencarian, tanggal, atau halaman berubah */
  useEffect(() => {
    fetchArticles();
  }, [category, searchQuery, fromDate, toDate, page]);
  
  /* Fungsi untuk mengambil artikel dari NewsAPI */
  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    
    let endpoint = 'https://newsapi.org/v2/top-headlines';
    let params = new URLSearchParams({
      pageSize: String(pageSize),
      page: String(page),
      country: 'us',
      apiKey: '458c858a92594696ac3dc0fe1f886ee3'  // API key langsung untuk testing
    });

    if (category !== 'all') {
      params.set('category', category);
    }

    if (searchQuery) {
      endpoint = 'https://newsapi.org/v2/everything';
      params = new URLSearchParams({
        q: searchQuery,
        pageSize: String(pageSize),
        page: String(page),
        apiKey: '458c858a92594696ac3dc0fe1f886ee3'
      });
    }

    const url = `${endpoint}?${params.toString()}`;
    
    try {
      /* Mengambil data dari API (proxy) */
      let proxyResponse = await fetch(url).catch(e => {
        // network-level error
        console.error('Network error when requesting proxy URL', url, e);
        return null;
      });

      let data = null;
      let proxyStatus = proxyResponse ? proxyResponse.status : null;

      if (proxyResponse) {
        const contentType = proxyResponse.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          data = await proxyResponse.json();
        } else {
          const text = await proxyResponse.text();
          try {
            data = JSON.parse(text);
          } catch (e) {
            data = { _raw: text };
          }
        }

        // Heuristic: if the proxy served the raw function source (JS) or an HTML page
        // (this happens when the dev server serves the file instead of executing it),
        // treat it as if the proxy is not available so the fallback can run.
        if (data && data._raw && (data._raw.includes('export default') || data._raw.includes('import axios') || data._raw.trim().startsWith('<!doctype') || data._raw.includes('handler(req, res)'))) {
          console.warn('Proxy returned raw file content or HTML; treating proxy as unavailable for local fallback.');
          console.log('Proxy raw preview:', data._raw.slice(0, 300));
          // mark as if no proxy response so fallback will attempt direct NewsAPI (dev only)
          proxyResponse = null; // eslint-disable-line no-param-reassign
          proxyStatus = null;
          data = null;
        } else {
          console.log('NewsAPI response (proxy)', data);
          console.log('Requested url (proxy):', url, 'status', proxyStatus);
        }
      } else {
        console.warn('Proxy response was null (network error) for', url);
      }

      // Helper to collect articles and, if needed, fetch subsequent pages.
      // Accepts the API data and the URL that was used for the initial fetch so
      // pagination requests use the same origin/endpoint (important when falling
      // back to the direct NewsAPI URL vs the local /api proxy).
      const handleArticlesFrom = (apiData, requestedUrl) => {
        let collected = Array.isArray(apiData.articles) ? [...apiData.articles] : [];
        const totalResultsFromAPI = apiData.totalResults || 0;

        // Use the requestedUrl passed in (it may be the proxy URL or the direct NewsAPI URL)
        const effectiveUrl = requestedUrl || url;
        let endpointBase = effectiveUrl.split('?')[0];
        const baseParams = new URLSearchParams(effectiveUrl.split('?')[1] || '');
        const maxApiPages = Math.max(1, Math.ceil(totalResultsFromAPI / pageSize));
        let apiPage = parseInt(baseParams.get('page') || page, 10);

        return (async () => {
          while (collected.length < pageSize && apiPage < maxApiPages) {
            apiPage += 1;
            baseParams.set('page', String(apiPage));
            const nextUrl = `${endpointBase}?${baseParams.toString()}`;
            console.log('Fetching additional page to fill pageSize:', nextUrl);
            // eslint-disable-next-line no-await-in-loop
            const nextResp = await fetch(nextUrl);
            // eslint-disable-next-line no-await-in-loop
            const nextData = await nextResp.json();
            if (nextData.status !== 'ok' || !Array.isArray(nextData.articles) || nextData.articles.length === 0) {
              break;
            }
            for (const a of nextData.articles) {
              if (!collected.some(x => x.url === a.url)) {
                collected.push(a);
              }
              if (collected.length >= pageSize) break;
            }
          }
          setArticles(collected.slice(0, pageSize));
          setTotalResults(totalResultsFromAPI);
        })();
      };

      // If proxy returned a valid JSON and status ok
      if (proxyResponse && proxyResponse.ok && data && data.status === 'ok') {
        await handleArticlesFrom(data, url);
      } else {
        // If proxy is missing (404) or network error, and we're running locally, try direct NewsAPI (dev only)
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const viteKey = import.meta.env.VITE_NEWS_API_KEY;

        if ((proxyStatus === 404 || proxyStatus === 502 || !proxyResponse) && isLocal && viteKey) {
          console.log('Proxy not available locally; falling back to direct NewsAPI using VITE_NEWS_API_KEY (dev only)');
          // Build direct NewsAPI URL based on current params
          const directParams = new URLSearchParams(params.toString());
          directParams.set('apiKey', viteKey);
          // Decide endpoint: reuse the same path logic as server proxy (top-headlines vs everything)
          // For simplicity, call the server endpoint used earlier by frontend
          const directUrl = endpoint.includes('everything') || params.get('q') ? `https://newsapi.org/v2/everything?${directParams.toString()}` : `https://newsapi.org/v2/top-headlines?${directParams.toString()}`;

          try {
            const directResp = await fetch(directUrl);
            const directData = await directResp.json();
            console.log('Direct NewsAPI response', directData, 'url', directUrl);
            if (directData && directData.status === 'ok') {
              await handleArticlesFrom(directData, directUrl);
            } else {
              setError(directData && directData.message ? `NewsAPI: ${directData.message}` : `Upstream NewsAPI error (${directResp.status})`);
            }
          } catch (e) {
            console.error('Direct NewsAPI fetch failed', e);
            setError(`Failed to fetch articles (direct): ${e.message}`);
          }
        } else {
          // If proxy returned JSON with an error message, show it; otherwise show status
          // If proxy returned a 200 but payload doesn't match expected shape, include a concise
          // snippet of the proxy response to make debugging easier (e.g. HTML or error page).
          let msg;
          if (data && data.message) {
            msg = data.message;
          } else if (proxyStatus) {
            if (proxyStatus === 200 && data) {
              // Show a short preview of the unexpected response body
              const preview = typeof data === 'string' ? data.slice(0,300) : JSON.stringify(data).slice(0,300);
              msg = `Unexpected proxy response (200). Preview: ${preview}`;
            } else {
              msg = `Request failed (${proxyStatus})`;
            }
          } else {
            msg = 'Failed to fetch articles';
          }
          setError(msg || 'Failed to fetch articles. Please try again later.');
        }
      }
    } catch (err) {
      console.error('Unexpected error fetching articles', err);
      setError(`Failed to fetch articles. ${err.message}`);
    } finally {
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