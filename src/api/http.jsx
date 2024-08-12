import axios from 'axios';
import { transformCharacterData } from '../Util/Util';
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getStarWarsData = async (page = 1) => {
    try {
        const response = await axios.get(`${BASE_URL}?page=${page}`);
        const data = response.data.results;

        const homeWorldUrls = data.map(character => character.homeworld);
        const speciesUrls = data.flatMap(character => character.species);
        const filmUrls = data.flatMap(character => character.films);

       
        const [homeWorldResponses, speciesResponses, filmResponses] = await Promise.all([
            Promise.all(homeWorldUrls.map(url => axios.get(url).catch(err => ({ data: {} })))), 
            Promise.all(speciesUrls.map(url => axios.get(url).catch(err => ({ data: {} })))), 
            Promise.all(filmUrls.map(url => axios.get(url).catch(err => ({ data: {} })))) 
        ]);

        const homeWorldsData = homeWorldResponses.map(response => response.data);
        const speciesData = speciesResponses.map(response => response.data);
        const filmsData = filmResponses.map(response => response.data);

        const characterQualities = await transformCharacterData(data, homeWorldsData, speciesData, filmsData);

        const uniqueHomeWorldNames = [...new Set(characterQualities.map(c => c.homeWorldName))];
        const uniqueFilmTitles = [...new Set(characterQualities.flatMap(c => c.filmsData.map(film => film.title)))];
        const uniqueSpeciesNames = [...new Set(characterQualities.flatMap(c => c.speciesData.map(species => species.name)))];

        return {
            characterQualities,
            homeWorldNames: uniqueHomeWorldNames,
            filmTitles: uniqueFilmTitles,
            speciesNames: uniqueSpeciesNames,
            totalPages: Math.ceil(response.data.count / 10), 
            currentPage: page,
        };
    } catch (err) {
        console.error("Can't fetch Data", err);
        throw new Error('Unable to fetch data from API');
    }
};
