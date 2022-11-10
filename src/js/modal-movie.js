import { API_KEY, BASE_URL, IMG_URL } from './api-service';

import {
  LocalStorageWatchedUtil,
  LocalStorageQueuedUtil,
} from './localStorage';

let addToQueuedBtn;
let addToWatchedBtn;

// import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';
import movieModalTpl from './../templates/movie-modal.hbs';

//-----------MODAL-MOVIE---------------//

export async function openModal(movie_id, movieSmallPoster) {
  const movie_url_original = `${BASE_URL}/movie/${movie_id}?api_key=${API_KEY}`;
  const modalEl = document.querySelector('.modal');
  console.log(modalEl);
  //   console.log(movieSmallPoster);
  //   console.log(movie_url_original);

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

    // console.log('response data:');
    // console.log(resp);
    // console.log(respData);
    modalEl.classList.add('modal--show');
    document.body.classList.add('stop-scroll');

    modalEl.innerHTML = movieModalTpl(respData);
    // `<div class="modal__card">
    //     <img src="${getImgPath(
    //       respData.poster_path,
    //       respData.backdrop_path,
    //       IMG_URL,
    //       movieSmallPoster
    //     )}"
    //       alt="" class="modal__movie-backdrop"/>

    //     <div class="modal__wrap">
    //     <h2>
    //         <span class="modal__movie-title">${respData.title}</span>
    //     </h2>
    //     <ul class="modal__movie-info">
    //       <li>
    //         <div class="modal__movie-vote-cont">
    //             <p class="modal__movie-vote">Vote / Votes: </p>
    //                 <div class="movie-vote-upper">${`<div class="movie-vote-upper movie__average--${getClassByRate(
    //                   respData.vote_average.toFixed(1)
    //                 )}">
    //                   ${respData.vote_average.toFixed(1)}
    //                     </div>`} / ${respData.vote_count}
    //                 </div>

    //         </div>
    //       </li>
    //       <li>
    //       <div class="modal__movie-popularity-cont">
    //       <p class="modal__movie-popularity">Popularity:
    //       <span class="movie-popularity-upper">${respData.popularity.toFixed(
    //         1
    //       )}</span>
    //       </p>
    //       </div>

    //      </li>
    //       <li>
    //       <p class="modal__movie-original-title">Original Title: <span class="movie-title-upper">${
    //         respData.original_title
    //       }</span></p>
    //       </li>
    //       <li>
    //       <p class="modal__movie-genre">Genre: <span class="movie-genre-upper">${respData.genres
    //         .map(elem => `${elem.name}`)
    //         .join(', ')}</span></p>

    //         </li>
    //       <li>
    //       <p class="modal__movie-overview">ABOUT</p>
    //       <span class="movie-overview-upper">${respData.overview}</span>
    //       </li>
    //     </ul>

    //     <button type="button" class="modal__btn-close"></button>
    //     <div class="modal__btn-list">
    //     <button type="button" class="modal__btn-watched">ADD TO WATCHED</button>
    //     <button type="button" class="modal__btn-queue">ADD TO QUEUE</button>
    //     </div>
    //     </div>
    //   </div>`;

    //   console.log('это модалка', movie_id);
    // console.log(resp);
  } else {
    modalEl.classList.add('modal--show');
    document.body.classList.add('stop-scroll');
    modalEl.innerHTML = `<div class="modal__card">
     <div class="modal-plug""></div>
    <button type="button" class="modal__btn-close"></button></div>`;
  }
  //   let modal = new SimpleLightbox('.modal a', {
  // captionsData: 'h2',
  // captionDelay: '250',
  //   });
  //   console.log(modal);
  const modalCard = document.querySelector('.modal__card');
  modalCard.dataset.id = movie_id;

  const addToWatchedBtn = document.querySelector('.modal__btn-watched');

  addToWatchedBtn.addEventListener('click', onClickWatchedBtn);
  function onClickWatchedBtn(e) {
    e.preventDefault();
    let myId = modalCard.dataset.id;
    const storageClick = new LocalStorageWatchedUtil();
    storageClick.addWatched(myId);
  }

  const addToQueuedBtn = document.querySelector('.modal__btn-queue');

  addToQueuedBtn.addEventListener('click', onClickQueuedBtn);
  function onClickQueuedBtn(e) {
    e.preventDefault();
    let myId = modalCard.dataset.id;
    const storageClickQ = new LocalStorageQueuedUtil();
    storageClickQ.addQueued(myId);
  }

  // const newCont = new LocalStorageQueuedUtil();
  // newCont.addQueued(myId);

  const btnClose = document.querySelector('.modal__btn-close');
  btnClose.addEventListener('click', () => closeModal());
}

function closeModal() {
  const modalEl = document.querySelector('.modal');
  modalEl.classList.remove('modal--show');
  document.body.classList.remove('stop-scroll');
}

window.addEventListener('click', evt => {
  // console.log(evt.target)
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
