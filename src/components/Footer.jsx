/* src/components/Footer.jsx */
/* Mengimpor React library untuk komponen */
import React from 'react';
/* Mengimpor styled-components untuk styling komponen */
import styled from 'styled-components';
/* Mengimpor komponen Tooltip */
import Tooltip from './Tooltip';

/* FooterContainer - Container utama footer dengan latar belakang hitam dan pola diagonal */
const FooterContainer = styled.footer`
  width: 100%;
  background-color: #000;
  color: #fff;
  padding: 40px 20px;
  margin-top: 60px;
  position: relative;
  overflow: hidden;
  
  /* Pseudo-element untuk menambahkan pola diagonal di atas latar belakang */
  &::before {
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
`;

/* FooterContent - Container untuk konten footer dengan posisi relatif */
const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
`;

/* Copyright - Teks hak cipta dengan border putih dan styling khusus */
const Copyright = styled.div`
  font-size: 20px;
  font-weight: 100;
  text-transform: uppercase;
  margin-bottom: 30px;
  color: #fff;
  padding: 15px 25px;
  border: 4px solid #fff;
  
  /* Responsif untuk layar yang lebih kecil */
  @media (max-width: 768px) {
    font-size: 20px;
    padding: 12px 20px;
  }
`;

/* Footer - Komponen utama yang merender footer dengan teks hak cipta dan Tooltip */
const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>Created by Febvn</Copyright>
        <Tooltip />
      </FooterContent>
    </FooterContainer>
  );
};

/* Mengekspor komponen Footer sebagai default */
export default Footer;