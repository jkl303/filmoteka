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
    // console.log(response.data);
    return response.data;
  } catch (err) {
    return err;
  }
}

async function renderPages() {
  const filmData = await getData(page);
  // console.log(filmData);
  const totalPages = filmData.total_pages;
  //   const totalResults = filmData.total_results;
  //   const resultsArr = filmData.results;
  let initialPageNumber = 1;
  let currentPageNumber = 1;

  const arrowRightBtn = document.createElement('button');
  arrowRightBtn.classList.add('arrow-right');
  arrowRightBtn.innerHTML =
    '<img src="https://img.icons8.com/office/16/null/circled-chevron-right.png"/>';

  const arrowLeftBtn = document.createElement('button');
  arrowLeftBtn.classList.add('arrow-left');
  arrowLeftBtn.innerHTML =
    '<img src="https://img.icons8.com/office/16/null/circled-chevron-left.png"/>';

  function displayFilmsList(page) {
    const moviesList = document.querySelector('.movie-list');
    moviesList.innerHTML = '';

    // console.log('Page: ', page);
    fetchInitialData(page)
      .then(convertResponseDataToObject)
      .then(data => {
        moviesList.innerHTML = data.map(elem => movieCardTpl(elem)).join('');
      });
  }

  function displayPagination() {
    const paginationEl = document.querySelector('.pagination');
    const ulEl = document.createElement('ul');
    let pagesCount = 10;
    ulEl.classList.add('pagination__list');

    for (let i = 0; i < pagesCount; i++) {
      const liEl = displayPaginationBtn(i + 1);
      ulEl.appendChild(liEl);
    }
    paginationEl.appendChild(ulEl);
    ulEl.appendChild(arrowRightBtn);

    arrowRightBtn.addEventListener('click', () => {
      initialPageNumber += 10;
      pagesCount += 10;
      ulEl.innerHTML = '';
      ulEl.insertAdjacentElement('afterbegin', arrowLeftBtn);

      if (pagesCount < totalPages) {
        for (let i = initialPageNumber; i <= pagesCount; i++) {
          // console.log(i);

          const liEl = displayPaginationBtn(i);
          ulEl.appendChild(liEl);
        }
      }

      if (pagesCount === totalPages) {
        arrowRightBtn.remove();
      }

      ulEl.appendChild(arrowRightBtn);
    });

    arrowLeftBtn.addEventListener('click', () => {
      initialPageNumber -= 10;
      pagesCount -= 10;
      ulEl.innerHTML = '';
      ulEl.insertAdjacentElement('afterbegin', arrowLeftBtn);

      if (pagesCount < totalPages) {
        for (let i = initialPageNumber; i <= pagesCount; i++) {
          // console.log(i);

          const liEl = displayPaginationBtn(i);
          ulEl.appendChild(liEl);
        }
      }

      if (pagesCount === 10) {
        arrowLeftBtn.remove();
      }

      ulEl.appendChild(arrowRightBtn);
    });
  }
  function displayPaginationBtn(page) {
    const liEl = document.createElement('li');
    liEl.classList.add('pagination__item');
    liEl.innerText = page;

    if (currentPageNumber === page) {
      liEl.classList.add('pagination__item--active');
    }
    liEl.addEventListener('click', evt => {
      let clickedPage = Number(evt.target.innerHTML);
      // console.log(clickedPage);
      displayFilmsList(clickedPage);
      page = clickedPage;

      let currentItemLi = document.querySelector('li.pagination__item--active');
      currentItemLi.classList.remove('pagination__item--active');

      liEl.classList.add('pagination__item--active');
    });

    return liEl;
  }

  displayFilmsList(currentPageNumber);
  displayPagination();
}

renderPages();
