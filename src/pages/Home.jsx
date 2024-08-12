// pages/Home.jsx
import React, { useState, useMemo, useEffect } from "react";
import { getStarWarsData } from "../api/http.jsx";
import Card from "../components/Card/Card";
import Modal from "../components/Modal/Modal";
import Loader from "../components/Loader/Loader";
import { filterCharacters, getRandomImage } from "../Util/Util";
import { useFetch } from "../hooks/useFetch";
import Header from "../components/Header/Header";

import Pagination from "../components/Paginition/Paginition.jsx";
import Filters from "../components/Filters/Filters.jsx";
import SearchBar from "../components/SearchBar/SearchBar.jsx";

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [filters, setFilters] = useState({
    homeWorldNames: [],
    filmTitles: [],
    speciesNames: [],
    selectedHomeWorld: "",
    selectedFilm: "",
    selectedSpecies: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { isFetching, error, fetchData, totalPages } = useFetch(
    getStarWarsData,
    currentPage,
    {
      characterQualities: [],
      homeWorldNames: [],
      filmTitles: [],
      speciesNames: [],
    }
  );

  const { characterQualities, homeWorldNames, filmTitles, speciesNames } =
    fetchData;
    console.log(characterQualities)

  useEffect(() => {
    if (!isFetching && fetchData) {
      setFilters({
        homeWorldNames,
        filmTitles,
        speciesNames,
        selectedHomeWorld: "",
        selectedFilm: "",
        selectedSpecies: "",
      });
    }
  }, [isFetching, fetchData, homeWorldNames, filmTitles, speciesNames]);

  const filteredCharacters = useMemo(() => {
    return filterCharacters(characterQualities, filters, searchInput);
  }, [searchInput, filters, characterQualities]);

  const handleCardClick = (character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCharacter(null);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      selectedHomeWorld: "",
      selectedFilm: "",
      selectedSpecies: "",
    }));
    setSearchInput("");
  };

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center">
        <div className="flex-cols justify-center">
          <h2 className="font-bold">Loading Data...</h2>
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center">
        <div className="flex-cols justify-center">
          <h2 className="font-bold text-red-500">{error.message}</h2>
        </div>
      </div>
    );
  }
  console.log(filteredCharacters)

  return (
    <div className="bg-slate-200 shadow-lg">
      <Header />
      <h1 className="text-3xl font-bold text-center mb-6">
        Star Wars Characters
      </h1>
      <SearchBar
        searchInput={searchInput}
        onSearchChange={setSearchInput}
        onClearFilters={clearFilters}
      />
      <Filters
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCharacters.length === 0 ? (
          <div className="col-span-full text-center text-gray-700 font-semibold">
            No characters found
          </div>
        ) : (
          filteredCharacters.map((character, index) => (
            <Card
              key={index}
              name={character.name}
              skinColor={character.skinColor}
              imageUrl={getRandomImage(1, 59)}
              onClick={() => handleCardClick(character)}
            />
          ))
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {isModalOpen && (
        <Modal character={selectedCharacter} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Home;
