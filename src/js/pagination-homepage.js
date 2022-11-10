import { API_KEY, BASE_URL } from './api-service';
import axios from 'axios';
import { renderUI } from './renderHomePageUI';

async function getAllData(page = 1) {
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

export async function main() {
  const allFilms = await getAllData();
  let currentPaginationPage = allFilms.page;

  function displayPagination() {
    const paginationEl = document.querySelector('.pagination');
    const pagesCount = 10;
    const ulEl = document.createElement('ul');
    ulEl.classList.add('pagination__list');
    ulEl.style.display = 'flex';
    ulEl.style.justifyContent = 'center';

    for (let i = 0; i < pagesCount; i++) {
      const liEl = displayPaginationBtn(i + 1);
      ulEl.appendChild(liEl);
    }
    paginationEl.appendChild(ulEl);
  }

  function displayPaginationBtn(pageNumber) {
    const liEl = document.createElement('li');
    liEl.classList.add('pagination__item');
    liEl.innerText = pageNumber;
    liEl.addEventListener('click', () => {
      currentPaginationPage = pageNumber;
      console.log(currentPaginationPage);
      getAllData(currentPaginationPage).then(renderUI);
    });
    return liEl;
  }
  displayPagination();
}
