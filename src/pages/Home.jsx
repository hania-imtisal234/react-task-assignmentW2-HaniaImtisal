import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Card from '../components/Card/Card';
import Modal from '../components/Modal/Modal';
import Loader from '../components/Loader/Loader';
import { formatDate, getRandomImage } from '../Util/Util';
import Dropdown from '../components/DropDown/DropDown';

const Home = () => {
    const [starWarsCharacter, setStarWarsCharacter] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState([]);
    const [filteredCharacters, setFilteredCharacters] = useState([]);
    const [filters, setFilters] = useState({
        homeWorldNames: [],
        filmTitles: [],
        speciesNames: [],
        selectedHomeWorld: '',
        selectedFilm: '',
        selectedSpecies: ''
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [searchInput, setSearchInput] = useState('');

    const getStarWarsData = async () => {
        try {
            const response = await axios.get("https://swapi.dev/api/people/");
            const data = response.data.results;
            console.log(data)
            const characterPromise = data.map(async character => {
                const homeWorldResponse = await axios.get(character.homeworld);
                const homeWorld = homeWorldResponse.data;
                const { name, height, mass, skin_color: skinColor, birth_year: birthYear, films, species } = character;
                const { name: homeWorldName, terrain, climate, residents } = homeWorld;

                const speciesData = [];
                for (const specieUrl of character.species) {
                    const specieResponse = await axios.get(specieUrl);
                    speciesData.push(specieResponse.data);
                }

                const filmsData = [];
                for (const filmUrl of character.films) {
                    const filmResponse = await axios.get(filmUrl);
                    filmsData.push(filmResponse.data);
                }

                return {
                    name,
                    height,
                    mass,
                    skinColor,
                    birthYear,
                    filmsLength: films.length,
                    created: formatDate(character.created),
                    homeWorldName,
                    terrain,
                    climate,
                    residentsLength: residents.length,
                    filmsData,
                    speciesData
                };
            });
            const characterQualities = await Promise.all(characterPromise);
            const uniqueHomeWorldNames = [...new Set(characterQualities.map(c => c.homeWorldName))];
            const uniqueFilmTitles = [...new Set(characterQualities.flatMap(c => c.filmsData.map(film => film.title)))];
            const uniqueSpeciesNames = [...new Set(characterQualities.flatMap(c => c.speciesData.map(species => species.name)))];

            setStarWarsCharacter(characterQualities);
            setFilteredCharacters(characterQualities);
            setFilters(prevFilters => ({
                ...prevFilters,
                homeWorldNames: uniqueHomeWorldNames,
                filmTitles: uniqueFilmTitles,
                speciesNames: uniqueSpeciesNames
            }));

            setIsLoading(false);
        } catch (err) {
            console.error("Can't fetch Data", err);
            setIsLoading(false);
            throw new Error(err);
        }
    };

    useEffect(() => {
        getStarWarsData();
    }, []);

    useEffect(() => {
        const characterName = searchInput.toLowerCase();
        const filtered = starWarsCharacter.filter(character =>
            (filters.selectedHomeWorld === '' || character.homeWorldName === filters.selectedHomeWorld) &&
            (filters.selectedFilm === '' || character.filmsData?.some(film => film.title === filters.selectedFilm)) &&
            (filters.selectedSpecies === '' || character.speciesData?.some(species => species.name === filters.selectedSpecies)) &&
            character.name.toLowerCase().includes(characterName)
        );
        setFilteredCharacters(filtered);
    }, [searchInput, filters, starWarsCharacter]);

    const handleCardClick = (character) => {
        setSelectedCharacter(character);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCharacter(null);
    };

    const handleFilterChange = (key, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [key]: value
        }));
    };

    return (
        <div className="bg-slate-200 p-6 shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-6">Star Wars Characters</h1>
            <div className="mb-4 flex justify-center">
                <input
                    type="text"
                    placeholder="Search by character name"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="p-2 border rounded w-60"
                />
            </div>
            {isLoading ? (
                <div className='flex justify-center'>
                    <div className='flex-cols justify-center'>
                        <h2 className='font-bold'>Loading Data...</h2>
                        <br />
                        <Loader />
                    </div>
                </div>
            ) : (
                <div>
                    <div className="flex justify-center bg-my-white mt-6 mx-8">
                        <div className="flex w-full max-w-2xl space-x-4 px-4 justify-center">
                            <Dropdown
                                options={filters.homeWorldNames}
                                selectedOption={filters.selectedHomeWorld}
                                onSelect={value => handleFilterChange('selectedHomeWorld', value)}
                            />
                            <Dropdown
                                options={filters.filmTitles}
                                selectedOption={filters.selectedFilm}
                                onSelect={value => handleFilterChange('selectedFilm', value)}
                            />
                            <Dropdown
                                options={filters.speciesNames}
                                selectedOption={filters.selectedSpecies}
                                onSelect={value => handleFilterChange('selectedSpecies', value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredCharacters.map((character, index) => (
                            <Card
                                key={index}
                                name={character.name}
                                imageUrl={getRandomImage()}
                                skinColor={character.skinColor}
                                onClick={() => handleCardClick(character)}
                                className="transition-transform transform hover:scale-105 hover:shadow-lg"
                            />
                        ))}
                    </div>
                </div>
            )}
            {isModalOpen && (
                <Modal character={selectedCharacter} onClose={closeModal} />
            )}
        </div>
    );
};

export default Home;
