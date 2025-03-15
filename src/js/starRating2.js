import appendElements from "./appendElements";
import { addToListBtn, handleUserRating, rateDiv } from "./movieDetails";

const starRating2 = ({
  maxRating = 10,
  message = [],
  defaultRating = 0,
  onSetRating,
}) => {
  const container = document.createElement("div");
  container.className = "flex items-center justify-between";

  const starsContainer = document.createElement("div");
  starsContainer.className = "flex items-center justify-center";
  const stars = Array.from({ length: maxRating }, (_, i) => "☆");
  const scoreText = document.createElement("p");
  scoreText.className = "text-lg font-normal leading-[0.83] text-star";
  let tempRating = 0;

  for (let i = 0; i < maxRating; i++) {
    const starSpan = document.createElement("span");
    starSpan.className =
      "star text-star text-3xl font-extralight leading-[0.83] cursor-pointer transition-all duration-500";
    starSpan.dataset.index = i;
    starSpan.textContent = "☆";
    starsContainer.appendChild(starSpan);
  }

  appendElements(container, [starsContainer, scoreText]);

  const starElements = starsContainer.querySelectorAll(".star");

  function updateStars(rating) {
    starElements.forEach((star, index) => {
      star.textContent = index < rating ? "★" : "☆";
      star.classList.toggle("filled", index < rating);
    });
  }

  starElements.forEach((star) => {
    star.addEventListener("mouseover", (e) => {
      updateStars(parseInt(e.target.dataset.index) + 1);
      scoreText.textContent = parseInt(e.target.dataset.index) + 1;
    });

    star.addEventListener("mouseout", () => {
      updateStars(tempRating);
      scoreText.textContent = tempRating || "";
    });

    star.addEventListener("click", (e) => {
      tempRating = parseInt(e.target.dataset.index) + 1;
      scoreText.textContent = tempRating;
      handleUserRating(tempRating);
      rateDiv.append(addToListBtn);
    });
  });

  return container;
};

export default starRating2;
