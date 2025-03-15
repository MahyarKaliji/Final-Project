import appendElements from "./appendElements";
import { handleUserRating } from "./movieDetails";

const star = ({ size, color, full, onRate, onHoverIn, onHoverOut }) => {
  console.log(onRate, "*", onHoverIn, "*", onHoverOut);

  const starSpan = document.createElement("span");
  starSpan.className = `w-6 h-6 block cursor-pointer`;
  starSpan.onclick = onRate;
  starSpan.onmouseenter = onHoverIn;
  starSpan.onmouseleave = onHoverOut;
  starSpan.innerHTML = full
    ? `<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill=${color}
      stroke=${color}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>`
    : `<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      stroke=${color}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>`;

  console.log(starSpan);

  return starSpan;
};

const starRating = ({
  maxRating = 5,
  color = "#fcc419",
  size = 24,
  className = "",
  message = [],
  defaultRating = 0,
  onSetRating,
}) => {
  let rating = defaultRating > maxRating ? 0 : defaultRating;
  let tempRating = 0;

  function handleRating(rate) {
    rating = rate;
    onSetRating(rate);
  }

  const container = document.createElement("div");
  container.className = "flex items-center";

  for (let i = 0; i < maxRating; i++) {
    const star = document.createElement("span");
    star.className = "cursor-pointer w-6 h-6";
    star.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      width="24"
      height="24"
      fill="none"
      stroke=${color}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>`;
    star.dataset.rating = i + 1;

    star.addEventListener("mouseover", () => {
      container.querySelectorAll("span").forEach((s) => {
        if (s.dataset.rating <= i + 1) {
          s.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
          width="24"
          height="24"
          fill=${color} stroke=${color} >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>`;
        } else {
          s.innerHTML = `<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      width="24"
      height="24"
      fill="none"
      stroke=${color}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>`;
        }
      });
    });

    star.addEventListener("click", () => {
      const rating = parseInt(star.dataset.rating);
      handleUserRating(rating);

      container.querySelectorAll("span").forEach((s) => {
        if (s.dataset.rating <= rating)
          s.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill=${color} stroke=${color} >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      width="24"
      height="24"
    </svg>`;
        else
          s.innerHTML = `<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      width="24"
      height="24"
      fill="none"
      stroke=${color}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>`;
      });
    });

    container.addEventListener("mouseleave", () => {
      const selectedRating =
        container.querySelector("[data-selected]")?.dataset.rating || 0;
      container.querySelectorAll("span").forEach((s) => {
        if (s.dataset.rating <= selectedRating)
          s.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill=${color} stroke=${color} >
          width="24"
      height="24"
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>`;
        else
          s.innerHTML = `<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      width="24"
      height="24"
      fill="none"
      stroke=${color}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>`;
      });
    });

    container.appendChild(star);
  }

  // const starContainer = document.createElement("div");
  // starContainer.className = "flex items-center";
  // appendElements(starContainer, [
  //   ...Array.from({ length: maxRating }, (_, i) =>
  //     star({
  //       key: i,
  //       size: size,
  //       color: color,
  //       full: tempRating ? tempRating >= i + 1 : rating >= i + 1,
  //       onRate: () => handleRating(i + 1),
  //       // onHoverIn: () => console.log("hovered"),
  //       onHoverIn: () => {
  //         tempRating = i + 1;
  //       },
  //       onHoverOut: () => (tempRating = 0),
  //     })
  //   ),
  // ]);

  // console.log(
  //   "Array: ",
  //   Array.from({ length: maxRating }, (_, i) =>
  //     star({
  //       key: i,
  //       size: size,
  //       color: color,
  //       full: tempRating ? tempRating >= i + 1 : rating >= i + 1,
  //       onRate: () => handleRating(i + 1),
  //       onHoverIn: () => (tempRating = i + 1),
  //       onHoverOut: () => (tempRating = 0),
  //     })
  //   )[0]
  // );

  const starText = document.createElement("p");
  starText.className = `m-0 leading-[1] text-[${color}] text-[${size / 1.5}px]`;
  starText.innerHTML =
    message.length === maxRating
      ? message[tempRating ? tempRating - 1 : rating - 1]
      : tempRating || rating || "";

  // appendElements(container, [starText]);
  container.appendChild(starText);

  console.log("star: ", container);

  return container;
};

export default starRating;
