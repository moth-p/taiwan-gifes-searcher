import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [input, setInput] = useState("");

  function handleSearch(e) {
    e.preventDefault();

    if (input.trim() === "") return;
    setInput("");
  }

  return (
    <nav className="fixed top-0 left-0 z-30 flex flex-col md:flex-row items-center w-screen h-auto md:h-[64px] mb-10 p-4 md:px-20  bg-cyan-700 mx-auto">
      {/* left area */}
      <div className="w-full h-full flex justify-center md:justify-start items-center text-stone-200 mb-4 md:mb-0">
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
      <div className="w-full h-full flex flex-col md:flex-row justify-center md:justify-end items-center gap-4 md:gap-20">
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

        <div className="h-full flex justify-end items-center gap-10 text-stone-200">
          {/* like icon */}
          <Link to="/favorite">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12.001 4.529a6 6 0 0 1 8.242.228a6 6 0 0 1 .236 8.236l-8.48 8.492l-8.478-8.492a6 6 0 0 1 8.48-8.464"
              />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
