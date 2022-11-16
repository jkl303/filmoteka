import { getCurrentPage } from './getCurrentPage';
import { render } from './libraryRender';
import { AddListenerToMovieList } from './modal-movie';
import { addListenerOnLibraryPage } from './renderModalOnLibrary';

function storageLibraryChecker() {
  if (localStorage.getItem('theme') !== null) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}

storageLibraryChecker();
getCurrentPage();

export let watchedMovie = JSON.parse(localStorage.getItem('WatchedList'));
export let queuedMovie = JSON.parse(localStorage.getItem('QueuedList'));
const title = document.querySelector('.page-heading');
const queuedBtnLibrary = document.getElementById(
  'js-navigationLibraryButtonQueue'
);
const watchedBtnLibrary = document.getElementById(
  'js-navigationLibraryButtonWatched'
);

render(watchedMovie);
addListenerOnLibraryPage();
queuedBtnLibrary.addEventListener('click', e => {
  e.preventDefault();
  queuedBtnLibrary.disabled = true;
  watchedBtnLibrary.disabled = false;
  title.textContent = 'Queued movie';
  queuedMovie = JSON.parse(localStorage.getItem('QueuedList'));
  render(queuedMovie);
});

watchedBtnLibrary.addEventListener('click', e => {
  e.preventDefault();
  watchedBtnLibrary.disabled = true;
  queuedBtnLibrary.disabled = false;
  title.textContent = 'Watched movie';
  watchedMovie = JSON.parse(localStorage.getItem('WatchedList'));
  render(watchedMovie);
});
