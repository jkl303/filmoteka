import { API_KEY, BASE_URL, IMG_URL } from './api-service';
import movieCardTpl from './../templates/movie-card.hbs';
import { getCurrentPage } from './getCurrentPage';
import { openModal } from './modal-movie';
// import { AddListenerToMovieList } from './modal-movie';

const movie_obj = JSON.parse(localStorage.getItem('QueuedList'));

movie_obj.forEach(element => {
  const queuedList = document.querySelector('.movie-list-queue');

  const libraryQueuedListEl = document.createElement('li');
  libraryQueuedListEl.classList.add('movie-item');
  libraryQueuedListEl.innerHTML = `
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
  queuedList.appendChild(libraryQueuedListEl);
});

// Add modal-movie
// AddListenerToMovieList();
