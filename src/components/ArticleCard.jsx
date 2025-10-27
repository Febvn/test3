import React from 'react';
import styled from 'styled-components';

/* Container utama untuk kartu artikel dengan styling border dan shadow */
const CardContainer = styled.div`
  background-color: #fff;
  border: 6px solid #000;
  box-shadow: 12px 12px 0 #000;
  overflow: hidden;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  /* Efek hover yang menggeser kartu sedikit ke kiri atas dan memperbesar shadow */
  &:hover {
    transform: translate(-5px, -5px);
    box-shadow: 17px 17px 0 #000;
  }
`;

/* Komponen untuk menampilkan gambar artikel dengan ukuran tetap */
const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 6px solid #000;
`;

/* Container untuk konten artikel dengan padding dan layout flex */
const CardContent = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

/* Judul artikel dengan efek underline animasi saat hover */
const CardTitle = styled.h3`
  font-size: 22px;
  font-weight: 900;
  margin: 0 0 15px;
  line-height: 1.2;
  text-transform: ; /* Properti ini kosong, mungkin perlu ditambahkan nilai seperti 'uppercase' */
  position: relative;
  overflow: hidden;
  
  /* Garis bawah animasi yang muncul dari kiri saat hover */
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 90%;
    height: 3px;
    background-color: #000;
    transform: translateX(-100%);
    transition: transform 0.3s;
  }
  
  /* Animasi underline saat container di-hover */
  ${CardContainer}:hover &::after {
    transform: translateX(0);
  }
`;

/* Deskripsi artikel dengan ukuran font dan line-height yang ditentukan */
const CardDescription = styled.p`
  font-size: 16px;
  line-height: 1.4;
  margin: 0 0 15px;
  flex: 1;
`;

/* Container untuk metadata (sumber dan tanggal) dengan layout flex */
const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: bold;
  margin-top: auto;
`;

/* Badge untuk menampilkan sumber artikel */
const CardSource = styled.span`
  background-color: #000;
  color: #fff;
  padding: 5px 10px;
  border: 3px solid #000;
`;

/* Badge untuk menampilkan tanggal publikasi artikel */
const CardDate = styled.span`
  background-color: #000000ff; /* Nilai alpha 'ff' redundan karena sudah solid hitam */
  color: #fff;
  padding: 5px 10px;
  border: 3px solid #000;
`;

/* Tombol link untuk membaca artikel lengkap dengan efek hover */
const CardLink = styled.a`
  display: block;
  margin-top: 15px;
  background-color: #000;
  color: #fff;
  text-align: center;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
  border: 3px solid #000;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  
  &:hover {
    color: #ffffffff; /* Nilai 'ffffffff' redundan, bisa cukup '#fff' */
  }
  
  /* Efek latar belakang hijau yang muncul dari kiri saat hover */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #5ad641;
    transform: translateX(-100%);
    transition: transform 0.3s;
    z-index: -1;
  }
  
  &:hover::before {
    transform: translateX(0);
  }
`;

/* Komponen utama ArticleCard yang menerima props artikel */
const ArticleCard = ({ article }) => {
  /* Fungsi untuk memformat tanggal menjadi format yang lebih mudah dibaca */
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <CardContainer>
      {/* Menampilkan gambar artikel jika tersedia */}
      {article.urlToImage && (
        <CardImage src={article.urlToImage} alt={article.title} />
      )}
      <CardContent>
        <CardTitle>{article.title}</CardTitle>
        <CardDescription>{article.description}</CardDescription>
        <CardMeta>
          <CardSource>{article.source.name}</CardSource>
          <CardDate>{formatDate(article.publishedAt)}</CardDate>
        </CardMeta>
        {/* Link ke artikel lengkap */}
        <CardLink href={article.url} target="_blank" rel="noopener noreferrer">
          Read More
        </CardLink>
      </CardContent>
    </CardContainer>
  );
};

export default ArticleCard;