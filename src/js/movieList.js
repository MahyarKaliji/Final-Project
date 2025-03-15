import movieItem from "./movieItem";

const movieList = (movies) => {
  const listMovies = document.createElement("ul");
  listMovies.classList = "";
  movies.map((movie) => listMovies.append(movieItem(movie)));
  return listMovies;
};

export default movieList;
