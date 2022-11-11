import { API_KEY, BASE_URL, IMG_URL } from './api-service';
import { getGenres } from './fetchGenres';
import movieCardTpl from './../templates/movie-card.hbs';
import axios from 'axios';
import { openModal } from './modal-movie';
import { main } from './pagination-homepage';

const moviesList = document.querySelector('.movie-list');
// export const guard = document.querySelector('.guard');
// const options = {
//   root: null,
//   rootMargin: '50px',
//   threshold: 1,
// };
// export const observer = new IntersectionObserver(renderUI, options); // двоит респ и разметку
// let page = 1;

export async function fetchInitialData(page = 1) {
  try {
    const {
      data: { results },
    } = await axios.get(`${BASE_URL}/trending/all/day`, {
      params: {
        api_key: API_KEY,
        page: page,
      },
    });

    return results;
  } catch (err) {
    return err;
  }
}

export async function convertResponseDataToObject(results) {
  const genresDictionary = await getGenres();
  return results.map(elem => {
    return {
      title: elem.title ? elem.title : elem.name,
      id: elem.id,
      image: `${IMG_URL + elem.poster_path}`,
      year: new Date(
        elem.first_air_date ? elem.first_air_date : elem.release_date
      ).getFullYear(),
      genres: elem.genre_ids
        .map((genreId, index) => {
          if (index < 2) {
            return genresDictionary[genreId]?.name;
          }
          if (index === 2) {
            return 'Other';
          }
          if (index > 2) {
            return '';
          }
        })
        .filter(elem => elem !== '')
        .join(', '),
    };
  });
}

export async function renderUI() {
  fetchInitialData(page)
    .then(convertResponseDataToObject)
    .then(data => {
      // if (page > 1) {
      //   moviesList.insertAdjacentHTML(
      //     'beforeend',
      //     data.map(elem => movieCardTpl(elem)).join('')
      //   );
      // } else {
      //   moviesList.innerHTML = data.map(elem => movieCardTpl(elem)).join('');
      // }
      moviesList.innerHTML = data.map(elem => movieCardTpl(elem)).join('');
      // observer.observe(guard); // двоит респ и разметку

      // page += 1;

      // // Adds event listeners to the movies list DOM element
      // const movieCards = document.querySelector('.movie-list');
      // console.log('before add listener:');
      // console.log(movieCards);
      // movieCards.addEventListener('click', evt => {
      //   evt.preventDefault();
      //   let t = evt.target;
      //   while (t.nodeName !== 'A' && t.parentNode !== null) {
      //     t = t.parentNode;
      //   }

      //   if (t.nodeName === 'A') {
      //     const movieId = parseInt(t.id);
      //     const movieSmallPoster = t.getElementsByTagName('img')[0].src;
      //     console.log(t);
      //     console.log('Рендер:', movieId, ', ', movieSmallPoster);

      //     openModal(movieId, movieSmallPoster);
      //   }
      // });
      // console.log('after add listener:');
      // console.log(movieCards);
    });
}
