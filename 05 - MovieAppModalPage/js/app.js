const API_KEY = 'c919bba9-82dd-45e7-8f92-47f9e778ad7a';
const API_URL =
  'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';
const API_URL_SEARCH =
  'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';
const API_URL_MOVIE_DETAILS = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';

getMovies(API_URL);
async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
    },
  });
  const respData = await resp.json();
  showMovies(respData);
}

function getClassByRate(vote) {
  if (vote >= 7) {
    return 'green';
  } else if (vote > 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

function showMovies(data) {
  const moviesEl = document.querySelector('.movies');
  // clear previous movies
  document.querySelector('.movies').innerHTML = '';

  data.films.forEach((movie) => {
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie'); //add class
    movieEl.innerHTML = `
        <div class="movie__cover-inner">
        <img
          src="${movie.posterUrlPreview}"
          alt="${movie.nameRu}"
          class="movie__cover"
        />
        <div class="movie__cover--darkened"></div>
        </div>
        <div class="movie__info">
        <div class="movie__title">${movie.nameRu}</div>
        <div class="movie__category">${movie.genres.map((genre, index) => `${genre.genre}`)}</div>
        <div class="movie__average movie__average--${getClassByRate(movie.rating)}">${
      movie.rating
    }</div>
        </div>`;
    movieEl.addEventListener('click', () => openModal(movie.filmId));
    moviesEl.appendChild(movieEl);
  });
}

const form = document.querySelector('form');
const search = document.querySelector('.header__search');

form.addEventListener('submit', (e) => {
  e.preventDefault(); //reset default behavior
  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
  if (search.value) {
    getMovies(apiSearchUrl);
    search.value = '';
  }
});

//Modal

const modalEl = document.querySelector('.modal');

async function openModal(id) {
  const resp = await fetch(API_URL_MOVIE_DETAILS + id, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
    },
  });
  const respData = await resp.json();

  modalEl.classList.add('modal--show');
  document.body.classList.add('stop-scrolling');
  modalEl.innerHTML = `
  <div class="modal__card">
    <img class="modal__movie-backdrop" src="${respData.posterUrl}" alt="" />
    <h2>
      <span class="modal__movie-title">${respData.nameRu}</span>
      <span class="modal__movie-release-year">${respData.year}</span>
    </h2>
    <ul class="modal__movie-info">
      <div class="loader"></div>
      <li class="modal__movie-genre">Category - ${respData.genres.map(
        (el) => `<span>${el.genre}</span>`,
      )}</li>
      ${
        respData.filmLength
          ? `<li class="modal__movie-rutime">Time - ${respData.filmLength} minutes</li>`
          : ''
      }
      <li>WebSite: <a class="modal__movie-site" href="${respData.webUrl}">${
    respData.webUrl
  }</a></li>
      <li class="modal__movie-overiew">Description - ${respData.description}</li>
    </ul>
    <button type="button" class="modal__button-close">Close</button>
  </div>
  `;

  const btnClose = document.querySelector('.modal__button-close');
  btnClose.addEventListener('click', () => closeModal());
}

function closeModal() {
  modalEl.classList.remove('modal--show');
  document.body.classList.remove('stop-scrolling');
}

window.addEventListener('click', (e) => {
  if (e.target === modalEl) {
    closeModal();
  }
});

window.addEventListener('keydown', (e) => {
  if (e.keyCode === 27) {
    closeModal();
  }
});
