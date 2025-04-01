import { Outlet, useSearchParams } from "react-router-dom";
import NavBar from "../components/NavBar";

const MainLayout = () => {
  // 設定 NavBar 關鍵字搜索 -> 查詢參數 ?search=n
  const [searchParams, setSearchParams] = useSearchParams();
  const searchKeywords = searchParams.get("search") || "";

  const handleSearch = (keywords) => {
    setSearchParams({ search: keywords });
  };

  return (
    <section className="relative w-screen h-screen py-40 md:py-20">
      {/* Nav */}
      <NavBar onSearch={handleSearch} />
      {/* Main */}
      {/* 透過 outletContext 傳遞物件 { searchKeywords } */}
      <Outlet context={{ searchKeywords }} />
    </section>
  );
};

export default MainLayout;
