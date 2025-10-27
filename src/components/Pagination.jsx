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
  gap: 0x;
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
  // Menghitung range halaman yang akan ditampilkan (4 angka berurutan)
  const calculateVisiblePages = () => {
    let start = currentPage;
    // Jika halaman saat ini terlalu dekat dengan akhir, geser window ke kiri
    if (start > totalPages - 3) {
      start = Math.max(totalPages - 3, 1);
    }
    // Generate 4 angka berurutan dari start
    return Array.from({ length: 4 }, (_, i) => start + i).filter(num => num <= totalPages);
  };

  const visiblePages = calculateVisiblePages();
  const showFirstPage = visiblePages[0] > 1;
  const showLastPage = visiblePages[visiblePages.length - 1] < totalPages;

  return (
    <PaginationContainer>
      {/* Tombol previous (<<) */}
      <PageButton 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
      >
        &laquo;
      </PageButton>
      
      {/* Tampilkan halaman pertama jika window tidak dimulai dari 1 */}
      {showFirstPage && (
        <>
          <PageButton 
            active={currentPage === 1 ? 1 : 0}
            onClick={() => onPageChange(1)}
          >
            1
          </PageButton>
          <PageEllipsis>...</PageEllipsis>
        </>
      )}
      
      {/* Tampilkan 4 angka berurutan */}
      {visiblePages.map(page => (
        <PageButton 
          key={page}
          active={page === currentPage ? 1 : 0}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageButton>
      ))}
      
      {/* Tampilkan halaman terakhir jika window tidak sampai ke halaman terakhir */}
      {showLastPage && (
        <>
          <PageEllipsis>...</PageEllipsis>
          <PageButton 
            active={currentPage === totalPages ? 1 : 0}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </PageButton>
        </>
      )}
      
      {/* Tombol next (>>) */}
      <PageButton 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
      >
        &raquo;
      </PageButton>
    </PaginationContainer>
  );
};

/* Mengekspor komponen Pagination sebagai default */
export default Pagination;