import {
  handleAddToWatched,
  handleCloseMovie,
  selectedId,
  setLocalStorage,
  setSelectedId,
  watched,
} from "../main";
import appendElements from "./appendElements";
import fetchSingleMovie from "./fetchSingleMovie";
import starRating2 from "./starRating2";
import loader from "./loader";
import { watchedList } from "../main";
import watchedMovieList from "./watchedMovieList";
import keyEvent from "./keyEvent";

let userRating = 0;

export const handleUserRating = (val) => (userRating = val);

export const rateDiv = document.createElement("div");
export const addToListBtn = document.createElement("button");

// نمایش جزئیات فیلم هنگام انتخاب فیلم
async function movieDetails(id) {
  watchedList.innerHTML = "";
  appendElements(watchedList, [loader()]);

  keyEvent("Escape", handleCloseMovie);

  try {
    const isRated = watched.find((mov) => mov.imdbID === selectedId);

    const movie = await fetchSingleMovie(id);

    watchedList.innerHTML = "";

    const {
      Title,
      Year,
      Poster,
      Runtime,
      imdbRating,
      Plot,
      Released,
      Actors,
      Director,
      Genre,
    } = movie;

    const handleAddToList = () => {
      const addedMovie = {
        imdbID: selectedId,
        Title,
        Year: Number(Year),
        Poster,
        runtime: !isNaN(parseInt(Runtime)) ? parseInt(Runtime) : 0,
        imdbRating: !isNaN(Number(imdbRating)) ? Number(imdbRating) : 0,
        userRating: userRating,
      };

      handleAddToWatched(addedMovie);
      setLocalStorage(watched);
      handleCloseMovie();
      setSelectedId(null);
    };

    const movieContainer = document.createElement("div");
    movieContainer.className = "details leading-[1.4] text-sm";

    const detailHeader = document.createElement("header");
    detailHeader.className = "flex";

    const backButton = document.createElement("button");
    backButton.className =
      "btn-back absolute top-2.5 left-2.5 h-10 aspect-[1] rounded-full border-none bg-white text-background-500 shadow-btn-close font-serif text-3xl font-bold cursor-pointer z-50 flex items-center justify-center";
    backButton.onclick = () => {
      watchedMovieList(watched);
      setSelectedId(null);
      // starRating2();
    };
    backButton.innerHTML = "&larr;";

    const movieImg = document.createElement("img");
    movieImg.className = "w-1/3";
    movieImg.src = Poster;
    movieImg.alt = `Poster of ${Title} movie`;

    const movieDetail = document.createElement("div");
    movieDetail.className =
      "details-overview w-full py-6 px-7 bg-upc-background-100 flex flex-col gap-3.5";

    const movieTitle = document.createElement("h2");
    movieTitle.className = "text-2xl font-bold mb-1.5 leading-[1.1]";
    movieTitle.innerHTML = Title;

    const movieTime = document.createElement("p");
    movieTime.className = "flex items-center gap-2";
    movieTime.innerHTML = `${Released} - ${Runtime}`;

    const movieGenre = document.createElement("p");
    movieGenre.className = "flex items-center gap-2";
    movieGenre.innerHTML = Genre;

    const movieRate = document.createElement("p");
    movieRate.className = "flex items-center gap-2";
    movieRate.innerHTML = `<span>⭐</span> ${imdbRating} IMDB Rating`;

    const movieSection = document.createElement("section");
    movieSection.className = "p-8 flex flex-col gap-6";

    rateDiv.className =
      "rating bg-background-100 rounded-lg py-5 px-10 mb-2 font-semibold flex flex-col gap-6";

    if (isRated) {
      const ratedMessage = document.createElement("p");
      ratedMessage.innerHTML = `You rated with movie ${isRated.userRating} <span>⭐</span>`;

      appendElements(rateDiv, [ratedMessage]);
    } else {
      addToListBtn.className =
        "bg-primary hover:bg-primary-light rounded-full text-text border-none text-sm p-2.5 font-bold cursor-pointer transition-all duration-300";
      addToListBtn.innerHTML = "+ Add to list";
      addToListBtn.onclick = handleAddToList;

      appendElements(rateDiv, [starRating2({ maxRating: 10 })]);
    }

    const moviePlot = document.createElement("p");
    moviePlot.innerHTML = Plot;

    const movieActors = document.createElement("p");
    movieActors.innerHTML = `Starring ${Actors}`;

    const movieDirector = document.createElement("p");
    movieDirector.innerHTML = `Directed by ${Director}`;

    appendElements(movieDetail, [movieTitle, movieTime, movieGenre, movieRate]);
    appendElements(detailHeader, [backButton, movieImg, movieDetail]);
    appendElements(movieSection, [
      rateDiv,
      moviePlot,
      movieActors,
      movieDirector,
    ]);
    appendElements(movieContainer, [detailHeader, movieSection]);

    return movieContainer;
  } catch {}
}

export default movieDetails;
