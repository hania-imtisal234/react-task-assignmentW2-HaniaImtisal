
export const getRandomImage = (min, max) => {
    const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
    return `https://picsum.photos/200?random=${randomId}`;
};

export const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

export const filterCharacters = (characters, filters, searchInput) => {
    const characterName = searchInput.toLowerCase();
  
    return characters.filter((character) =>
      (filters.selectedHomeWorld === "" ||
        character.homeWorldName === filters.selectedHomeWorld) &&
      (filters.selectedFilm === "" ||
        character.filmsData.some((film) => film.title === filters.selectedFilm)) &&
      (filters.selectedSpecies === "" ||
        character.speciesData.some((species) => species.name === filters.selectedSpecies)) &&
      character.name.toLowerCase().includes(characterName)
    );
  };

export const isTokenValid = () => {
    const token = localStorage.getItem('authToken');
    const expirationTime = localStorage.getItem('tokenExpiration');

    if (!token || !expirationTime) {
        return false;
    }

    if (new Date().getTime() > expirationTime) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('tokenExpiration');
        return false;
    }

    return true;
};

export const getColor = (color) => {
    if (!color || typeof color !== 'string') {
        return '#F7B5CA'; 
    }
    const colors = color.split(',').map(c => c.trim().toLowerCase());
    for (let c of colors) {
        switch (c) {
            case 'fair':
                return '#F0A8D0';
            case 'gold':
                return '#F7B5CA'; 
            case 'white':
                return '#FFC6C6'; 
            case 'green':
                return '#FFEBD4'; 
            case 'light':
                return '#add8e6'; 
            case 'blue':
                return '#BC9F8B'; 
            default:
                break;
        }
    }
    return '#F7B5CA';
};

export const debounce = (callback, waitTime) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(...args);
        }, waitTime);
    };
};


export const transformCharacterData = async (characters, homeWorldsData, speciesData, filmsData) => {
    return Promise.all(characters.map(async (character) => {
        const homeWorld = homeWorldsData.find(hw => hw.url === character.homeworld);
        const { name, height, mass, skin_color: skinColor, birth_year: birthYear, films } = character;
        const { name: homeWorldName, terrain, climate, residents } = homeWorld;

        const speciesDataForCharacter = await Promise.all(character.species.map(specieUrl => {
            return speciesData.find(species => species.url === specieUrl);
        }));

        const filmsDataForCharacter = await Promise.all(character.films.map(filmUrl => {
            return filmsData.find(film => film.url === filmUrl);
        }));

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
            filmsData: filmsDataForCharacter,
            speciesData: speciesDataForCharacter
        };
    }));
};
