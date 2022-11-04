import { BASE_URL } from './api-service';
import { API_KEY } from './api-service';

import axios from 'axios';

export const movieGenresArray = [];

export async function getGenresForMovies() {
  try {
    const {
      data: { genres },
    } = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: {
        api_key: API_KEY,
      },
    });
    genres.map(elem => movieGenresArray.push(elem));
  } catch (err) {
    return err;
  }
}

export async function getGenresForTv() {
  try {
    const {
      data: { genres },
    } = await axios.get(`${BASE_URL}/genre/tv/list`, {
      params: {
        api_key: API_KEY,
      },
    });
    genres.map(elem => movieGenresArray.push(elem));
  } catch (err) {
    return err;
  }
}
