import { API_KEY, BASE_URL, IMG_URL } from './api-service';
import movieCardTpl from './../templates/movie-card.hbs';
import { getCurrentPage } from './getCurrentPage';
import { openModal } from './modal-movie';
import { AddListenerToMovieList } from './modal-movie';

const movie_idQ = JSON.parse(localStorage.getItem('QueuedList'));

const options = {
  headers: {
    'Content-Type': 'application/json',
  },
};

movie_idQ.forEach(element => {
  apiLibraryQueued(element);
});

const queuedList = document.querySelector('.movie-list-queue');

export function apiLibraryQueued(movie_idQ) {
  return fetch(`${BASE_URL}/movie/${movie_idQ}?api_key=${API_KEY}`, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('fail');
      }
      return response.json();
    })
    .then(data => {
      const libraryQueuedListEl = document.createElement('li');
      libraryQueuedListEl.classList.add('movie-item');
      libraryQueuedListEl.innerHTML = `
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
      queuedList.appendChild(libraryQueuedListEl);
    });
}

// Add modal-movie
AddListenerToMovieList();
