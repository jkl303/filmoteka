import axios from 'axios';
import movieCardTpl from './../templates/movie-card.hbs';
import { removeLoader } from './loader';
import { addObserver, removeObserver } from './intersectionObserver';

const movieListEl = document.querySelector('.movie-list');
const loaderContainer = document.querySelector('.loader-container');
const { BASE_URL, API_KEY, IMG_URL } = process.env;

const defaultImg =
  'https://www.gulftoday.ae/-/media/gulf-today/images/articles/opinion/2022/8/7/cinema.ashx?h=450&la=en&w=750&hash=EB12327C59FAEB577FBED56AF6BF2E12';
const defaultYear = 'Year unknown';
const defaultGenre = 'Genre unknown';

let genresDictionary = {};

export async function fetchData(endpoint, page, genres) {
  try {
    const {
      data: { total_pages, results },
    } = await axios.get(BASE_URL + endpoint, {
      params: {
        api_key: API_KEY,
        page: page,
        with_genres: genres,
      },
    });

    switch (total_pages) {
      case 0:
        movieListEl.innerHTML = '<p class="nothing-p">Nothing to show</p>';
      case 1:
        document
          .querySelector('.load-btn')
          .classList.remove('load-btn-visible');
      case total_pages > 1:
        addObserver();
      case total_pages === page || total_pages <= 1:
        removeObserver();
      default:
        document
          .querySelector('.load-btn')
          .classList.remove('load-btn-visible');
    }
    return results;
  } catch (err) {
    console.error(err);
  }
}

export async function fetchGenres(endpoint) {
  try {
    const {
      data: { genres },
    } = await axios.get(BASE_URL + endpoint, {
      params: {
        api_key: API_KEY,
      },
    });
    return genres;
  } catch (err) {
    console.error(err);
  }
}

async function composeGenresDictionary() {
  if (Object.entries(genresDictionary).length !== 0) {
    return genresDictionary;
  }
  if (Object.entries(genresDictionary).length === 0) {
    const movieGenres = await fetchGenres('/genre/movie/list');
    const tvGenres = await fetchGenres('/genre/tv/list');
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
        year: elem.release_date
          ? new Date(
              elem.release_date ? elem.release_date : elem.first_air_date
            ).getFullYear()
          : defaultYear,
        image: elem.poster_path ? `${IMG_URL + elem.poster_path}` : defaultImg,
        overview: elem.overview,
        genres:
          elem.genre_ids.length === 0
            ? defaultGenre
            : elem.genre_ids
                .map((elem, index) => {
                  switch (index) {
                    case index < 2:
                      return genresDictionary[elem].name;
                    case index === 2:
                      return 'Other';
                    case index > 2:
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
  } finally {
    removeLoader(loaderContainer);
  }
}

export async function renderUI(data) {
  movieListEl.innerHTML += data.map(elem => movieCardTpl(elem)).join('');
}
