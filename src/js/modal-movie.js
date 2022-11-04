// const base_url = 'https://api.themoviedb.org/3/trending/all/day?api_key=288ace10ced3ba69bdb97de2fe588e41';
// const movie_url = 'https://api.themoviedb.org/3/movie/{movie_id}?api_key=288ace10ced3ba69bdb97de2fe588e41'

// getMovies(base_url);

// async function getMovies(url) {
//     const resp = await fetch(url, {
//         headers: {
//             "Content-Type": "application/json",
//         }
//     })
//     const respData = await resp.json();
//     showMovies(respData);
// }

// function showMovies(data) {

//     // console.log(data);
//     const moviesEl = document.querySelector(".movies")

//     data.results.forEach(movie => {
//         const movieEl = document.createElement("div");
//         movieEl.classList.add("movie");
//         movieEl.innerHTML = `<div class="movie">
//             <div class="movie__cover">
//               <img src="http://image.tmdb.org/t/p/w500/${movie.backdrop_path}"
//               alt="http://image.tmdb.org/t/p/w500/${movie.poster_path}" />
//             </div>
//             <div class="movie__info">
//               <div class="movie__title"></div>
//               <div class="movie__category"></div>
//               <div class="movie__average"></div>
//             </div>
//           </div>`;
        
//         movieEl.addEventListener('click', () => openModal(movie.id)) ------> вызвать 
//         moviesEl.appendChild(movieEl);
//         // console.log(movieEl)

//     });
// }

//-----------MODAL-MOVIE---------------//

const modalEl = document.querySelector(".modal");


async function openModal(movie_id) {
    const movie_url_original = `${BASE_URL}/movie/${movie_id}?api_key=${API_KEY}`;
    const imgDb = `http://image.tmdb.org/t/p/w500/`
    // console.log(movie_id)
    // console.log(movie_url_original)
        const resp = await fetch(movie_url_original, {
        headers: {
            "Content-Type": "application/json",
        }
    })
    const respData = await resp.json();
        
    modalEl.classList.add("modal--show");
    document.body.classList.add("stop-scroll");
    modalEl.innerHTML = `<div class="modal__card">
        <img src="${imgDb}${respData.backdrop_path}" alt="${imgDb}${respData.poster_path}" class="modal__movie-backdrop" />
        <h2>
          <span class="modal__movie-title">${respData.original_title}</span>
        </h2>
        <ul class="modal__movie-info">
          <div class="modal__loader"></div>
          <li class="modal__movie-vote"> Vote / Votes ${respData.vote_average}/${respData.vote_count}</li>
          <li class="modal__movie-populerity">Popularity ${respData.popularity}</li>
          <li class="modal__movie-original-title">Original Title ${respData.original_title}</li>
          <li class="modal__movie-genre">Genre <span>${respData.genres.map((elem) => `${elem.name}`).join(', ')}</span></li>
          <li class="modal__movie-overview">ABOUT ${respData.overview}</li>
        </ul>
        <button type="button" class="modal__btn-close">X</button>
      </div>`
    
    const btnClose = document.querySelector(".modal__btn-close");
    btnClose.addEventListener("click", () => closeModal())
}

function closeModal() {
    modalEl.classList.remove("modal--show")
    document.body.classList.remove("stop-scroll");
}

window.addEventListener("click", (evt) => {
    // console.log(evt.target)
    if(evt.target === modalEl) {
        closeModal()
    }
})

window.addEventListener("keydown", (evt) => {
    if (evt.keyCode === 27) {
        closeModal()
    }

})