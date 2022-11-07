import { getCurrentPage } from './getCurrentPage';
// import { modalMovie } from './modal-movie';
import { renderUI } from './renderHomePageUI';
import { onSubmit } from './searchinputLogic';
// Adds a red line under active page in the website header
getCurrentPage();

// UI render invocation
renderUI();


// Add modal-movie
modalMovie();

console.log(genres.then (data => console.log(data)));


// searchInputLogic

const searchForm = document.querySelector('.search-form');
searchForm.addEventListener('submit', onSubmit);

