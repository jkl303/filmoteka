import {
  fetchData, formatResponseData, renderUI
} from './newDataFetchFunction';

const range = document.querySelector("input[type='range']");
const bubble = document.querySelector('.bubble');
const byNameSelect = document.querySelector('[name="by-name__select"]');
const byYearInput = document.querySelector('[name="by-year"]');

let page = 1;

export async function byName(value) {
  try {
    await fetchData(`/discover/movie?sort_by=title.${value}`, page).then(formatResponseData).then(renderUI);
  }
  catch (error) {
    console.log(error);
  }
}
export async function byYear(year) {
  try {
  await fetchData(`/discover/movie?primary_release_year=${year}`, page).then(formatResponseData).then(renderUI);
    }
  catch (error) {
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

export function seeMoreByName() {
  page += 1;
  byName(byNameSelect.value, page);
}
    
export function seeMoreByDate() {
  page += 1;
  byYear(byYearInput.value, page);
}

