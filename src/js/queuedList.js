import { AddListenerToMovieList } from './modal-movie';
import { BASE_URL, API_KEY, IMG_URL } from './API';

const options = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export function apiLibraryQueued(movie_id) {
  return fetch(`${BASE_URL}/movie/${movie_id}?api_key=${API_KEY}`, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('fail');
    })
    .then(element => {
      const queuedList = document.querySelector('.movie-list');
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
    })
    .catch();
}
AddListenerToMovieList();
// openModal();
