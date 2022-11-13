import { API_KEY } from './api-service';
import { addLoader } from './loader';
import { addObserver } from './intersectionObserver';
import options from './../templates/options.hbs';
import {
  fetchData,
  formatResponseData,
  renderUI,
} from './newDataFetchFunction';
import { removeBubble } from './homePageSorting';
const moviesList = document.querySelector('.movie-list');
const select = document.querySelector('.js-select');
const title = document.querySelector('.page-heading');
const loaderContainer = document.querySelector('.loader-container');

async function getOptions() {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
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

generateOptions();

export async function filterByGenres(genre) {
  moviesList.innerHTML = '';
  // title.textContent = `${divForFilters.value} genre)`;
  addLoader(loaderContainer);
  removeBubble();
  try {
    await fetchData(`/discover/movie?sort_by=title.&with_genres=${genre}`)
      .then(formatResponseData)
      .then(renderUI);
  } catch (error) {
    console.log(error);
  }
}
