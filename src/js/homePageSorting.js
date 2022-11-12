import {
  fetchData,
  formatResponseData,
  renderUI,
} from './newDataFetchFunction';

const range = document.querySelector("input[type='range']");
const bubble = document.querySelector('.bubble');
const byNameSelect = document.querySelector('[name="by-name__select"]');
const byYearInput = document.querySelector('[name="by-year"]');
const loadBtn = document.querySelector('.load-btn');
const title = document.querySelector('.page-heading');
const movieListEl = document.querySelector('.movie-list');

let page = 1;

export async function byName(value) {
  movieListEl.innerHTML = '';
  title.textContent = `Sorted by title(${byNameSelect.value}ending)`;
  removeBubble();
  loadBtn.addEventListener('click', seeMoreByName);
  try {
    await fetchData(`/discover/movie?sort_by=title.${value}`, page)
      .then(formatResponseData)
      .then(renderUI);
  } catch (error) {
    console.log(error);
  }
}
export async function byYear(year) {
  movieListEl.innerHTML = '';
  title.textContent = `Movies released in ${byYearInput.value}`;
  loadBtn.addEventListener('click', seeMoreByDate);
  try {
    await fetchData(`/discover/movie?primary_release_year=${year}`, page)
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

async function seeMoreByName() {
  page += 1;
  try {
    await fetchData(`/discover/movie?sort_by=title.${byNameSelect.value}`, page)
      .then(formatResponseData)
      .then(renderUI);
  } catch (error) {
    console.log(error);
  }
}

async function seeMoreByDate() {
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
