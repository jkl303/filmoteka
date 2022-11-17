import movieModalTpl from './../templates/movie-modal.hbs';

import {
    LocalStorageWatchedUtil,
    LocalStorageQueuedUtil,
  } from './localStorage';
import { watchedMovie, queuedMovie} from './library';
import { render } from './libraryRender';

const modalEl = document.querySelector('.modal');
const body = document.querySelector('body');
const movieCards = document.querySelector('.movie-list');
const title = document.querySelector('.page-heading');

export function addListenerOnLibraryPage(){
movieCards.addEventListener('click', onListClick);

}


function onListClick(evt){
evt.preventDefault();

const movieId = evt.path.find(elem => elem.tagName === 'A').getAttribute('id');
let movie = {};



if (title.textContent === 'Watched movie') {
    movie = watchedMovie.find(el => el.id === Number(movieId));
} else {
    movie = queuedMovie.find(el => el.id === Number(movieId));
};



try {
    localStorageRender(movie)
} catch (error) {
    console.log(error);
}


};




export function localStorageRender(movie){
    modalEl.classList.add('modal--show')
    body.classList.add('stop-scroll');

    modalEl.innerHTML = movieModalTpl(movie);


    addModalBtnLogic(movie);

}


function addModalBtnLogic(movie){

    const addToWatchedBtn = document.querySelector('.modal__btn-watched');
    addToWatchedBtn.addEventListener('click', onClickWatchedBtn);

if (title.textContent === 'Watched movie') {
    addToWatchedBtn.textContent = 'REMOVE FROM WATCHED'
}

    function onClickWatchedBtn(e) {
      e.preventDefault();
       
      if (addToWatchedBtn.textContent === 'ADD TO WATCHED') {
        addToWatchedBtn.innerHTML = 'REMOVE FROM WATCHED';
        const storageClick = new LocalStorageWatchedUtil();
        storageClick.addWatched(movie);
      } else {
        watchedMovie.splice(watchedMovie.indexOf(movie), 1);
        render(watchedMovie);
        addToWatchedBtn.innerHTML = 'ADD TO WATCHED';
        localStorage.setItem('WatchedList',JSON.stringify(watchedMovie));
       
      }
      closeModal();
    }

    const addToQueuedBtn = document.querySelector('.modal__btn-queue');
    addToQueuedBtn.addEventListener('click', onClickQueuedBtn);

if(title.textContent === 'Queued movie'){
    addToQueuedBtn.textContent ='REMOVE FROM QUEUED';
}

    function onClickQueuedBtn(e) {
      e.preventDefault();
  
      if (addToQueuedBtn.textContent === 'ADD TO QUEUED') {
        addToQueuedBtn.innerHTML = 'REMOVE FROM QUEUED';
        const storageClickQ = new LocalStorageQueuedUtil();
        storageClickQ.addQueued(movie);
      } else {
      queuedMovie.splice(queuedMovie.indexOf(movie), 1);
      render(queuedMovie);
        addToQueuedBtn.innerHTML = 'ADD TO QUEUED';
        localStorage.setItem('QueuedList', JSON.stringify(queuedMovie));
        
      }
      closeModal();
    }

    const btnClose = document.querySelector('.modal__btn-close');
    btnClose.addEventListener('click', () => closeModal());

    window.addEventListener('click', evt => {
        if (evt.target === modalEl) {
          closeModal();
        }
      });
      
      window.addEventListener('keydown', evt => {
        if (evt.keyCode === 27) {
          closeModal();
        }
      });
}


function closeModal() {
    modalEl.classList.remove('modal--show');
    body.classList.remove('stop-scroll');
  }