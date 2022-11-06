import { API_KEY, BASE_URL, IMG_URL } from './api-service';
import { getGenres } from './fetchGenres';
import movieCardTpl from './../templates/movie-card.hbs';
import axios from 'axios';
import { openModal } from './modal-movie';

const genresDictionary = {};
const moviesList = document.querySelector('.movie-list');
const guard = document.querySelector('.guard');

const options = {
  root: null,
  rootMargin: '50px',
  threshold: 1,
};
const observer = new IntersectionObserver(onLoad, options);
let page = 1;

// loadMore.addEventListener('click', onLoad);

async function getInitialData(genresDictionary, page = 1) {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/trending/all/day?page=${page}`,
      {
        params: {
          api_key: API_KEY,
        },
      }
    );

    return data.results.map(elem => {
      // data.page += 1;
      return {
        title: elem.title ? elem.title : elem.name,
        id: elem.id,
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
  } catch (err) {
    return err;
  }
}

export async function renderUI() {
  const genresList = await getGenres();

  getInitialData(genresList).then(data => {
    moviesList.innerHTML = data.map(elem => movieCardTpl(elem)).join('');
    observer.observe(guard);
  });

  //addListeners to each MovieCard

  const movieCards = document.querySelector('.movie-list');
  movieCards.addEventListener('click', evt => {
    evt.preventDefault();
    // console.log(evt)
    let t = evt.target;
    while (t.nodeName !== 'A' && t.parentNode !== null) {
      t = t.parentNode;
    }

    if (t.nodeName === 'A') {
      // console.log(t.id);
      const movieId = parseInt(t.id);
      const a = openModal(movieId);
    }
  });
}

//Infinite scroll for Homepage
async function onLoad() {
  const genresList = await getGenres();
  if (page > 1) {
    getInitialData(genresList, page).then(data => {
      moviesList.insertAdjacentHTML(
        'beforeend',
        data.map(elem => movieCardTpl(elem)).join('')
      );
    });
  }

  page += 1;
}
