import { API_KEY, BASE_URL } from './api-service';
import axios from 'axios';
import movieCardTpl from './../templates/movie-card.hbs';
import {
  fetchInitialData,
  renderUI,
  convertResponseDataToObject,
} from './renderHomePageUI';

let page = 1;
async function getData(page) {
  try {
    const response = await axios.get(`${BASE_URL}/trending/all/day`, {
      params: {
        api_key: API_KEY,
        page: page,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    return err;
  }
}

async function renderPages() {
  const filmData = await getData(page);
  console.log(filmData);
  const totalPages = filmData.total_pages;
  const totalResults = filmData.total_results;
  const resultsArr = filmData.results;
  let currentPageNumber = 1;
  let cards = 20;

  function displayFilmsList(arrData, cardsPerPage, page) {
    const moviesList = document.querySelector('.movie-list');
    moviesList.innerHTML = '';

    // const paginatedData = arrData.slice(start, end);
    fetchInitialData(page)
      .then(convertResponseDataToObject)
      .then(data => {
        moviesList.innerHTML = data.map(elem => movieCardTpl(elem)).join('');
      });
  }

  function displayPagination() {
    const paginationEl = document.querySelector('.pagination');
    const ulEl = document.createElement('ul');
    const pagesCount = 10;
    ulEl.classList.add('pagination__list');
    ulEl.style.display = 'flex';
    ulEl.style.justifyContent = 'center';

    for (let i = 0; i < pagesCount; i++) {
      const liEl = displayPaginationBtn(i + 1);
      ulEl.appendChild(liEl);
    }
    paginationEl.appendChild(ulEl);
  }
  function displayPaginationBtn(page) {
    const liEl = document.createElement('li');
    liEl.classList.add('pagination__item');
    liEl.innerText = page;

    liEl.addEventListener('click', evt => {
      let clickedPage = Number(evt.target.innerHTML);
      console.log(clickedPage);
      displayFilmsList(filmData, cards, clickedPage);
      page = clickedPage;
    });
    return liEl;
  }

  displayFilmsList(filmData, cards, currentPageNumber);
  displayPagination();
}

renderPages();
