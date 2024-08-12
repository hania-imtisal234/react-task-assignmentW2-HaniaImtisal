import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-between mt-6">
      <button
        onClick={() => onPageChange("prev")}
        disabled={currentPage <= 1}
        className="ml-4 p-2 border rounded bg-red-500 text-white"
      >
        Previous
      </button>
      <span className="flex items-center">Page {currentPage}</span>
      <button
        onClick={() => onPageChange("next")}
        disabled={currentPage >= totalPages}
        className="ml-4 p-2 border rounded bg-red-500 text-white"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
