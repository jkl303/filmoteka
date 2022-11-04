import { getCurrentPage } from './getCurrentPage';
import { getGenresForMovies, getGenresForTv } from './fetchGenres';
import { modalMovie } from './modal-movie'


// Adds a red line (active page) under "Home or My Library links in the header"
getCurrentPage();

// Fetches genres for movies and tv series;

getGenresForMovies();
getGenresForTv();

// Add modal-movie 

modalMovie();
