import { API_KEY } from './api-service';
import { addLoader } from './loader';
import options from './../templates/options.hbs';
import { removeEventListeners, removeBtn } from './removeBtnEventlisteners';
import {
  fetchData,
  formatResponseData,
  renderUI,
} from './newDataFetchFunction';
import { removeBubble } from './homePageSorting';
const moviesList = document.querySelector('.movie-list');
const select = document.querySelector('#by-genre');
const title = document.querySelector('.page-heading');
const loaderContainer = document.querySelector('.loader-container');
const pagination = document.querySelector('.pagination');

let page = 1;

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
  addLoader(loaderContainer);
  pagination.classList.add('visually-hidden');
  title.textContent = `Movies of the ${
    select.options[select.selectedIndex].textContent
    } genre`;
  removeBubble();
  removeEventListeners(seeMoreByGenre);
  try {
    await fetchData(`/discover/movie?sort_by=title.&with_genres=${genre}`)
      .then(formatResponseData)
      .then(renderUI);
  } catch (error) {
    console.log(error);
  }
}

async function seeMoreByGenre() {
  page += 1;
  addLoader(loaderContainer);
  removeBtn();
  try {
    await fetchData(`/discover/movie?sort_by=title.&with_genres=${select.value}`, page)
      .then(formatResponseData)
      .then(renderUI);
  } catch (error) {
    console.log(error);
  }
}
