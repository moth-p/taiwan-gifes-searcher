import { useState, useEffect } from "react";
import { useSearchParams, useOutletContext } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { fetchGiftsData } from "../services/api";

const itemPerPage = 12; // 設定 單頁顯示 12 個商品

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchKeywords } = useOutletContext();

  // 設定 當前頁面查詢參數為 ?page=n
  const currentPage = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    async function getData() {
      const data = await fetchGiftsData();
      setProducts(data);
    }
    getData();
  }, []);

  // 以查詢關鍵字過濾商品列表
  const filteredProducts = products.filter((product) => {
    const name = product.Name?.toLowerCase() || "";
    const feature = product.Feature?.toLowerCase() || "";
    const county = product.County?.toLowerCase() || "";

    return (
      name.includes(searchKeywords) ||
      feature.includes(searchKeywords) ||
      county.includes(searchKeywords)
    );
  });

  // 設定 每頁顯示商品為：第1個到第12個、第13到第24個...，依此類推
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
      {/* 有搜尋關鍵字 -> 顯示搜尋結果（不套用分頁） */}
      {searchKeywords ? (
        <main className="max-w-[1440px] mx-auto min-h-screen w-screen grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-8 px-4 md:px-20 my-20">
          {filteredProducts.length === 0 ? (
            <p className="col-span-full text-center text-slate-500">
              找不到符合「{searchKeywords}」的商品
            </p>
          ) : (
            filteredProducts.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))
          )}
        </main>
      ) : (
        <>
          {/*  正常商品列表 + 分頁 */}
          <main className="max-w-[1440px] mx-auto w-screen grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-8 px-4 md:px-20 my-20">
            {currentItems.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </main>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
};

export default Home;
