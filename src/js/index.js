import { getCurrentPage } from './getCurrentPage';
// import { modalMovie } from './modal-movie';
import { renderUI } from './renderHomePageUI';
import { onSubmit } from './searchinputLogic';
import { becomeDark } from './changeTheme';
import { becomeLight } from './changeTheme';
import { storageChecker } from './changeTheme';
// Adds a red line under active page in the website header
getCurrentPage();

// UI render invocation
renderUI();

// searchInputLogic

const searchForm = document.querySelector('.search-form');
searchForm.addEventListener('submit', onSubmit);

// change themes
storageChecker();
const dark = document.querySelector('[data-theme ="dark"]');
dark.addEventListener('click', becomeDark);
const light = document.querySelector('[data-theme ="light"]');
light.addEventListener('click', becomeLight);
