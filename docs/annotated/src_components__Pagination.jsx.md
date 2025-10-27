File: src/components/Pagination.jsx

```jsx
import React from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 30px 0;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const PageButton = styled.button`
  background-color: ${props => props.active ? '#000' : '#fff'};
  color: ${props => props.active ? '#fff' : '#000'};
  border: 3px solid #000;
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  min-width: 45px;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 0 #000;
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 3px 0 #000;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
`;

const PageEllipsis = styled.span`
  padding: 10px 5px;
  font-size: 16px;
  font-weight: bold;
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  const maxVisiblePages = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  
  return (
    <PaginationContainer>
      <PageButton 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
      >
        &laquo;
      </PageButton>
      
      {startPage > 1 && (
        <>
          <PageButton onClick={() => onPageChange(1)}>1</PageButton>
          {startPage > 2 && <PageEllipsis>...</PageEllipsis>}
        </>
      )}
      
      {pageNumbers.map(page => (
        <PageButton 
          key={page} 
          active={page === currentPage ? 1 : 0}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageButton>
      ))}
      
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <PageEllipsis>...</PageEllipsis>}
          <PageButton onClick={() => onPageChange(totalPages)}>{totalPages}</PageButton>
        </>
      )}
      
      <PageButton 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
      >
        &raquo;
      </PageButton>
    </PaginationContainer>
  );
};

export default Pagination;
```

Penjelasan singkat:
- Menampilkan kontrol pagination dengan tombol Prev/Next dan halaman numerik.
- `maxVisiblePages` menentukan maksimal tombol halaman yang tampil (5).
- `startPage` dan `endPage` menghitung rentang halaman yang akan ditampilkan agar pagination tetap responsif.
- Jika rentang tidak mencakup halaman awal atau akhir, tampilkan tombol `1` dan `...` atau tombol `totalPages`.
- Tombol menggunakan prop `active` untuk memberi style pada halaman saat ini.
