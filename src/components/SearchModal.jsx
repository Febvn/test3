/* src/components/SearchModal.jsx */
/* Mengimpor library React dan hook useState untuk fungsionalitas komponen dan manajemen state */
import React, { useState } from 'react';
/* Mengimpor styled-components untuk membuat komponen React dengan gaya CSS */
import styled from 'styled-components';

/* ModalOverlay - Lapisan latar belakang semi-transparan yang menutupi seluruh layar */
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

/* ModalContent - Kotak konten modal dengan latar belakang putih, border tebal, dan bayangan */
const ModalContent = styled.div`
  background-color: #fff;
  border: 6px solid #000;
  box-shadow: 12px 12px 0 #000;
  padding: 30px;
  width: 90%;
  max-width: 500px;
  position: relative;
  
  /* Responsif untuk layar yang lebih kecil */
  @media (max-width: 768px) {
    width: 95%;
    padding: 20px;
  }
`;

/* ModalTitle - Judul modal dengan gaya tebal, huruf besar, dan rata tengah */
const ModalTitle = styled.h2`
  font-size: 28px;
  font-weight: 900;
  text-transform: uppercase;
  margin: 0 0 20px;
  text-align: center;
`;

/* CloseButton - Tombol silang (X) di pojok kanan atas untuk menutup modal */
const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: #000;
  color: #fff;
  border: 3px solid #000;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  
  /* Efek hover dengan pergeseran ke atas dan bayangan */
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 0 #000;
  }
  
  /* Efek saat tombol ditekan */
  &:active {
    transform: translateY(0);
    box-shadow: 0 3px 0 #000;
  }
  
  /* Gaya untuk ikon SVG di dalam tombol */
  svg {
    width: 20px;
    height: 20px;
    fill: #fff;
  }
`;

/* SearchForm - Formulir pencarian dengan tata letak kolom dan jarak antar elemen */
const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

/* SearchInput - Input teks untuk kata kunci pencarian dengan efek fokus khusus */
const SearchInput = styled.input`
  padding: 15px;
  border: 3px solid #000;
  font-size: 16px;
  font-family: inherit;
  transition: all 0.3s;
  
  /* Efek fokus dengan latar belakang hitam dan teks putih */
  &:focus {
    outline: none;
    background-color: #000;
    color: #fff;
    transform: scale(1.02);
  }
`;

/* SearchButton - Tombol untuk mengirimkan pencarian dengan efek hover yang mengubah warna latar dan teks */
const SearchButton = styled.button`
  background-color: #000;
  color: #fff;
  border: 3px solid #000;
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s;
  
  /* Efek hover dengan warna terbalik dan bayangan */
  &:hover {
    background-color: #fff;
    color: #000;
    transform: translateY(-3px);
    box-shadow: 0 6px 0 #000;
  }
  
  /* Efek saat tombol ditekan */
  &:active {
    transform: translateY(0);
    box-shadow: 0 3px 0 #000;
  }
`;

/* SearchModal - Komponen modal untuk fungsi pencarian artikel */
const SearchModal = ({ isOpen, onClose, onSearch }) => {
  /* State untuk menyimpan kata kunci pencarian */
  const [query, setQuery] = useState('');
  
  /* Fungsi untuk menangani pengiriman formulir pencarian */
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
    onClose();
  };
  
  /* Jika modal tidak terbuka, tidak merender apa-apa */
  if (!isOpen) return null;
  
  /* Render struktur modal dengan overlay, konten, tombol tutup, judul, dan formulir */
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </CloseButton>
        
        <ModalTitle>Search Articles</ModalTitle>
        
        <SearchForm onSubmit={handleSubmit}>
          <SearchInput
            type="text"
            placeholder="Enter keywords..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <SearchButton type="submit">Search</SearchButton>
        </SearchForm>
      </ModalContent>
    </ModalOverlay>
  );
};

/* Mengekspor komponen SearchModal sebagai default */
export default SearchModal;