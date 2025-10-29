/* src/components/Pagination.jsx */
/* Mengimpor pustaka React untuk komponen */
import React from 'react';
/* Mengimpor styled-components untuk styling komponen */
import styled from 'styled-components';

/* PaginationContainer - Container utama untuk pagination dengan tata letak flex dan responsif */
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 30px 0;
  
  /* Responsif untuk layar yang lebih kecil */
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

/* PageButton - Tombol untuk setiap nomor halaman dengan gaya dinamis berdasarkan props 'active' */
const PageButton = styled.button`
  /* Warna latar belakang dan teks berubah jika tombol aktif */
  background-color: ${props => props.active ? '#000' : '#fff'};
  color: ${props => props.active ? '#fff' : '#000'};
  border: 3px solid #000;
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  min-width: 45px;
  
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
  
  /* Gaya untuk tombol yang dinonaktifkan (prev/first atau next/last) */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    
    /* Menghapus efek hover saat dinonaktifkan */
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
`;

/* PageEllipsis - Tanda '...' untuk menunjukkan adanya halaman yang tidak ditampilkan */
const PageEllipsis = styled.span`
  padding: 10px 5px;
  font-size: 16px;
  font-weight: bold;
`;

/* Pagination - Komponen untuk menavigasi antar halaman */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Professional pagination: show up to maxButtons page numbers with ellipses
  const maxButtons = 7; // including first and last when needed

  const getPageRange = () => {
    if (totalPages <= maxButtons) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    const sideButtons = 2; // first and last reserved, remaining for window
    const windowSize = maxButtons - 2; // excluding first and last

    let start = Math.max(2, currentPage - Math.floor(windowSize / 2));
    let end = Math.min(totalPages - 1, start + windowSize - 1);

    // shift start left if we're too close to the end
    start = Math.max(2, Math.min(start, totalPages - windowSize));

    pages.push(1);
    if (start > 2) pages.push('left-ellipsis');

    for (let p = start; p <= end; p++) pages.push(p);

    if (end < totalPages - 1) pages.push('right-ellipsis');
    pages.push(totalPages);

    return pages;
  };

  const pagesToShow = getPageRange();

  return (
    <PaginationContainer>
      <PageButton
        aria-label="Previous page"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        {"<"}
      </PageButton>

      {pagesToShow.map((item, idx) => {
        if (item === 'left-ellipsis' || item === 'right-ellipsis') {
          return <PageEllipsis key={item + idx}>...</PageEllipsis>;
        }

        return (
          <PageButton
            key={item}
            active={item === currentPage}
            aria-current={item === currentPage ? 'page' : undefined}
            onClick={() => onPageChange(item)}
          >
            {item}
          </PageButton>
        );
      })}

      <PageButton
        aria-label="Next page"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        {">"}
      </PageButton>
    </PaginationContainer>
  );
};

/* Mengekspor komponen Pagination sebagai default */
export default Pagination;