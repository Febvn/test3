import React, { useState } from 'react';
import styled from 'styled-components';

/* Container utama untuk filter dengan styling border dan shadow */
const FilterContainer = styled.div`
  background-color: #fff;
  border: 6px solid #000;
  box-shadow: 12px 12px 0 #000;
  padding: 15px;
`;

/* Judul untuk bagian filter dengan huruf besar dan tebal */
const FilterTitle = styled.h2`
  font-size: 24px;
  font-weight: 900;
  text-transform: uppercase;
  margin: 0 0 15px;
`;

/* Form untuk input filter dengan layout kolom dan jarak antar elemen */
const FilterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

/* Container untuk input tanggal dengan layout flex yang berubah menjadi kolom di layar kecil */
const DateInputs = styled.div`
  display: flex;
  gap: 10px;
  
  /* Responsif: ubah layout menjadi kolom di layar dengan lebar maksimal 768px */
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

/* Input tanggal dengan styling border dan efek focus */
const DateInput = styled.input`
  flex: 1;
  padding: 12px;
  border: 3px solid #000;
  font-size: 16px;
  font-family: inherit;
  transition: all 0.3s;
  
  /* Efek focus dengan background hitam dan teks putih */
  &:focus {
    outline: none;
    background-color: #000;
    color: #fff;
    transform: scale(1.02);
  }
`;

/* Tombol untuk menerapkan filter dengan efek hover dan animasi */
const FilterButton = styled.button`
  background-color: #000;
  color: #fff;
  border: 3px solid #000;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  
  /* Efek hover dengan pergeseran ke atas dan shadow */
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 0 #000;
  }
  
  /* Efek active saat tombol ditekan */
  &:active {
    transform: translateY(0);
    box-shadow: 0 3px 0 #000;
  }
  
  /* Efek latar belakang merah yang muncul dari kiri saat hover */
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
  
  &:hover::before {
    transform: translateX(0);
  }
`;

/* Komponen DateFilter untuk memfilter artikel berdasarkan tanggal */
const DateFilter = ({ onFilter }) => {
  // State untuk menyimpan nilai tanggal awal dan akhir
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  
  // Fungsi untuk menangani submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Panggil fungsi onFilter yang diteruskan dari parent component
    onFilter(fromDate, toDate);
  };
  
  return (
    <FilterContainer>
      <FilterTitle>Date Filter</FilterTitle>
      <FilterForm onSubmit={handleSubmit}>
        <DateInputs>
          {/* Input untuk tanggal awal */}
          <DateInput
            type="date"
            placeholder="From"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          {/* Input untuk tanggal akhir */}
          <DateInput
            type="date"
            placeholder="To"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </DateInputs>
        {/* Tombol untuk menerapkan filter */}
        <FilterButton type="submit">Apply Filter</FilterButton>
      </FilterForm>
    </FilterContainer>
  );
};

export default DateFilter;