import { Notify } from 'notiflix';
import { notifyParams } from './notifyParams';
import { API_KEY, BASE_URL, IMG_URL } from './api-service';
import { getGenres } from './fetchGenres';
import movieCardTpl from './../templates/movie-card.hbs';
import axios from 'axios';
import { addLoader, removeLoader } from './loader';


const refs = {
  input: document.querySelector('.search-input'),
  list: document.querySelector('.movie-list'),
  pageHeading: document.querySelector('.page-heading'),
  loaderContainer: document.querySelector('.loader-cotainer')
};

let searchQuery = '';
let genresList = null;

getGenresListData();
async function getGenresListData() {
  const genresData = await getGenres();

  genresList = genresData;
}

export async function onSubmit(evt) {
  evt.preventDefault();
  if (refs.input.value.trim() === '') {
    Notify.failure('Please enter the keyword', notifyParams);
    return;
  }
  searchQuery = refs.input.value;
  refs.pageHeading.classList.add('visually-hidden-title')
  searchRenderUI();
}

function searchRenderUI() {
  addLoader(refs.loaderContainer)

  fetchSearchedMovies(genresList)
    .then(data => {
      refs.list.innerHTML = data.map(elem => movieCardTpl(elem)).join('');
    })
    .catch(console.log);
}

async function fetchSearchedMovies(genresDictionary) {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}`
    );

    
    if (data.results.length !== 0) {
      return data.results.map(elem => {
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
    }
    Notify.failure(
      'No results on your request. Please update your request',
      notifyParams
    );
  } catch (error) {
    console.log(error);
  } finally {
    refs.input.value = '';
    removeLoader(refs.loaderContainer);
  }
}