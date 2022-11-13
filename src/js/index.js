import { getCurrentPage } from './getCurrentPage';
import { AddListenerToMovieList } from './modal-movie';
import { renderUI } from './renderHomePageUI';
import { onSubmit } from './searchinputLogic';
import { filterByGenres } from './filter';

import { becomeDark } from './changeTheme';
import { becomeLight } from './changeTheme';
import { storageChecker } from './changeTheme';

import { byName, byYear, setBubble } from './homePageSorting';

import debounce from 'debounce';

// Adds a red line under active page in the website header
getCurrentPage();

// UI render invocation
// renderUI();

// searchInputLogic();

// Add modal-movie
AddListenerToMovieList();

// searchInputLogic

const divForFilters = document.querySelector('.js-select');

divForFilters.addEventListener('change', e => {
  filterByGenres(divForFilters.value);
});

const searchForm = document.querySelector('.search-form');
searchForm.addEventListener('submit', onSubmit);

// change themes
storageChecker();
const dark = document.querySelector('[data-theme ="dark"]');
dark.addEventListener('click', becomeDark);
const light = document.querySelector('[data-theme ="light"]');
light.addEventListener('click', becomeLight);

// sort by name
const byNameSelect = document.querySelector('[name="by-name__select"]');
byNameSelect.addEventListener('change', () => {
  byName(byNameSelect.value);
});

// filter by year
const byYearInput = document.querySelector('[name="by-year"]');
byYearInput.addEventListener('input', setBubble);

byYearInput.addEventListener(
  'change',
  debounce(() => {
    byYear(byYearInput.value);
  }, 300)
);
