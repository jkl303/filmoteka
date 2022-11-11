import { Notify } from 'notiflix';
import { notifyParams } from './notifyParams';
import { API_KEY, BASE_URL, IMG_URL } from './api-service';
import { getGenres } from './fetchGenres';
import movieCardTpl from './../templates/movie-card.hbs';
import axios from 'axios';
import { addLoader, removeLoader } from './loader';
// import { guard, observer } from './renderHomePageUI';

const refs = {
  input: document.querySelector('.search-input'),
  list: document.querySelector('.movie-list'),
  pageHeading: document.querySelector('.page-heading'),
  loaderContainer: document.querySelector('.loader-cotainer'),
  loadBtn: document.querySelector('.load-btn'),
  container: document.querySelector('main .container'),
};

console.log(refs.container);
const defaultImg =
  'https://www.gulftoday.ae/-/media/gulf-today/images/articles/opinion/2022/8/7/cinema.ashx?h=450&la=en&w=750&hash=EB12327C59FAEB577FBED56AF6BF2E12';
let searchQuery = '';
let genresList = null;
let page = 1;

const observerOpions = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0,
};
const searchResultsObserver = new IntersectionObserver(
  onBtnShow,
  observerOpions
);

refs.loadBtn.addEventListener('click', onLoadBtnClick);

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
  refs.pageHeading.textContent = 'Searching results';
  searchRenderUI();

  // observer from first render
  observer.unobserve(guard);

  searchResultsObserver.observe(guard);
}

function searchRenderUI() {
  addLoader(refs.loaderContainer);

  fetchSearchedMovies(genresList)
    .then(data => {
      refs.list.innerHTML = data.map(elem => movieCardTpl(elem)).join('');
    })
    .catch(console.log);
}

async function fetchSearchedMovies(genresDictionary) {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${page}`
    );

    if (data.page === data.total_pages) {
      searchResultsObserver.unobserve(guard);
    }

    if (data.results.length !== 0) {
      return data.results.map(elem => {
        const movieDate = new Date(
          elem.first_air_date ? elem.first_air_date : elem.release_date
        ).getFullYear();

        return {
          title: elem.title ? elem.title : elem.name,
          id: elem.id,
          image: elem.poster_path
            ? `${IMG_URL + elem.poster_path}`
            : defaultImg,
          year: movieDate ? movieDate : '',

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
    removeLoader(guard);
  }
}

function onBtnShow(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      refs.list.style.marginBottom = '75px';
      refs.loadBtn.classList.add('load-btn-visible');
    }
  });
}

function onLoadBtnClick(evt) {
  refs.loadBtn.classList.remove('load-btn-visible');
  page += 1;

  upgradeUI();
}

function upgradeUI() {
  addLoader(guard);

  fetchSearchedMovies(genresList)
    .then(data => {
      refs.list.insertAdjacentHTML(
        'beforeend',
        data.map(elem => movieCardTpl(elem)).join('')
      );
    })
    .catch(console.log);
}
