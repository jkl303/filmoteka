import { getCurrentPage } from './getCurrentPage';
// import { modalMovie } from './modal-movie';
import { renderUI } from './renderHomePageUI';
import { onSubmit } from './searchinputLogic';
import {filterByGenres} from './filter'
// Adds a red line under active page in the website header
getCurrentPage();

// UI render invocation
renderUI();


// Add modal-movie
// modalMovie();

// console.log(genres.then (data => console.log(data)));


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

