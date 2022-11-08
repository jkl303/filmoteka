import { API_KEY, BASE_URL, IMG_URL } from './api-service';

//-----------MODAL-MOVIE---------------//

export async function openModal(movie_id) {
  const movie_url_original = `${BASE_URL}/movie/${movie_id}?api_key=${API_KEY}`;
  const modalEl = document.querySelector('.modal');

  //   console.log(movie_url_original);
  const resp = await fetch(movie_url_original, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const respData = await resp.json();

  modalEl.classList.add('modal--show');
  document.body.classList.add('stop-scroll');
  modalEl.innerHTML = `<div class="modal__card">
        <img src="${IMG_URL}${
    respData.poster_path
  }" alt="" class="modal__movie-backdrop"/>
    
        <div class="modal__wrap">
        <h2>
            <span class="modal__movie-title">${respData.title}</span>
        </h2>
        <ul class="modal__movie-info">
          <li>
            <div class="modal__movie-vote-cont">          
                <p class="modal__movie-vote">Vote / Votes </p>
                    <div class="movie-vote-upper">${
                      respData.vote_average.toFixed(1) &&
                      `<div class="movie-vote-upper movie__average--${getClassByRate(
                        respData.vote_average.toFixed(1)
                      )}">
                      ${respData.vote_average.toFixed(1)}
                        </div>`
                    } / ${respData.vote_count}
                    </div>
                
            </div>
          </li>
          <li>
          <div class="modal__movie-popularity-cont">
          <p class="modal__movie-popularity">Popularity
          <span class="movie-popularity-upper">${respData.popularity.toFixed(
            1
          )}</span>
          </p>
          </div>

         </li>
          <li> 
          <p class="modal__movie-original-title">Original Title <span class="movie-title-upper">${
            respData.original_title
          }</span></p>  
          </li>
          <li>
          <p class="modal__movie-genre">Genre <span class="movie-genre-upper">${respData.genres
            .map(elem => `${elem.name}`)
            .join(', ')}</span></p>
         
            </li>
          <li>
          <p class="modal__movie-overview">ABOUT</p>
          <span class="movie-overview-upper">${respData.overview}</span>
          </li>
        </ul>
        
        <button type="button" class="modal__btn-close"></button>
        <div class="modal__btn-list">
        <button type="button" class="modal__btn-watched">ADD TO WATCHED</button>
        <button type="button" class="modal__btn-queue">ADD TO QUEUE</button>
        </div>
        </div>
      </div>`;
  // console.log("это модалка", movie_id);

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
