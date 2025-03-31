import { useState, useEffect } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [inputValue, setInputValue] = useState(currentPage);

  // 當 currentPage 改變時，也更新 inputValue
  useEffect(() => {
    setInputValue(currentPage);
  }, [currentPage]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputSubmit = () => {
    const page = parseInt(inputValue);

    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      onPageChange(page);
    } else {
      setInputValue(currentPage);
    }
  };

  // keydown 事件，點擊 enter 呼叫頁面跳轉函式 handleInputSubmit()
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleInputSubmit();
    }
  };

  return (
    <div className="flex justify-center items-center gap-8 my-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-stone-300 rounded disabled:opacity-50 active:opacity-80"
      >
        上一頁
      </button>

      <span className="text-stone-700">
        第&nbsp;
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleInputSubmit}
          className="w-12 h-8 text-center border border-stone-400 rounded"
          min={1}
          max={totalPages}
        />
        &nbsp;頁 / 共 {totalPages} 頁
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-stone-200 bg-cyan-600 rounded disabled:opacity-50 active:opacity-80"
      >
        下一頁
      </button>
    </div>
  );
};

export default Pagination;
