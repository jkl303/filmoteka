import { API_KEY, BASE_URL, IMG_URL } from './api-service';


const movie_obj = JSON.parse(localStorage.getItem('QueuedList'));

movie_obj.forEach(element => {
  const queuedList = document.querySelector('.movie-list-queue');


const queuedList = document.querySelector('.movie-list');

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
      <p class='movie-title'>${element.original_title}</p>
      <p class='movie-description'>${element.genres
        .map(elem => `${elem.name}`)
        .join(', ')} | ${element.release_date}</p>
    </div>
  </a>
      `;
      queuedList.appendChild(libraryQueuedListEl);
    });
}
