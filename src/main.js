import "./style.css";
import { btnsOpenClose } from "./js/openClose";
import movieList from "./js/movieList";
import watchedMovieList from "./js/watchedMovieList";
import fetchMultipleMovies, { error, isLoading } from "./js/fetchMultipleMovies";
import appendElements from "./js/appendElements";
import loader from "./js/loader";

export const moviesList = document.getElementById("movies-box");
export const watchedList = document.getElementById("watched-box");
const inputSearch = document.getElementById("search-movie");
const result = document.getElementById("result");

export let movies = [];
export let selectedId = null;
export let watched = getLocalStorage() ?? [];

////////////////////////////////////////////////////////////

export function setSelectedId(value) {
  selectedId = value;
}

////////////////////////////////////////////////////////////

export function onDeleteWatched(id) {
  watched = watched.filter((movie) => movie.imdbID !== id);
  setLocalStorage(watched);
  watchedMovieList(watched);
}

export function handleAddToWatched(movie) {
  watched = [...watched, movie];
}

export function handleSelectMovie(id) {
  selectedId = id === selectedId ? null : id;
}

export function handleCloseMovie() {
  selectedId = null;
  watchedMovieList(watched);
}

////////////////////////////////////////////////////////////

export function setLocalStorage(items) {
  localStorage.setItem("watched", JSON.stringify(items));
}

export function getLocalStorage() {
  return JSON.parse(localStorage.getItem("watched"));
}

export function updateWatchedMovies(newWatchedMovies) {
  watched = newWatchedMovies;
}

inputSearch.addEventListener("keyup", async function (e) {
  if (e.target.value.length >= 3) {
    moviesList.innerHTML = "";
    appendElements(moviesList, [loader()]);

    try {
      const query = e.target.value;
      movies = await fetchMultipleMovies(query);

      moviesList.innerHTML = "";
      if (isLoading) moviesList.append(loader());

      if (error) {
        moviesList.innerHTML = `<p class="text-center text-red p-4">${error}</p>`;
        result.innerHTML = 0;
        return;
      }

      appendElements(moviesList, [movieList(movies)]);
      result.innerHTML = movies.length;
    } catch {}
  } else {
    moviesList.innerHTML = "";
    result.innerHTML = 0;
  }
});

btnsOpenClose.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    e.target.innerText = e.target.innerText === "-" ? "+" : "-";
    e.target.dataset.box === "movies"
      ? moviesList.classList.toggle("hidden")
      : watchedList.classList.toggle("hidden");
  })
);

document.addEventListener("DOMContentLoaded", function () {
  watchedMovieList(watched);
  appendElements(moviesList, [movieList(movies)]);
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") handleCloseMovie();
  if (e.key === "Enter") {
    if (document.activeElement === inputSearch) return;

    inputSearch.focus();
    inputSearch.value = "";
    handleCloseMovie();
  }
});
