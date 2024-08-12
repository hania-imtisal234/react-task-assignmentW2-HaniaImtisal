import React from "react";
import Input from "../Input/Input.jsx";

const SearchBar = ({ searchInput, onSearchChange, onClearFilters }) => {
  return (
    <div className="mb-4 flex justify-center">
      <Input
        value={searchInput}
        onChange={onSearchChange}
        placeholder="Search characters..."
      />
      <button
        onClick={onClearFilters}
        className="ml-4 p-2 border rounded bg-red-500 text-white"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default SearchBar;
