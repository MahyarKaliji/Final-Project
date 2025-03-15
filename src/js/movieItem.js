import "../style.css";
import { setSelectedId, selectedId, watchedList } from "../main";
import appendElements from "./appendElements";
import movieDetails from "./movieDetails";

const movieItem = (movie) => {
  const { imdbID, Title, Year, Poster } = movie;

  const rowContainer = document.createElement("li");
  rowContainer.className =
    "relative grid grid-cols-[3rem_1fr] grid-rows-[auto_auto] gap-x-7 items-center px-9 py-4 border-b border-background-100 cursor-pointer transition-all duration-500 text-lg hover:bg-background-100";
  rowContainer.onclick = () => handleSelectMovie(imdbID);
  rowContainer.dataset.id = imdbID;

  const img = document.createElement("img");
  img.src = Poster;
  img.alt = Title;
  img.className = "w-full row-span-full";

  const title = document.createElement("h3");
  title.className = "text-xl";
  title.innerHTML = Title;

  const detailContainer = document.createElement("div");
  detailContainer.className = "flex items-center gap-2";

  const detailIcon = document.createElement("span");
  detailIcon.innerHTML = "🗓";

  const detailContext = document.createElement("span");
  detailContext.innerHTML = Year;

  appendElements(detailContainer, [detailIcon, detailContext]);
  appendElements(rowContainer, [img, title, detailContainer]);

  return rowContainer;
};

export default movieItem;

async function handleSelectMovie(id) {
  setSelectedId(id !== selectedId ? id : null);

  if (selectedId) {
    const details = await movieDetails(selectedId);
    appendElements(watchedList, [details]);
  }
}
