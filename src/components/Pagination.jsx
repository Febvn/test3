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
  gap: 5px;
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
  /* Array untuk menyimpan nomor halaman yang akan ditampilkan */
  const pageNumbers = [];
  /* Jumlah maksimum halaman yang terlihat sekaligus */
  const maxVisiblePages = 5;
  
  /* Menghitung halaman awal yang akan ditampilkan, memastikan halaman saat ini berada di tengah jika memungkinkan */
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  /* Menghitung halaman akhir yang akan ditampilkan berdasarkan halaman awal */
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  /* Menyesuaikan halaman awal jika jumlah halaman yang terlihat kurang dari maksimum */
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  /* Mengisi array pageNumbers dengan nomor halaman dari startPage hingga endPage */
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  
  /* Render komponen pagination */
  return (
    <PaginationContainer>
      {/* Tombol untuk navigasi ke halaman sebelumnya, dinonaktifkan jika di halaman pertama */}
      <PageButton 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
      >
        &laquo;
      </PageButton>
      
      {/* Menampilkan tombol halaman pertama dan elipsis jika rentang halaman tidak dimulai dari 1 */}
      {startPage > 1 && (
        <>
          <PageButton onClick={() => onPageChange(1)}>1</PageButton>
          {startPage > 2 && <PageEllipsis>...</PageEllipsis>}
        </>
      )}
      
      {/* Memetakan array pageNumbers untuk membuat tombol untuk setiap halaman dalam rentang yang terlihat */}
      {pageNumbers.map(page => (
        <PageButton 
          key={page} 
          /* Menandai tombol sebagai aktif jika sesuai dengan halaman saat ini */
          active={page === currentPage ? 1 : 0}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageButton>
      ))}
      
      {/* Menampilkan elipsis dan tombol halaman terakhir jika rentang halaman tidak berakhir di halaman terakhir */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <PageEllipsis>...</PageEllipsis>}
          <PageButton onClick={() => onPageChange(totalPages)}>{totalPages}</PageButton>
        </>
      )}
      
      {/* Tombol untuk navigasi ke halaman berikutnya, dinonaktifkan jika di halaman terakhir */}
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