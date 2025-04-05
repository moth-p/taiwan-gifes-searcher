import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const NavBar = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 檢查 localStorage 是否有 token（登入狀態）
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:8030/api/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      localStorage.removeItem("token");
      setIsLoggedIn(false);
    } catch (err) {
      console.error("登出失敗", err);
    }
  };

  function handleSearch(e) {
    e.preventDefault();

    const keywords = input.trim();
    if (keywords === "") return;
    // 按照 keywords 內容來變更查詢參數
    onSearch(keywords);

    setInput("");
  }

  return (
    <nav className="fixed top-0 left-0 z-30 flex flex-col md:flex-row items-center w-screen h-auto md:h-[64px] mb-10 p-4 md:px-20 bg-cyan-700 mx-auto">
      {/* left area */}
      <div className="relative w-full h-full flex justify-center md:justify-start items-center text-stone-200 mb-4 md:mb-0">
        <Link
          to="/?page=1"
          className="w-full h-full flex justify-start items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M9.06 1.93C7.17 1.92 5.33 3.74 6.17 6H3a2 2 0 0 0-2 2v2a1 1 0 0 0 1 1h9V8h2v3h9a1 1 0 0 0 1-1V8a2 2 0 0 0-2-2h-3.17C19 2.73 14.6.42 12.57 3.24L12 4l-.57-.78c-.63-.89-1.5-1.28-2.37-1.29M9 4c.89 0 1.34 1.08.71 1.71S8 5.89 8 5a1 1 0 0 1 1-1m6 0c.89 0 1.34 1.08.71 1.71S14 5.89 14 5a1 1 0 0 1 1-1M2 12v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8h-9v8h-2v-8z"
            />
          </svg>
          &nbsp;&nbsp;
          <span>Taiwan Gifts</span>
        </Link>
      </div>
      {/* right area */}
      <div className="w-full h-full flex flex-col md:flex-row justify-center md:justify-end items-center gap-4 md:gap-14">
        {/* search form  */}
        <form
          onSubmit={handleSearch}
          className="w-full md:w-auto h-full flex flex-col md:flex-row justify-center items-center gap-2 md:gap-5"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="找伴手禮..."
            className="w-full md:w-[200px] h-[28px] text-sm px-3 border-2 border-stone-200 text-stone-800 rounded-md"
          />
          <button
            type="submit"
            className="w-[60px] h-[27px] text-sm bg-cyan-600 text-stone-200 px-2 flex justify-center items-center rounded-sm"
          >
            搜尋
          </button>
        </form>
        <div className="flex justify-center items-center gap-8 text-stone-200">
          {/* wish list icon */}
          <a href="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M11.566 21.112L12 20.5za.75.75 0 0 0 .867 0L12 20.5l.434.612l.008-.006l.021-.015l.08-.058q.104-.075.295-.219a38.5 38.5 0 0 0 4.197-3.674c1.148-1.168 2.315-2.533 3.199-3.981c.88-1.44 1.516-3.024 1.516-4.612c0-1.885-.585-3.358-1.62-4.358c-1.03-.994-2.42-1.439-3.88-1.439c-1.725 0-3.248.833-4.25 2.117C10.998 3.583 9.474 2.75 7.75 2.75c-3.08 0-5.5 2.639-5.5 5.797c0 1.588.637 3.171 1.516 4.612c.884 1.448 2.051 2.813 3.199 3.982a38.5 38.5 0 0 0 4.492 3.892l.08.058l.021.015z"
              />
            </svg>
          </a>
          {/* Login or out */}
          <div className="w-20 flex justify-center items-center gap-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-stone-200 hover:text-yellow-200 flex justify-center items-center"
              >
                登出
              </button>
            ) : (
              <Link
                to="/auth/login"
                className="text-stone-200 hover:text-yellow-200 flex justify-center items-center"
              >
                登入
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
