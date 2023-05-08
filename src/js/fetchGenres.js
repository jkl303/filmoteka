import axios from 'axios';
import { BASE_URL, API_KEY } from './API';

const genresDictionary = {};

async function fetchMovieGenres() {
  try {
    const {
      data: { genres },
    } = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: {
        api_key: API_KEY,
      },
    });
    return genres;
  } catch (err) {
    console.error(err);
  }
}

async function fetchTvGenres() {
  try {
    const {
      data: { genres },
    } = await axios.get(`${BASE_URL}/genre/tv/list`, {
      params: {
        api_key: API_KEY,
      },
    });
    return genres;
  } catch (err) {
    console.error(err);
  }
}

export async function getGenres() {
  try {
    if (Object.entries(genresDictionary).length !== 0) {
      return genresDictionary;
    } else {
      const movieGenres = await fetchMovieGenres();
      const tvGenres = await fetchTvGenres();

      const allGenresArray = [...movieGenres, ...tvGenres];

      allGenresArray.forEach(elem => {
        genresDictionary[elem.id] = elem;
      });

      return genresDictionary;
    }
  } catch (err) {
    console.error(err);
  }
}
