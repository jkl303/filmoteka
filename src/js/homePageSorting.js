import {
  fetchData,
  formatResponseData,
  renderUI,
} from './newDataFetchFunction';

import { removeEventListeners } from './removeBtnEventlisteners';
import { addLoader } from './loader';
import { addObserver } from './intersectionObserver';

const range = document.querySelector("input[type='range']");
const bubble = document.querySelector('.bubble');
const byNameSelect = document.querySelector('[name="by-name__select"]');
const byYearInput = document.querySelector('[name="by-year"]');
const loadBtn = document.querySelector('.load-btn');
const title = document.querySelector('.page-heading');
const movieListEl = document.querySelector('.movie-list');
const loaderContainer = document.querySelector('.loader-container');
const pagination = document.querySelector('.pagination');

let page = 1;

export async function byName(value) {
  movieListEl.innerHTML = '';
  addLoader(loaderContainer);
  pagination.classList.add('visually-hidden');
  title.textContent = `Sorted by title(${byNameSelect.value}ending)`;
  removeBubble();
  loadBtn.addEventListener('click', seeMoreByName);
  try {
    await fetchData(`/discover/movie?sort_by=title.${value}`)
      .then(formatResponseData)
      .then(renderUI);
  } catch (error) {
    console.log(error);
  }
}

export async function seeMoreByName() {
  page += 1;
  addLoader(loaderContainer);
  loadBtn.classList.remove('load-btn-visible');
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
  removeEventListeners();
  movieListEl.innerHTML = '';
  title.textContent = `Movies released in ${byYearInput.value}`;
  loadBtn.addEventListener('click', seeMoreByYear);
  try {
    await fetchData(`/discover/movie?primary_release_year=${year}`)
      .then(formatResponseData)
      .then(renderUI);
  } catch (error) {
    console.log(error);
  }
}

export async function seeMoreByYear() {
  addLoader(loaderContainer);
  loadBtn.classList.remove('load-btn-visible');
  page += 1;
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
