import { API_KEY } from './api-service';
import { addLoader, removeLoader } from './loader';
import movieCardTpl from '../templates/movie-card.hbs';
import options from './../templates/options.hbs';
import { fetchData, formatResponseData, renderUI } from './newDataFetchFunction';
import axios from 'axios';
import { getGenres } from './fetchGenres';
import { removeBubble } from './homePageSorting';
const moviesList = document.querySelector('.movie-list');
const select = document.querySelector('.js-select');
const title = document.querySelector('.page-heading');

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
// {
//   const response = await fetch(
//     `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false`
//   );

//   if (response.ok) {
//     return await response.json();
//   }

//   throw new Error(await response.text());
// }

export async function filterByGenres(genre) {
  moviesList.innerHTML = '';
  title.textContent = `${genre} genre)`;
  removeBubble();
  console.log(genre);
  // loadBtn.addEventListener('click', seeMoreByName);
  try {
    await fetchData(`/discover/movie?sort_by=title.&with_genres=${genre}`)
      .then(formatResponseData)
      .then(renderUI);
  } catch (error) {
    console.log(error);
  }
}
// async function test() {try
//   {
//     const r = await fetchData(`/discover/movie?sort_by=title.&with_genres=18`)
//   console.log(r);
//   } catch (error) {
//     console.log(error);
//   }

// }

// test()