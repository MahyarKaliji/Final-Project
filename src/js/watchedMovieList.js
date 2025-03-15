import { watchedList } from "../main";
import appendElements from "./appendElements";
import summaryCreater from "./summaryCreater";
import watchedMovieItem from "./watchedMovieItem";

const watchedMovieList = (movies) => {
  watchedList.innerHTML = "";

  const watchedMoviesList = document.createElement("ul");
  watchedMoviesList.className = "py-2";

  movies.map((movie) => watchedMoviesList.appendChild(watchedMovieItem(movie)));

  appendElements(watchedList, [summaryCreater(), watchedMoviesList]);
};

export default watchedMovieList;
