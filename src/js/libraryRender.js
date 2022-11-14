import { IMG_URL } from './api-service';
import movieCardTpl from './../templates/movie-card.hbs';
import { defaultImg } from './searchinputLogic';
import { Notify } from 'notiflix';
import { notifyParams } from './notifyParams';

export function render(movie) {
  const queuedList = document.querySelector('.movie-list');

  try {
    const markupArr = movie.map(elem => {
      const movieDate = new Date(
        elem.first_air_date ? elem.first_air_date : elem.release_date
      ).getFullYear();

      const forRenderArr = {
        title: elem.title ? elem.title : elem.name,
        id: elem.id,
        image: elem.poster_path ? `${IMG_URL + elem.poster_path}` : defaultImg,
        year: movieDate ? movieDate : '',

        genres: elem.genres.map(elem => `${elem.name}`).join(', '),
      };

      return forRenderArr;
    });

    queuedList.innerHTML = markupArr.map(elem => movieCardTpl(elem)).join('');
  } catch (error) {
    Notify.failure('oooops! library is clear', notifyParams);
  }
}
