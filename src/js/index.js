import { getCurrentPage } from './getCurrentPage';
// import { modalMovie } from './modal-movie';
import { renderUI } from './renderHomePageUI';
import { onSubmit } from './searchinputLogic';

import { becomeDark } from './changeTheme';
import { becomeLight } from './changeTheme';
import { storageChecker } from './changeTheme';


import { byName, byYear, setBubble } from './homePageSorting';


// Adds a red line under active page in the website header
getCurrentPage();

// UI render invocation
renderUI();


// searchInputLogic




const divForFilters = document.querySelector('.divForFilters')

divForFilters.addEventListener('change', e => {
  let selectValue = e.target.value
    console.dir(selectValue);
    if (selectValue !== '') {
         filterByGenres(selectValue)
    }
})


const searchForm = document.querySelector('.search-form');
searchForm.addEventListener('submit', onSubmit);


// change themes
storageChecker();
const dark = document.querySelector('[data-theme ="dark"]');
dark.addEventListener('click', becomeDark);
const light = document.querySelector('[data-theme ="light"]');
light.addEventListener('click', becomeLight);


const byNameSelect = document.querySelector('[name="by-name__select"]');
byNameSelect.addEventListener('change', () => byName(byNameSelect.value));

const byYearInput = document.querySelector('[name="by-year"]');
byYearInput.addEventListener('input', setBubble);
byYearInput.addEventListener('change', () => byYear(byYearInput.value));

