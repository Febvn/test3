/* src/components/Navigation.jsx */
/* Mengimpor React library dan hook useState untuk fungsionalitas komponen dan manajemen state */
import React, { useState } from 'react';
/* Mengimpor styled-components untuk membuat komponen React yang bergaya */
import styled from 'styled-components';
/* Mengimpor komponen SearchModal untuk modal pencarian */
import SearchModal from './SearchModal';
/* Mengimpor komponen FilterModal untuk modal filter */
import FilterModal from './FilterModal';

/* NavContainer - Container navigasi dengan posisi sticky di bagian atas halaman */
const NavContainer = styled.nav`
  position: sticky;
  top: 0;
  width: 100%;
  padding: 0px 0;
  margin-bottom: 30px;
  background-color: #fff;
  z-index: 1000;
`;

/* Container - Container dalam navigasi dengan border tebal dan tata letak flex */
const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #ffffffff;
  border: 6px solid #000;

  
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

/* Logo - Logo "NEWS" dengan latar belakang hitam dan teks putih */
const Logo = styled.div`
  font-size: 28px;
  font-weight: 900;
  text-transform: uppercase;
  background-color: #000;
  color: #fff;
  padding: 10px 34px;
  border: 4px solid #000;
  cursor: pointer; /* Menambahkan cursor pointer untuk menunjukkan bahwa logo dapat diklik */
  transition: all 0.2s; /* Menambahkan transisi untuk efek hover */
  
  &:hover {
    transform: translateY(-5px); /* Efek hover yang sama dengan tombol lainnya */
    box-shadow: 0 8px 0 #000;
  }
  
  &:active {
    transform: translateY(-2px);
    box-shadow: 0 4px 0 #000;
  }
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

/* NavButtons - Container untuk tombol navigasi kategori (tidak ditampilkan di layar kecil) */
const NavButtons = styled.div`
  display: flex;
  gap: 15px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

/* NavButton - Tombol navigasi kategori dengan efek hover dan warna yang berubah saat aktif */
const NavButton = styled.button`
  background-color: ${props => props.active ? '#000' : '#fff'};
  color: ${props => props.active ? '#fff' : '#000'};
  border: 4px solid #000;
  padding: 12px 18px;
  font-size: 16px;
  font-weight: 900;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 0 #000;
  }
  
  &:active {
    box-shadow: 0 4px 0 #000;
  }
`;

/* IconButtons - Container untuk tombol ikon (pencarian, filter, menu) */
const IconButtons = styled.div`
  display: flex;
  gap: 15px;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

/* IconButton - Tombol ikon dengan latar belakang hitam dan efek hover */
const IconButton = styled.button`
  background-color: #000;
  color: #fff;
  border: 4px solid #000;
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 0 #000;
  }
  
  &:active {
    transform: translateY(-2px);
    box-shadow: 0 4px 0 #000;
  }
  
  svg {
    width: 28px;
    height: 28px;
    fill: #fff;
  }
`;

/* MobileMenuButton - Tombol menu untuk tampilan mobile (hanya ditampilkan di layar kecil) */
const MobileMenuButton = styled(IconButton)`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

/* MobileMenu - Menu dropdown untuk tampilan mobile dengan daftar kategori */
const MobileMenu = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 6px solid #000;
  border-top: none;
  box-shadow: 0 8px 0 #000;
  z-index: 999;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
  }
`;

/* MobileCategoryButton - Tombol kategori dalam menu mobile dengan warna yang berubah saat aktif */
const MobileCategoryButton = styled.button`
  width: 100%;
  background-color: ${props => props.active ? '#000' : '#fff'};
  color: ${props => props.active ? '#fff' : '#000'};
  border: none;
  border-bottom: 4px solid #000;
  padding: 15px;
  font-size: 16px;
  font-weight: 900;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  
  &:hover {
    background-color: #000;
    color: #fff;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

/* MobileNavContainer - Container khusus untuk navigasi mobile */
const MobileNavContainer = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
`;

/* Navigation - Komponen navigasi utama dengan kategori, pencarian, dan filter */
const Navigation = ({ activeCategory, onCategoryChange, onSearch, onFilter }) => {
  /* State untuk mengontrol pembukaan modal pencarian */
  const [searchOpen, setSearchOpen] = useState(false);
  /* State untuk mengontrol pembukaan modal filter */
  const [filterOpen, setFilterOpen] = useState(false);
  /* State untuk mengontrol pembukaan menu mobile */
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  /* Daftar kategori yang tersedia */
  const categories = [
    
    { id: 'technology', name: 'Technology' },
    { id: 'business', name: 'Business' },
    { id: 'sports', name: 'Sports' }
  ];
  
  /* Fungsi untuk menangani klik pada kategori, mengubah kategori aktif dan menutup menu mobile */
  const handleCategoryClick = (categoryId) => {
    onCategoryChange(categoryId);
    setMobileMenuOpen(false);
  };
  
  /* Fungsi untuk menangani klik pada logo, mengubah kategori ke 'all' */
  const handleLogoClick = () => {
    onCategoryChange('all');
    setMobileMenuOpen(false);
  };
  
  /* Render komponen navigasi dengan logo, tombol kategori, dan ikon */
  return (
    <>
      <NavContainer>
        <Container>
          {/* Logo "NEWS" dengan fungsi onClick */}
          <Logo onClick={handleLogoClick}>NEWS</Logo>
          
          {/* Tombol navigasi kategori untuk desktop */}
          <NavButtons>
            {categories.map((cat) => (
              <NavButton 
                key={cat.id}
                active={activeCategory === cat.id ? 1 : 0}
                onClick={() => onCategoryChange(cat.id)}
              >
                {cat.name}
              </NavButton>
            ))}
          </NavButtons>
          
          {/* Tombol ikon untuk pencarian, filter, dan menu mobile */}
          <IconButtons>
            {/* Tombol pencarian */}
            <IconButton 
              onClick={() => setSearchOpen(true)} 
              aria-label="Search"
            >
              <svg viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </IconButton>
            
            {/* Tombol filter */}
            <IconButton 
              onClick={() => setFilterOpen(true)} 
              aria-label="Filter"
            >
              <svg viewBox="0 0 24 24">
                <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
              </svg>
            </IconButton>
            
            {/* Tombol menu mobile */}
            <MobileMenuButton 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              aria-label="Menu"
            >
              <svg viewBox="0 0 24 24">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
              </svg>
            </MobileMenuButton>
          </IconButtons>
          
          {/* Menu dropdown untuk mobile dengan daftar kategori */}
          <MobileMenu isOpen={mobileMenuOpen}>
            {categories.map((cat) => (
              <MobileCategoryButton 
                key={cat.id}
                active={activeCategory === cat.id ? 1 : 0}
                onClick={() => handleCategoryClick(cat.id)}
              >
                {cat.name}
              </MobileCategoryButton>
            ))}
          </MobileMenu>
        </Container>
      </NavContainer>
      
      {/* Modal pencarian */}
      <SearchModal 
        isOpen={searchOpen} 
        onClose={() => setSearchOpen(false)} 
        onSearch={onSearch} 
      />
      
      {/* Modal filter */}
      <FilterModal 
        isOpen={filterOpen} 
        onClose={() => setFilterOpen(false)} 
        onFilter={onFilter} 
      />
    </>
  );
};

/* Mengekspor komponen Navigation sebagai default */
export default Navigation;