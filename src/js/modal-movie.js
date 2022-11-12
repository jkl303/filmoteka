import { API_KEY, BASE_URL, IMG_URL } from './api-service';

import {
  LocalStorageWatchedUtil,
  LocalStorageQueuedUtil,
} from './localStorage';

let addToQueuedBtn;
let addToWatchedBtn;
let mediaType;

// import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';
import movieModalTpl from './../templates/movie-modal.hbs';

//-----------MODAL-MOVIE---------------//

export async function openModal(movie_id, movieSmallPoster) {
  const movie_url_original = `${BASE_URL}/${mediaType}/${movie_id}?api_key=${API_KEY}`;
  const modalEl = document.querySelector('.modal');

  const resp = await fetch(movie_url_original, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (resp.status === 200) {
    const respData = await resp.json();
    respData.imgPath = getImgPath(
      respData.poster_path,
      respData.backdrop_path,
      IMG_URL,
      movieSmallPoster
    );
    respData.byRate = getClassByRate(respData.vote_average.toFixed(1));
    respData.rate = respData.vote_average.toFixed(1);
    respData.byPopularity = respData.popularity.toFixed(1);
    respData.byGenres = respData.genres.map(elem => `${elem.name}`).join(', ');

    modalEl.classList.add('modal--show');
    document.body.classList.add('stop-scroll');

    modalEl.innerHTML = movieModalTpl(respData);

    const modalCard = document.querySelector('.modal__card');
    modalCard.dataset.id = movie_id;

    const addToWatchedBtn = document.querySelector('.modal__btn-watched');
    addToWatchedBtn.addEventListener('click', onClickWatchedBtn);
    function onClickWatchedBtn(e) {
      e.preventDefault();
      console.dir(addToWatchedBtn);
      if (addToWatchedBtn.innerHTML === 'ADD TO WATCHED') {
        addToWatchedBtn.innerHTML = 'REMOVE FROM WATCHED';
      } else {
        addToWatchedBtn.innerHTML = 'ADD TO WATCHED';
      }
      let myId = modalCard.dataset.id;
      const storageClick = new LocalStorageWatchedUtil();
      storageClick.addWatched(myId);
    }

    const addToQueuedBtn = document.querySelector('.modal__btn-queue');
    addToQueuedBtn.addEventListener('click', onClickQueuedBtn);
    function onClickQueuedBtn(e) {
      e.preventDefault();
      if (addToQueuedBtn.innerHTML === 'ADD TO QUEUED') {
        addToQueuedBtn.innerHTML = 'REMOVE FROM QUEUED';
      } else {
        addToQueuedBtn.innerHTML = 'ADD TO QUEUED';
      }
      let myId = modalCard.dataset.id;
      const storageClickQ = new LocalStorageQueuedUtil();
      storageClickQ.addQueued(myId);
    }
  } else {
    modalEl.classList.add('modal--show');
    document.body.classList.add('stop-scroll');
    modalEl.innerHTML = `<div class="modal__card">
     <div class="modal-plug""></div>
    <button type="button" class="modal__btn-close"></button></div>`;
  }

  const btnClose = document.querySelector('.modal__btn-close');
  btnClose.addEventListener('click', () => closeModal());
}

function closeModal() {
  const modalEl = document.querySelector('.modal');
  modalEl.classList.remove('modal--show');
  document.body.classList.remove('stop-scroll');
}

window.addEventListener('click', evt => {
  const modalEl = document.querySelector('.modal');
  if (evt.target === modalEl) {
    closeModal();
  }
});

window.addEventListener('keydown', evt => {
  if (evt.keyCode === 27) {
    closeModal();
  }
});

// цветовое решение для рейтинга

function getClassByRate(vote) {
  if (vote >= 7) {
    return 'green';
  } else if (vote > 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

//проверка img

function getImgPath(poster, backdrop, url, backupPoster) {
  if (poster === null) {
    if (backdrop === null) {
      return backupPoster;
    }
    return url + backdrop;
  } else {
    return url + poster;
  }
}

// Adds event listeners to the movies list DOM element

export function AddListenerToMovieList() {
  const movieCards = document.querySelector('.movie-list');
  //   console.log('before add listener:');
  //   console.log(movieCards);
  movieCards.addEventListener('click', evt => {
    evt.preventDefault();
    mediaType = evt.composedPath().find(elem => elem.tagName === 'A')
      .dataset.type;
    let t = evt.target;
    while (t.nodeName !== 'A' && t.parentNode !== null) {
      t = t.parentNode;
    }

    if (t.nodeName === 'A') {
      const movieId = parseInt(t.id);
      const movieSmallPoster = t.getElementsByTagName('img')[0].src;
      //   console.log(t);
      //   console.log('Рендер:', movieId, ', ', movieSmallPoster);

      openModal(movieId, movieSmallPoster);
    }
  });
  //   console.log('after add listener:');
  //   console.log(movieCards);
}
