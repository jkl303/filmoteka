import {API_KEY} from './api-service'
import { addLoader, removeLoader } from './loader';
import movieCardTpl from '../templates/movie-card.hbs';
import options from './../templates/options.hbs'
import {
  fetchData,
  formatResponseData,
  renderUI,
} from './renderHomePageUI';
import axios from 'axios';
import { getGenres } from './fetchGenres';
const moviesList = document.querySelector('.movie-list');
const select = document.querySelector('.js-select')


async function getOptions() {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`,
    );
    if (response.ok) {
      return await response.json();
    }
    throw new Error(await response.text());
  }

async function getOptionsGenres() {
  const genres = await getOptions();
  return genres;
}

export async function generateOptions() {
  let emptyObj = {};

  const dataForGenerationOfOptions = await getOptionsGenres();
  const array = dataForGenerationOfOptions.genres.map(el => el);
  array.push(emptyObj);
  const markup = array.map(el => options({ el }));
  select.innerHTML = '';
  select.insertAdjacentHTML('beforeend', markup);
}

generateOptions()
  async function sortByGenre(genre) {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false`,
    );

    if (response.ok) {
      
      return await response.json();
      
    }
   
    throw new Error(await response.text());
  }

export async function filterByGenres(genre,page) {
  try {
    if (page === 1) {
      moviesList.innerHTML = '';
    }
    const genresDictionary = await getGenres();

    genresArr = Object.values(genresDictionary);
    const targetGenre = genresArr.find(g => g.name === genre).id;
    console.log(targetGenre);
    const results = await sortByGenre(targetGenre,1);
    console.log(results);
renderUI(results.results)
  } catch (err) {
    console.error(err);

  }
}
 



