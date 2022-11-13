import { API_KEY, BASE_URL, IMG_URL } from './api-service';
import movieCardTpl from './../templates/movie-card.hbs';
import { getCurrentPage } from './getCurrentPage';
import { openModal } from './modal-movie';
import Notiflix from 'notiflix';
import { queuedListHandler } from './queuedList';
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

queuedBtnLibrary.addEventListener('click', e => {
  e.preventDefault();
  queuedBtnLibrary.disabled = true;
  watchedBtnLibrary.disabled = false;
  titleOnClick.innerHTML = 'Queued movie';
  const movieList = document.querySelector('.movie-list');
  movieList.innerHTML = '';

  const movie_idQ = JSON.parse(localStorage.getItem('QueuedList'));
  console.log(movie_idQ);
  movie_idQ.forEach(id => {
    apiLibraryQueued(id);
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
    .then(element => {
      const watchedList = document.querySelector('.movie-list');
      const libraryWatchedListEl = document.createElement('li');
      libraryWatchedListEl.classList.add('movie-item');
      libraryWatchedListEl.innerHTML = `

      <a href='${element.id}' id = '${element.id}' class='movie-link'>
    <img src='${IMG_URL}${element.poster_path}' alt='' class='movie-image' />
    <div class='movie-info'>
      <p class='movie-title'>${element.original_title}</p>
      <p class='movie-description'>${element.genres
        .map(elem => `${elem.name}`)
        .join(', ')} | ${element.release_date}</p>
    </div>
  </a>
      `;

      watchedList.appendChild(libraryWatchedListEl);
    })
    .catch();
}

// Add modal-movie
AddListenerToMovieList();
