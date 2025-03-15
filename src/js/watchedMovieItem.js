import { onDeleteWatched, updateWatchedMovies, watched } from "../main";
import appendElements from "./appendElements";

const watchedMovieItem = (movie) => {
  const { imdbID, Title, Poster, runtime, imdbRating, userRating } = movie;

  const rowContainer = document.createElement("li");
  rowContainer.className =
    "relative grid grid-cols-[3rem_1fr] grid-rows-[auto_auto] gap-x-7 px-9 py-4 text-lg items-center border-b border-background-100";
  rowContainer.dataset.id = imdbID;

  const img = document.createElement("img");
  img.src = Poster;
  img.alt = Title;
  img.className = "w-full row-span-full";

  const title = document.createElement("h3");
  title.className = "text-lg";
  title.innerHTML = Title;

  const detailContainer = document.createElement("div");
  detailContainer.className = "flex items-center gap-7";

  const imdbRateCont = document.createElement("p");
  imdbRateCont.className = "flex items-center gap-2";
  const imdbRateIcon = document.createElement("span");
  imdbRateIcon.innerHTML = "⭐";
  const imdbRateContext = document.createElement("span");
  imdbRateContext.innerHTML = !isNaN(imdbRating) ? imdbRating : 0;
  appendElements(imdbRateCont, [imdbRateIcon, imdbRateContext]);

  const userRateCont = document.createElement("p");
  userRateCont.className = "flex items-center gap-2";
  const userRateIcon = document.createElement("span");
  userRateIcon.innerHTML = "🌟";
  const userRateContext = document.createElement("span");
  userRateContext.innerHTML = userRating;
  appendElements(userRateCont, [userRateIcon, userRateContext]);

  const runtimeCont = document.createElement("p");
  runtimeCont.className = "flex items-center gap-2";
  const runtimeIcon = document.createElement("span");
  runtimeIcon.innerHTML = "⏳";
  const runtimeContext = document.createElement("span");
  runtimeContext.innerHTML = runtime;
  appendElements(runtimeCont, [runtimeIcon, runtimeContext]);

  const btnDelete = document.createElement("button");
  btnDelete.className =
    "absolute h-5 aspect-square bg-red rounded-full right-7 border-none text-background-900 text-xs font-bold cursor-pointer transition-all duration-300 hover:bg-red-dark";
  btnDelete.innerHTML = "X";
  btnDelete.onclick = () => onDeleteWatched(imdbID);

  appendElements(detailContainer, [
    imdbRateCont,
    userRateCont,
    runtimeCont,
    btnDelete,
  ]);

  appendElements(rowContainer, [img, title, detailContainer]);

  return rowContainer;
};

// function handleDeleteMovie(id) {
//   const updatedWatched = watched.filter((movie) => movie.imdbID !== id);
//   localStorage.setItem("watched", JSON.stringify(updatedWatched));
//   updateWatchedMovies(updatedWatched);

//   document.querySelector(`[data-id="${id}"]`).remove();
// }

export default watchedMovieItem;
