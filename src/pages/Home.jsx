import { useState, useEffect } from "react";
import { useSearchParams, useOutletContext } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { fetchGiftsData } from "../services/api";

const itemPerPage = 12;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchKeywords } = useOutletContext();

  const currentPage = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    async function getData() {
      const data = await fetchGiftsData();
      setProducts(data);
    }
    getData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const name = product.Name?.toLowerCase() || "";
    const feature = product.Feature?.toLowerCase() || "";
    const county = product.County?.toLowerCase() || "";

    return (
      name.includes(searchKeywords.toLowerCase()) ||
      feature.includes(searchKeywords.toLowerCase()) ||
      county.includes(searchKeywords.toLowerCase())
    );
  });

  // 設定 pagination
  const totalPages = Math.ceil(products.length / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const currentItems = products.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setSearchParams({ page });
      window.scrollTo({ top: 0 }); //  自動滾到頂部
    }
  };

  // 點擊某商品 -> 設定 為目前選取的商品
  const showProductDetails = (product) => {
    setSelectedProduct(product);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      {/* 商品詳情 彈窗 */}
      {selectedProduct && (
        <>
          {/* 遮罩 */}
          <div
            className="fixed inset-0 bg-black/30 z-20"
            onClick={closeProductDetails}
          ></div>

          {/* 商品詳情 視窗 */}
          <section
            className="animate__animated animate__fadeIn animate__faster fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        bg-slate-50 border-2 border-slate-200 w-[350px] h-[400px] md:w-[400px] md:h-[450px] 
        z-30 py-8 px-12 rounded-xl shadow-xl flex flex-col gap-8 overflow-scroll"
            onClick={(e) => e.stopPropagation()} // 防止事件冒泡
          >
            <button
              className="absolute top-4 right-4 text-stone-50 text-lg bg-red-400 rounded-full w-8 h-8"
              onClick={closeProductDetails}
            >
              ✕
            </button>
            <h2 className="text-xl text-cyan-800 font-bold">
              {selectedProduct.Name}
            </h2>
            <div className="w-[150px] h-[120px]">
              <img
                src={
                  selectedProduct.Column1 !== ""
                    ? selectedProduct.Column1
                    : "/no_image_default.png"
                }
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <p>{selectedProduct.Feature}</p>
            {selectedProduct.ProduceOrg !== "" &&
            selectedProduct.County !== "" ? (
              <p className="text-sm text-stone-600">
                {selectedProduct.ProduceOrg}｜{selectedProduct.County}
              </p>
            ) : (
              ""
            )}
          </section>
        </>
      )}

      {/* 有搜尋關鍵字 */}
      {searchKeywords ? (
        <main className="max-w-[1440px] mx-auto min-h-screen w-screen px-4 md:px-20 my-20">
          {filteredProducts.length === 0 ? (
            <p className="col-span-full text-center text-slate-500">
              找不到符合「{searchKeywords}」的商品。
            </p>
          ) : (
            <>
              <p className="flex justify-start items-center text-slate-500 mb-10">
                搜尋關鍵字：「{searchKeywords}」
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    product={product}
                    key={product.Id || product.Name}
                    onClick={() => showProductDetails(product)}
                  />
                ))}
              </div>
            </>
          )}
        </main>
      ) : (
        <main className="flex flex-col justify-start items-center gap-10 py-10">
          <div>
            <p className="text-slate-500 mb-5">搜尋想要的伴手禮</p>
          </div>
          <section className="max-w-[1440px] mx-auto w-screen grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-8 px-4 md:px-20 mb-10">
            {currentItems.map((product) => (
              <ProductCard
                product={product}
                key={product.Id || product.Name}
                onClick={() => showProductDetails(product)}
              />
            ))}
          </section>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </main>
      )}
    </>
  );
};

export default Home;
