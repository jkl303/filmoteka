import axios from 'axios';
import { API_KEY, BASE_URL, IMG_URL } from './api-service';

const movieListEl = document.querySelector('.movie-list');

let genresDictionary = {};

export async function fetchData(endpoint, page, genres) {
  try {
    const {
      data: { results },
    } = await axios.get(BASE_URL + endpoint, {
      params: {
        api_key: API_KEY,
        page: page,
        with_genres: genres,
      },
    });
    return results;
  } catch (err) {
    console.error(err);
  }
}

async function composeGenresDictionary() {
  if (Object.entries(genresDictionary).length !== 0) {
    return genresDictionary;
  }
  if (Object.entries(genresDictionary).length === 0) {
    const movieGenres = await fetchData('/genre/movie/list');
    const tvGenres = await fetchData('/genre/tv/list');
    [...tvGenres, ...movieGenres].forEach(
      elem => (genresDictionary[elem.id] = elem)
    );
    return genresDictionary;
  }
}

export async function formatResponseData(results) {
  genresDictionary = await composeGenresDictionary();
  try {
    const processedObject = await results.map(elem => {
      return {
        id: elem.id,
        title: elem.title ? elem.title : elem.name,
        release_date: new Date(
          elem.release_date ? elem.release_date : elem.first_air_date
        ).getFullYear(),
        poster: IMG_URL + elem.poster_path,
        overview: elem.overview,
        genres: elem.genre_ids
          .map((elem, index) => {
            if (index < 2) {
              return genresDictionary[elem].name;
            }
            if (index === 2) {
              return 'Other';
            }
            if (index > 2) {
              return '';
            }
          })
          .filter(elem => elem != '')
          .join(', '),
      };
    });

    return processedObject;
  } catch (err) {
    console.error(err);
  }
}

export async function renderUI(data) {
  movieListEl.innerHTML += data.map(elem => movieCardTemplate(elem)).join('');
}

// EXAMPLE OF HOW TO RENDER UI

// fetchData('/discover/movie', 1, '16').then(formatResponseData).then(renderUI);
