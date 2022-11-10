import { API_KEY, BASE_URL, IMG_URL } from './api-service';
import movieCardTpl from './../templates/movie-card.hbs';
import { getCurrentPage } from './getCurrentPage';
import { openModal } from './modal-movie';
import { fetchInitialData } from './renderHomePageUI';
// import { getGenres } from './fetchGenres';

getCurrentPage();

const movie_id = JSON.parse(localStorage.getItem('WatchedList'));
// console.log(movie_id);

const options = {
  headers: {
    'Content-Type': 'application/json',
  },
};

movie_id.forEach(element => {
  apiLibraryWatched(element);
});

const watchedList = document.querySelector('.movie-list');

function apiLibraryWatched(movie_id) {
  return fetch(`${BASE_URL}/movie/${movie_id}?api_key=${API_KEY}`, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('fail');
      }
      return response.json();
    })
    .then(data => {
      // console.log(data);
      // data.map(elem => {
      //   return {
      //     title: elem.title ? elem.title : elem.name,
      //     id: elem.id,
      //     image: `${IMG_URL + elem.poster_path}`,
      //     year: new Date(
      //       elem.first_air_date ? elem.first_air_date : elem.release_date
      //     ).getFullYear(),
      //     genres: elem.genre_ids
      //       .map((genreId, index) => {
      //         if (index < 2) {
      //           return genresDictionary[genreId]?.name;
      //         }
      //         if (index === 2) {
      //           return 'Other';
      //         }
      //         if (index > 2) {
      //           return '';
      //         }
      //       })
      //       .filter(elem => elem !== '')
      //       .join(', '),
      //   };
      // });

      // return {
      //   title: data.title ? data.title : data.name,
      //   id: data.id,
      //   image: `${IMG_URL + data.poster_path}`,
      //   year: new Date(
      //     data.first_air_date ? data.first_air_date : data.release_date
      //   ).getFullYear(),
      // };
      console.log(data);
      watchedList.insertAdjacentHTML('beforeend', movieCardTpl(data));
    });
}
apiLibraryWatched(movie_id);

const queuedBtnLibrary = document.getElementById(
  'js-navigationLibraryButtonQueue'
);
queuedBtnLibrary.addEventListener('click', onClickQueuedBtn);
function onClickQueuedBtn(e) {
  e.preventDefault();
  const queuedList = document.querySelector('.movie-list');
  queuedList.classList.add('hidden');
}

const watchedBtnLibrary = document.getElementById(
  'js-navigationLibraryButtonWatched'
);
watchedBtnLibrary.addEventListener('click', onClickWathedBtn);
function onClickWathedBtn(e) {
  e.preventDefault();
  const watchedBtn = document.querySelector('.movie-list-queued');
  watchedBtn.classList.add('hidden');
  const queuedList = document.querySelector('.movie-list');
  queuedList.classList.remove('hidden');
}
