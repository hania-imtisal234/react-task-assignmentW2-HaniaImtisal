import React from "react";
import Dropdown from "../DropDown/DropDown";

const Filters = ({ filters, onFilterChange }) => {
  return (
    <div className="flex justify-center bg-my-white mt-6 mx-8">
      <div className="flex w-full max-w-2xl space-x-4 px-4 justify-center">
        <Dropdown
          options={filters.homeWorldNames}
          selectedOption={filters.selectedHomeWorld}
          onSelect={(value) => onFilterChange("selectedHomeWorld", value)}
          placeholder="Select Homeworld"
        />
        <Dropdown
          options={filters.filmTitles}
          selectedOption={filters.selectedFilm}
          onSelect={(value) => onFilterChange("selectedFilm", value)}
          placeholder="Select Film"
        />
        <Dropdown
          options={filters.speciesNames}
          selectedOption={filters.selectedSpecies}
          onSelect={(value) => onFilterChange("selectedSpecies", value)}
          placeholder="Select Species"
        />
      </div>
    </div>
  );
};

export default Filters;
