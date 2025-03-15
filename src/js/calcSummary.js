import appendElements from "./appendElements";

const average = (numbers) =>
  numbers.length
    ? numbers.reduce((acc, number) => acc + number, 0) / numbers.length
    : 0;

const calcSummary = (watched) => {
  const avrgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avrgUserRating = average(watched.map((movie) => movie.userRating));
  const avrgRuntime = average(watched.map((movie) => movie.runtime));


  const movieCount = document.createElement("p");
  movieCount.className = "flex items-center gap-2";
  const movieCountIcon = document.createElement("span");
  movieCountIcon.innerHTML = "#️⃣";
  const movieCountContext = document.createElement("span");
  movieCountContext.innerHTML = `${watched.length} movies`;
  appendElements(movieCount, [movieCountIcon, movieCountContext]);

  const imdbRating = document.createElement("p");
  imdbRating.className = "flex items-center gap-2";
  const imdbRatingIcon = document.createElement("span");
  imdbRatingIcon.innerHTML = "⭐";
  const imdbRatingContext = document.createElement("span");
  imdbRatingContext.innerHTML = avrgImdbRating.toFixed(1);
  appendElements(imdbRating, [imdbRatingIcon, imdbRatingContext]);

  const userRating = document.createElement("p");
  userRating.className = "flex items-center gap-2";
  const userRatingIcon = document.createElement("span");
  userRatingIcon.innerHTML = "🌟";
  const userRatingContext = document.createElement("span");
  userRatingContext.innerHTML = avrgUserRating.toFixed(1);
  appendElements(userRating, [userRatingIcon, userRatingContext]);

  const runTime = document.createElement("p");
  runTime.className = "flex items-center gap-2";
  const runTimeIcon = document.createElement("span");
  runTimeIcon.innerHTML = "⏳";
  const runTimeContext = document.createElement("span");
  runTimeContext.innerHTML = `${avrgRuntime.toFixed()} min`;
  appendElements(runTime, [runTimeIcon, runTimeContext]);

  return [movieCount, imdbRating, userRating, runTime];
};

export default calcSummary;
