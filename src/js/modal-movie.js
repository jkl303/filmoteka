import { BASE_URL, API_KEY, IMG_URL } from './API';
import {
  LocalStorageWatchedUtil,
  LocalStorageQueuedUtil,
} from './localStorage';
import 'simplelightbox/dist/simple-lightbox.min.css';
import movieModalTpl from './../templates/movie-modal.hbs';

let mediaType;

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

    const addToWatchedBtn = document.querySelector('.modal__btn-watched');
    addToWatchedBtn.addEventListener('click', onClickWatchedBtn);
    function onClickWatchedBtn(e) {
      e.preventDefault();
      let movieObj = respData;
      if (addToWatchedBtn.innerHTML === 'ADD TO WATCHED') {
        addToWatchedBtn.innerHTML = 'REMOVE FROM WATCHED';
      } else {
        localStorage.removeItem('WatchedList', JSON.stringify(movieObj));
        addToWatchedBtn.innerHTML = 'ADD TO WATCHED';
      }
      const storageClick = new LocalStorageWatchedUtil();
      storageClick.addWatched(movieObj);
    }

    const addToQueuedBtn = document.querySelector('.modal__btn-queue');
    addToQueuedBtn.addEventListener('click', onClickQueuedBtn);
    function onClickQueuedBtn(e) {
      e.preventDefault();
      let movieObj = respData;
      if (addToQueuedBtn.innerHTML === 'ADD TO QUEUED') {
        addToQueuedBtn.innerHTML = 'REMOVE FROM QUEUED';
      } else {
        localStorage.removeItem('QueuedList', JSON.stringify(movieObj));
        addToQueuedBtn.innerHTML = 'ADD TO QUEUED';
      }

      const storageClickQ = new LocalStorageQueuedUtil();
      storageClickQ.addQueued(movieObj);
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

function getClassByRate(vote) {
  if (vote >= 7) {
    return 'green';
  } else if (vote > 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

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

export function AddListenerToMovieList() {
  const movieCards = document.querySelector('.movie-list');

  movieCards.addEventListener('click', evt => {
    evt.preventDefault();
    try {
      mediaType = evt.composedPath().find(elem => elem.tagName === 'A').dataset
        .type
        ? evt.composedPath().find(elem => elem.tagName === 'A').dataset.type
        : 'movie';
      let t = evt.target;
      while (t.nodeName !== 'A' && t.parentNode !== null) {
        t = t.parentNode;
      }

      if (t.nodeName === 'A') {
        const movieId = parseInt(t.id);
        const movieSmallPoster = t.getElementsByTagName('img')[0].src;

        openModal(movieId, movieSmallPoster);
      }
    } catch {
      console.log('click empty fild ))');
    }
  });
}
