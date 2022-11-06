// import { API_KEY, BASE_URL, IMG_URL } from './api-service';

// //-----------MODAL-MOVIE---------------//

// export async function openModal(movie_id) {
//     const movie_url_original = `${BASE_URL}/movie/${movie_id}?api_key=${API_KEY}`;
//     const modalEl = document.querySelector('.modal');
  
//     // console.log(movie_url_original)
//     const resp = await fetch(movie_url_original, {
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });
//     const respData = await resp.json();

//     modalEl.classList.add('modal--show');
//     document.body.classList.add('stop-scroll');
//     modalEl.innerHTML = `<div class="modal__card">
//         <img src="${IMG_URL}${respData.poster_path}" alt="${IMG_URL}${respData.backdrop_path
//         }" class="modal__movie-backdrop" />
//         <h2>
//           <span class="modal__movie-title">${respData.original_title}</span>
//         </h2>
//         <ul class="modal__movie-info">
//           <div class="modal__loader"></div>
//           <li class="modal__movie-vote"> Vote / Votes ${respData.vote_average
//         }/${respData.vote_count}</li>
//           <li class="modal__movie-populerity">Popularity ${respData.popularity
//         }</li>
//           <li class="modal__movie-original-title">Original Title ${respData.original_title
//         }</li>
//           <li class="modal__movie-genre">Genre <span>${respData.genres
//             .map(elem => `${elem.name}`)
//             .join(', ')}</span></li>
//           <li class="modal__movie-overview">ABOUT ${respData.overview}</li>
//         </ul>
//         <button type="button" class="modal__btn-close">X</button>
//         <button type="button" class="modal__btn-wotched">ADD TO WOTCHED</button>
//         <button type="button" class="modal__btn-close">ADD TO QUEUE</button>
//       </div>`;
//     // console.log("это модалка", movie_id);

//     const btnClose = document.querySelector('.modal__btn-close');
//     btnClose.addEventListener('click', () => closeModal());
// }

// function closeModal() {
//     const modalEl = document.querySelector('.modal');
//     modalEl.classList.remove('modal--show');
//     document.body.classList.remove('stop-scroll');
// }

// window.addEventListener('click', evt => {
//   // console.log(evt.target)
//   const modalEl = document.querySelector('.modal');
//   if (evt.target === modalEl) {
//     closeModal();
//   }
// });

// window.addEventListener('keydown', evt => {
//   if (evt.keyCode === 27) {
//     closeModal();
//   }
// });
