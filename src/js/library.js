import { getCurrentPage } from './getCurrentPage';
import { render } from './libraryRender';
import { AddListenerToMovieList } from './modal-movie';

function storageLibraryChecker() {
  if (localStorage.getItem('theme') !== null) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}

storageLibraryChecker();
getCurrentPage();

const watchedMovie = JSON.parse(localStorage.getItem('WatchedList'));
const queuedMovie = JSON.parse(localStorage.getItem('QueuedList'));
const title = document.querySelector('.page-heading');
const queuedBtnLibrary = document.getElementById(
  'js-navigationLibraryButtonQueue'
);
const watchedBtnLibrary = document.getElementById(
  'js-navigationLibraryButtonWatched'
);

render(watchedMovie);
AddListenerToMovieList();
queuedBtnLibrary.addEventListener('click', e => {
  e.preventDefault();
  queuedBtnLibrary.disabled = true;
  watchedBtnLibrary.disabled = false;
  title.textContent = 'Queued movie';
  render(queuedMovie);
});

watchedBtnLibrary.addEventListener('click', e => {
  e.preventDefault();
  watchedBtnLibrary.disabled = true;
  queuedBtnLibrary.disabled = false;
  title.textContent = 'Watched movie';
  render(watchedMovie);
});
