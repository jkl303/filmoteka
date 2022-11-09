import { API_KEY, BASE_URL, IMG_URL } from './api-service';
import axios from 'axios';
import { addLoader, removeLoader } from './loader';
const container = document.querySelector('main .container');
const range = document.querySelector("input[type='range']");
const bubble = document.querySelector('.bubble');
const title = document.querySelector('.page-heading');

export async function byName(value) {
  try {
    if (value === 'empty') {
    } else {
      title.textContent = `Sorted by title(${value}ending)`;
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
    title.textContent = `Movies released in ${year}`;
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

export function setBubble() {
  bubble.style.visibility = 'visible';
  const val = range.value;
  const min = range.min ? range.min : 0;
  const max = range.max ? range.max : 100;
  const newVal = Number(((val - min) * 100) / (max - min));
  bubble.innerHTML = val;
  bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}
