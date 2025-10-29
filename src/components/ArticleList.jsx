import React from 'react';
import styled from 'styled-components';
import ArticleCard from './ArticleCard';

/* 
  Container untuk daftar artikel.
  Menggunakan CSS Grid untuk membuat tata letak yang responsif.
  - `grid-template-columns`: Membuat kolom yang fleksibel.
  - `minmax(250px, 1fr)`: Setiap kolom memiliki lebar minimum 250px.
  - `gap`: Memberikan jarak antar kartu.
*/
const ListContainer = styled.div`
  display: grid;
  gap: 24px;
  margin-bottom: 30px;
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
 */
const ArticleList = ({ articles = [] }) => {
  if (!articles || articles.length === 0) {
    return <NoArticles>No articles found. Try adjusting your filters.</NoArticles>;
  }
  
  return (
    <ListContainer>
      {articles.map((article) => (
        // Use a stable key (prefer url). If url missing, fallback to title + publishedAt.
        <ArticleCard
          key={article.url || `${article.title}-${article.publishedAt}` || Math.random()}
          article={article}
        />
      ))}
    </ListContainer>
  );
};

export default ArticleList;