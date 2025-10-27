File: src/components/Footer.jsx

```jsx
// src/components/Footer.jsx
import React from 'react';
import styled from 'styled-components';
import Tooltip from './Tooltip';

const FooterContainer = styled.footer`
  width: 100%;
  background-color: #000;
  color: #fff;
  padding: 40px 20px;
  margin-top: 60px;
  position: relative;
  overflow: hidden;
  
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

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
`;

const Copyright = styled.div`
  font-size: 20px;
  font-weight: 100;
  text-transform: uppercase;
  margin-bottom: 30px;
  color: #fff;
  padding: 15px 25px;
  border: 4px solid #fff;
  
  @media (max-width: 768px) {
    font-size: 20px;
    padding: 12px 20px;
  }
`;

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

export default Footer;
```

Penjelasan singkat:
- `FooterContainer` adalah wrapper footer dengan overlay pattern sama seperti header.
- `FooterContent` menampung konten dan `Tooltip` (sosial icons) yang diimport.
- `Copyright` menampilkan teks pembuat.
- Komponen `Footer` sederhana: render struktur dan `Tooltip`.
