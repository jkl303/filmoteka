import {API_KEY} from './api-service'
import filter from '../templates/filter.hbs'

const select = document.querySelector ('.js-select')

  async function getGenres() {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`,
    );

      if (response.ok) {
      return await response.json();
    }
    newToastr.error('Unsuccessful results. Try again!');
    throw new Error(await response.text());
  }


async function getFetchGenres() {
    const genres = await getGenres()

   return genres
}

async function generateOptions() {

    let genresArr = {}

    const dataForGenerateOptions = await getFetchGenres()
    const arrayUi = dataForGenerateOptions.genres.map ( el => el)
    arrayUi.push(genresArr);
    const markup = arrayUi.map(el => filter ({ el }))
  select.innerHTML = '';
  select.insertAdjacentHTML('beforeend', markup);
}
generateOptions()