/* src/components/FilterModal.jsx */
/* Mengimpor pustaka React dan hook useState untuk fungsionalitas komponen dan manajemen state */
import React, { useState } from 'react';
/* Mengimpor styled-components untuk membuat komponen React yang bergaya */
import styled from 'styled-components';

/* ModalOverlay - Lapisan layar penuh dengan latar belakang semi-transparan untuk menciptakan efek modal */
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

/* ModalContent - Kotak konten berwarna putih dengan border tebal dan bayangan yang berisi formulir filter */
const ModalContent = styled.div`
  background-color: #fff;
  border: 6px solid #000;
  box-shadow: 12px 12px 0 #000;
  padding: 30px;
  width: 90%;
  max-width: 500px;
  position: relative;
  
  /* Desain responsif untuk layar yang lebih kecil */
  @media (max-width: 768px) {
    width: 95%;
    padding: 20px;
  }
`;

/* ModalTitle - Judul modal dengan gaya tebal dan huruf besar */
const ModalTitle = styled.h2`
  font-size: 28px;
  font-weight: 900;
  text-transform: uppercase;
  margin: 0 0 20px;
  text-align: center;
`;

/* CloseButton - Tombol X di pojok kanan atas untuk menutup modal dengan efek hover */
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
  
  /* Efek hover dengan pergerakan ke atas dan bayangan */
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 0 #000;
  }
  
  /* Efek aktif saat tombol ditekan */
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

/* FilterForm - Kontainer formulir dengan tata letak flex dan jarak antar elemen */
const FilterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

/* FormGroup - Kontainer untuk setiap bidang formulir beserta label dan inputnya */
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

/* FormLabel - Gaya untuk label formulir dengan teks tebal dan huruf besar */
const FormLabel = styled.label`
  font-weight: bold;
  text-transform: uppercase;
`;

/* DateInput - Bidang input tanggal yang bergaya dengan border tebal dan efek fokus */
const DateInput = styled.input`
  padding: 15px;
  border: 3px solid #000;
  font-size: 16px;
  font-family: inherit;
  transition: all 0.3s;
  
  /* Efek fokus dengan warna terbalik dan sedikit pembesaran */
  &:focus {
    outline: none;
    background-color: #000;
    color: #fff;
    transform: scale(1.02);
  }
`;

/* FilterButton - Tombol kirim dengan efek hover dan animasi latar belakang yang meluncur */
const FilterButton = styled.button`
  background-color: #000;
  color: #fff;
  border: 3px solid #000;
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  
  /* Efek hover dengan pergerakan ke atas dan bayangan */
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 0 #000;
  }
  
  /* Efek aktif saat tombol ditekan */
  &:active {
    transform: translateY(0);
    box-shadow: 0 3px 0 #000;
  }
  
  /* Pseudo-elemen untuk animasi latar belakang yang meluncur */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ff4d4d;
    transform: translateX(-100%);
    transition: transform 0.3s;
    z-index: -1;
  }
  
  /* Animasi pseudo-elemen saat hover */
  &:hover::before {
    transform: translateX(0);
  }
`;

/* FilterModal - Komponen modal untuk menyaring artikel berdasarkan rentang tanggal */
const FilterModal = ({ isOpen, onClose, onFilter }) => {
  /* State untuk menyimpan nilai tanggal 'dari' */
  const [fromDate, setFromDate] = useState('');
  /* State untuk menyimpan nilai tanggal 'hingga' */
  const [toDate, setToDate] = useState('');
  
  /* Menangani pengiriman formulir - memanggil callback onFilter dengan nilai tanggal dan menutup modal */
  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(fromDate, toDate);
    onClose();
  };
  
  /* Jika modal tidak terbuka, jangan render apa-apa */
  if (!isOpen) return null;
  
  /* Render modal dengan overlay, konten, tombol tutup, judul, dan formulir filter */
  return (
    /* ModalOverlay dengan penangan klik untuk menutup modal saat mengklik di luar */
    <ModalOverlay onClick={onClose}>
      {/* ModalContent dengan stopPropagation untuk mencegah penutupan saat mengklik di dalam */}
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {/* CloseButton dengan penangan klik untuk menutup modal */}
        <CloseButton onClick={onClose} aria-label="Close">
          {/* Ikon SVG untuk tombol tutup (X) */}
          <svg viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </CloseButton>
        
        {/* Judul modal */}
        <ModalTitle>Filter Articles</ModalTitle>
        
        {/* Formulir dengan penangan pengiriman */}
        <FilterForm onSubmit={handleSubmit}>
          {/* Grup input tanggal 'dari' */}
          <FormGroup>
            <FormLabel>From Date</FormLabel>
            <DateInput
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </FormGroup>
          
          {/* Grup input tanggal 'hingga' */}
          <FormGroup>
            <FormLabel>To Date</FormLabel>
            <DateInput
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </FormGroup>
          
          {/* Tombol kirim untuk menerapkan filter */}
          <FilterButton type="submit">Apply Filter</FilterButton>
        </FilterForm>
      </ModalContent>
    </ModalOverlay>
  );
};

/* Mengekspor komponen FilterModal sebagai default */
export default FilterModal;