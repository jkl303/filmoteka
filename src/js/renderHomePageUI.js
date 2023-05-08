import { getGenres } from './fetchGenres';
import movieCardTpl from './../templates/movie-card.hbs';
import axios from 'axios';
import { renderPages } from './pagination-homepage';
import { BASE_URL, API_KEY, IMG_URL } from './API';
const moviesList = document.querySelector('.movie-list');
let page = 1;

export async function fetchInitialData(page = 1) {
  try {
    const {
      data: { results },
    } = await axios.get(`${BASE_URL}/trending/all/day`, {
      params: {
        api_key: API_KEY,
        page: page,
      },
    });

    return results;
  } catch (err) {
    return err;
  }
}

export async function convertResponseDataToObject(results) {
  const genresDictionary = await getGenres();
  return results.map(elem => {
    return {
      title: elem.title ? elem.title : elem.name,
      id: elem.id,
      media_type: elem.media_type,
      image: `${IMG_URL + elem.poster_path}`,
      year: new Date(
        elem.first_air_date ? elem.first_air_date : elem.release_date
      ).getFullYear(),
      genres: elem.genre_ids
        .map((genreId, index) => {
          if (index < 2) {
            return genresDictionary[genreId]?.name;
          }
          if (index === 2) {
            return 'Other';
          }
          if (index > 2) {
            return '';
          }
        })
        .filter(elem => elem !== '')
        .join(', '),
    };
  });
}

export async function renderUI() {
  fetchInitialData(page)
    .then(convertResponseDataToObject)
    .then(data => {
      moviesList.innerHTML = data.map(elem => movieCardTpl(elem)).join('');
    });
}

renderPages();
