import axios from 'axios';
import movieCardTpl from './../templates/movie-card.hbs';
import {
  fetchInitialData,
  convertResponseDataToObject,
} from './renderHomePageUI';

let page = 1;
async function getData(page) {
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/trending/all/day`,
      {
        params: {
          api_key: process.env.API_KEY,
          page: page,
        },
      }
    );
    return response.data;
  } catch (err) {
    return err;
  }
}

export async function renderPages() {
  const filmData = await getData(page);
  const totalPages = filmData.total_pages;

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

    const arrowRightClick = () => {
      initialPageNumber += 1;
      pagesCount += 1;
      ulEl.innerHTML = '';
      ulEl.insertAdjacentElement('afterbegin', arrowLeftBtn);

      if (pagesCount < totalPages) {
        for (let i = initialPageNumber; i <= pagesCount; i++) {
          const liEl = displayPaginationBtn(i);

          ulEl.appendChild(liEl);
        }

        let liArrPlus = document.querySelectorAll('.pagination__item');

        if (liArrPlus[0].classList.contains('pagination__item--active')) {
          liArrPlus[0].classList.remove('pagination__item--active');
          liArrPlus[0].classList.add('pagination__item--active');
        }
      }

      if (pagesCount === totalPages) {
        arrowRightBtn.remove();
      }

      ulEl.appendChild(arrowRightBtn);
    };

    arrowRightBtn.addEventListener('click', arrowRightClick);

    const arrowLeftClick = () => {
      initialPageNumber -= 1;
      pagesCount -= 1;
      ulEl.innerHTML = '';
      ulEl.insertAdjacentElement('afterbegin', arrowLeftBtn);

      if (pagesCount < totalPages) {
        for (let i = initialPageNumber; i <= pagesCount; i++) {
          const liEl = displayPaginationBtn(i);
          ulEl.appendChild(liEl);
        }

        let liArrMinus = document.querySelectorAll('.pagination__item');
        if (liArrMinus[9].classList.contains('pagination__item--active')) {
          liArrMinus[9].classList.remove('pagination__item--active');
          liArrMinus[9].classList.add('pagination__item--active');
        }
      }

      if (pagesCount === 10) {
        arrowLeftBtn.remove();
      }

      ulEl.appendChild(arrowRightBtn);
    };

    arrowLeftBtn.addEventListener('click', arrowLeftClick);
  }
  function displayPaginationBtn(page) {
    const liEl = document.createElement('li');
    liEl.classList.add('pagination__item');
    liEl.innerText = page;

    if (currentPageNumber === page) {
      liEl.classList.add('pagination__item--active');
    }

    const handleCkickPage = evt => {
      currentPageNumber = page;
      displayFilmsList(currentPageNumber);

      let currentItemLi = document.querySelector('li.pagination__item--active');
      if (currentItemLi) {
        currentItemLi.classList.remove('pagination__item--active');
      }

      evt.target.classList.add('pagination__item--active');
    };
    liEl.addEventListener('click', handleCkickPage);

    return liEl;
  }

  displayFilmsList(currentPageNumber);
  displayPagination();
}
