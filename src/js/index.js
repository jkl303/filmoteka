import { getCurrentPage } from './getCurrentPage';
import { modalMovie } from './modal-movie';
import { renderUI } from './renderHomePageUI';

// Adds a red line under active page in the website header
getCurrentPage();

// UI render invocation
renderUI();

// Add modal-movie
modalMovie();

console.log(genres.then (data => console.log(data)));