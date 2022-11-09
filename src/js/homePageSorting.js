import { API_KEY, BASE_URL, IMG_URL } from './api-service';
import axios from 'axios';
import { addLoader, removeLoader } from './loader';
const container = document.querySelector('main .container');

export async function byName(value) {
  try {
    if (value === 'empty') {
    } else {
      const {
        data: { results },
      } = await axios.get(`${BASE_URL}/discover/movie?sort_by=title.${value}`, {
        params: {
          api_key: API_KEY,
        },
      });

      console.log(results);
    }
  } catch (err) {
    return err;
  }
}

export async function byYear(year) {
  try {
    const {
      data: { results },
    } = await axios.get(
      `${BASE_URL}/discover/movie?primary_release_year=${year}`,
      {
        params: {
          api_key: API_KEY,
        },
      }
    );

    console.log(results);
  } catch (err) {
    return err;
  }
}
