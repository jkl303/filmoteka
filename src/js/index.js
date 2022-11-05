import { getCurrentPage } from './getCurrentPage';
import { Fetchmovie } from './homepagerender';
// import markupMovie from '../templates/movie-card.hbs';
const list = document.querySelector('.movie-list');
import { getGenresForMovies, getGenresForTv } from './fetchGenres';
import { modalMovie } from './modal-movie'


getCurrentPage();

Fetchmovie()
  .then(data => {
    return data.results;
  })
  .then(movies => {
    list.innerHTML = '';
    list.insertAdjacentHTML(`beforeend`, markupMovie(movies));
    function markupMovie(array) {
      return array
        .map(
          arr =>
            `<li class='movie-item'>
      <a href= '${arr.id}' class='movie-link'>
        <img src='https://image.tmdb.org/t/p/w500/${arr.poster_path}' alt='${
              arr.title
            }' class='movie-image' />
        <div class='movie-info'>
          <p class='movie-title'>${arr.title}</p>
          <div class="movie-conteiner">
          <p class='movie-description'>${arr.genre_ids} |
          ${arr.release_date.slice(0, 4)}</p>
          <p class ="movie-ratting is-hidden"> ${arr.vote_average}</p>
          </div>
        </div>
      </a>
    </li>`
        )
        .join('');
    }
  })
  .catch(error => {
    console.log(error.message);
  });
// Fetches genres for movies and tv series;

getGenresForMovies();
getGenresForTv();

// Add modal-movie 

modalMovie();
