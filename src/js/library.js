import { API_KEY, BASE_URL, IMG_URL } from './api-service';
import movieCardTpl from './../templates/movie-card.hbs';
import { getCurrentPage } from './getCurrentPage';
import { openModal } from './modal-movie';
import { fetchInitialData } from './renderHomePageUI';

getCurrentPage();

const movie_id = JSON.parse(localStorage.getItem('WatchedList'));

const options = {
  headers: {
    'Content-Type': 'application/json',
  },
};

movie_id.forEach(element => {
  apiLibraryWatched(element);
});

const watchedList = document.querySelector('.movie-list');

export function apiLibraryWatched(movie_id) {
  return fetch(`${BASE_URL}/movie/${movie_id}?api_key=${API_KEY}`, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('fail');
      }
      return response.json();
    })
    .then(data => {
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
const queuedListForClick = document.querySelector('.movie-list-queue');
const watchedListForClick = document.querySelector('.movie-list');

const queuedBtnLibrary = document.getElementById(
  'js-navigationLibraryButtonQueue'
);
queuedBtnLibrary.addEventListener('click', e => {
  e.preventDefault();
  queuedBtnLibrary.disabled = true;
  watchedListForClick.style.display = 'none';
  queuedListForClick.style.display = 'flex';
  watchedBtnLibrary.disabled = false;
});

const watchedBtnLibrary = document.getElementById(
  'js-navigationLibraryButtonWatched'
);

watchedBtnLibrary.addEventListener('click', e => {
  e.preventDefault();
  watchedBtnLibrary.disabled = true;
  queuedListForClick.style.display = 'none';
  watchedListForClick.style.display = 'flex';
  queuedBtnLibrary.disabled = false;
});
