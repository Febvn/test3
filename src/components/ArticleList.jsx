import React from 'react';
import styled from 'styled-components';
import ArticleCard from './ArticleCard';

/* 
  Container untuk daftar artikel.
  Menggunakan CSS Grid untuk membuat tata letak yang responsif.
  - `grid-template-columns`: Membuat kolom yang fleksibel. `auto-fill` akan mengisi baris dengan sebanyak mungkin kolom yang muat.
  - `minmax(300px, 1fr)`: Setiap kolom memiliki lebar minimum 300px dan lebar maksimum 1fr (fractional unit, yaitu bagian dari ruang yang tersedia).
  - `gap`: Memberikan jarak antar kartu.
*/
const ListContainer = styled.div`
  display: grid;
  gap: 24px;
  margin-bottom: 30px;
  /* Responsive grid: 1 column on very small, then 2,3,4 columns on larger screens */
  grid-template-columns: repeat(1, 1fr);

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

/* 
  Komponen pesan yang ditampilkan jika tidak ada artikel yang ditemukan.
  Styling-nya konsisten dengan tema desain kartu (border tebal dan shadow).
*/
const NoArticles = styled.div`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  padding: 20px;
  background-color: #fff;
  border: 6px solid #000;
  box-shadow: 12px 12px 0 #000;
  margin: 20px 0;
`;

/**
 * Komponen untuk menampilkan daftar kartu artikel.
 * Menerima props `articles` yang merupakan array dari objek artikel.
 * Jika array kosong atau tidak ada, akan menampilkan pesan 'NoArticles'.
 * Jika tidak, akan memetakan (map) setiap artikel ke komponen `ArticleCard`.
 */
const ArticleList = ({ articles }) => {
  // Cek jika props `articles` tidak ada atau kosong, lalu tampilkan pesan.
  if (!articles || articles.length === 0) {
    return <NoArticles>No articles found. Try adjusting your filters.</NoArticles>;
  }
  
  // Jika ada artikel, render mereka di dalam grid container.
  return (
    <ListContainer>
      {/* 
        Memetakan array `articles` untuk membuat komponen `ArticleCard` untuk setiap item.
        `key={index}` digunakan untuk membantu React mengidentifikasi setiap item dalam daftar.
        Namun, menggunakan `index` sebagai `key` tidak ideal jika daftar bisa berubah (ditambah, diurutkan, atau dihapus).
        Sebaiknya gunakan ID yang unik dari artikel itu sendiri jika tersedia (misalnya, `article.url`).
      */}
      {articles.map((article) => (
        // Use article.url as a stable key when available
        <ArticleCard key={article.url || article.title} article={article} />
      ))}
    </ListContainer>
  );
};

export default ArticleList;