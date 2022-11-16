import {
  fetchData,
  formatResponseData,
  renderUI,
} from './newDataFetchFunction';

import { removeEventListeners, removeBtn } from './removeBtnEventlisteners';
import { addLoader } from './loader';
import { addObserver } from './intersectionObserver';

const range = document.querySelector("input[type='range']");
const bubble = document.querySelector('.bubble');
const byNameSelect = document.querySelector('[name="by-name__select"]');
const byYearInput = document.querySelector('[name="by-year"]');
const title = document.querySelector('.page-heading');
const movieListEl = document.querySelector('.movie-list');
const loaderContainer = document.querySelector('.loader-container');
const pagination = document.querySelector('.pagination');

let page = 1;

export async function byName(value) {
  movieListEl.innerHTML = '';
  addLoader(loaderContainer);
  pagination.classList.add('visually-hidden');
  title.textContent = `Sorted by title(${value}ending)`;
  removeBubble();
  removeEventListeners(seeMoreByName);
  try {
    await fetchData(`/discover/movie?sort_by=title.${value}`)
      .then(formatResponseData)
      .then(renderUI);
  } catch (error) {
    console.log(error);
  }
}

async function seeMoreByName() {
  page += 1;
  addLoader(loaderContainer);
  removeBtn();
  try {
    await fetchData(`/discover/movie?sort_by=title.${byNameSelect.value}`, page)
      .then(formatResponseData)
      .then(renderUI);
  } catch (error) {
    console.log(error);
  }
}

export async function byYear(year) {
  addLoader(loaderContainer);
  pagination.classList.add('visually-hidden');
  addObserver();
  movieListEl.innerHTML = '';
  title.textContent = `Movies released in ${year}`;
  removeEventListeners(seeMoreByYear);
  try {
    await fetchData(`/discover/movie?primary_release_year=${year}`)
      .then(formatResponseData)
      .then(renderUI);
  } catch (error) {
    console.log(error);
  }
}

async function seeMoreByYear() {
  addLoader(loaderContainer);
  page += 1;
  removeBtn();
  try {
    await fetchData(
      `/discover/movie?primary_release_year=${byYearInput.value}`,
      page
    )
      .then(formatResponseData)
      .then(renderUI);
  } catch (error) {
    console.log(error);
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

export function removeBubble() {
  const bubble = document.querySelector('.bubble');
  bubble.style.visibility = 'hidden';
}