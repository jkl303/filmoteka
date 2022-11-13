import { API_KEY, BASE_URL, IMG_URL } from './api-service';
import { getCurrentPage } from './getCurrentPage';
import { AddListenerToMovieList } from './modal-movie';
import { apiLibraryQueued } from './queuedList.js';

const options = {
  headers: {
    'Content-Type': 'application/json',
  },
};

function storageLibraryChecker() {
  if (localStorage.getItem('theme') !== null) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}
storageLibraryChecker();

getCurrentPage();

const movie_id = JSON.parse(localStorage.getItem('WatchedList'));
const watchedList = document.querySelector('.movie-list');
const titleOnClick = document.querySelector('.page-heading');
const queuedBtnLibrary = document.getElementById(
  'js-navigationLibraryButtonQueue'
);
const watchedBtnLibrary = document.getElementById(
  'js-navigationLibraryButtonWatched'
);

watchedBtnLibrary.disabled = true;
queuedBtnLibrary.disabled = false;
titleOnClick.innerHTML = 'Watched movie';

watchedList.innerHTML = '';

movie_id.forEach(element => {
  apiLibraryWatched(element);
});

export function apiLibraryWatched(movie_id) {
  return fetch(`${BASE_URL}/movie/${movie_id}?api_key=${API_KEY}`, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('fail');
      }
      return response.json();
    })
    .then(data => {
      const watchedList = document.querySelector('.movie-list');
      const libraryWatchedListEl = document.createElement('li');

      libraryWatchedListEl.classList.add('movie-item');
      libraryWatchedListEl.innerHTML = `
      <a href='${data.id}' id = '${data.id}' class='movie-link'>
    <img src='${IMG_URL}${data.poster_path}' alt='' class='movie-image' />
    <div class='movie-info'>
      <p class='movie-title'>${data.original_title}</p>
      <p class='movie-description'>${data.genres
        .map(elem => `${elem.name}`)
        .join(', ')} | ${data.release_date}</p>
    </div>
  </a>
      `;
      watchedList.appendChild(libraryWatchedListEl);
    });
}

queuedBtnLibrary.addEventListener('click', e => {
  e.preventDefault();
  queuedBtnLibrary.disabled = true;
  watchedBtnLibrary.disabled = false;
  titleOnClick.innerHTML = 'Queued movie';
  const movieList = document.querySelector('.movie-list');
  movieList.innerHTML = '';

  const movie_idQ = JSON.parse(localStorage.getItem('QueuedList'));
  movie_idQ.forEach(element => {
    apiLibraryQueued(element);
  });
});

watchedBtnLibrary.addEventListener('click', e => {
  e.preventDefault();
  watchedBtnLibrary.disabled = true;
  queuedBtnLibrary.disabled = false;
  titleOnClick.innerHTML = 'Watched movie';

  const movieList = document.querySelector('.movie-list');
  movieList.innerHTML = '';
  const movie_id = JSON.parse(localStorage.getItem('WatchedList'));
  movie_id.forEach(element => {
    apiLibraryWatched(element);
  });
});

// Add modal-movie
AddListenerToMovieList();
