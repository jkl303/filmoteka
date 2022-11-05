const KEY = `41cfa08829350aada0652411fc17617c`;
const BASE_URL = `https://api.themoviedb.org/3/`;

export function Fetchmovie() {
  return fetch(
    `${BASE_URL}movie/popular?api_key=${KEY}&page=1&per_page=20`
  ).then(data => {
    if (!data.ok || data.status === 404) {
      throw new Error('Oops');
    }
    return data.json();
  });
}
