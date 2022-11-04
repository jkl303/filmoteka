import { getCurrentPage } from './getCurrentPage';
import { getGenresForMovies, getGenresForTv } from './fetchGenres';

// Adds a red line (active page) under "Home or My Library links in the header"
getCurrentPage();

// Fetches genres for movies and tv series;

getGenresForMovies();
getGenresForTv();
