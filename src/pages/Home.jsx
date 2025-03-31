import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { fetchGiftsData } from "../services/api";

const itemPerPage = 12; // 設定 單頁顯示 12 個商品

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // 設定 當前頁面 查詢參數 為 ?page=n
  const currentPage = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    async function getData() {
      const data = await fetchGiftsData();
      setProducts(data);
    }
    getData();
  }, []);

  // 設定 每頁顯示商品為 page 1: 第1個 - 第12個; page 2: 第13個 - 第24個;...
  const totalPages = Math.ceil(products.length / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const currentItems = products.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setSearchParams({ page }); 
    }
  };

  return (
    <>
      <main className="max-w-[1440px] mx-auto min-h-screen w-screen grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-8 px-4 md:px-20 my-20">
      {/* 商品卡片元件 */}
        {currentItems.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </main>

      {/* 分頁元件 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Home;
