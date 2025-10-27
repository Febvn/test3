File: src/components/SearchModal.jsx

```jsx
// src/components/SearchModal.jsx
import React, { useState } from 'react';
import styled from 'styled-components';

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

const ModalContent = styled.div`
  background-color: #fff;
  border: 6px solid #000;
  box-shadow: 12px 12px 0 #000;
  padding: 30px;
  width: 90%;
  max-width: 500px;
  position: relative;
  
  @media (max-width: 768px) {
    width: 95%;
    padding: 20px;
  }
`;

const ModalTitle = styled.h2`
  font-size: 28px;
  font-weight: 900;
  text-transform: uppercase;
  margin: 0 0 20px;
  text-align: center;
`;

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
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 0 #000;
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 3px 0 #000;
  }
  
  svg {
    width: 20px;
    height: 20px;
    fill: #fff;
  }
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SearchInput = styled.input`
  padding: 15px;
  border: 3px solid #000;
  font-size: 16px;
  font-family: inherit;
  transition: all 0.3s;
  
  &:focus {
    outline: none;
    background-color: #000;
    color: #fff;
    transform: scale(1.02);
  }
`;

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
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 0 #000;
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 3px 0 #000;
  }
  
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

const SearchModal = ({ isOpen, onClose, onSearch }) => {
  const [query, setQuery] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
    onClose();
  };
  
  if (!isOpen) return null;
  
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

export default SearchModal;
```

Penjelasan singkat:
- Modal sederhana untuk melakukan pencarian kata kunci.
- Pada submit: memanggil `onSearch(query)` lalu menutup modal dengan `onClose()`.
- `autoFocus` pada input memfokuskan kursor saat modal dibuka.
