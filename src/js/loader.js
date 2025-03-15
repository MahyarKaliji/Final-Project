import appendElements from "./appendElements";

function loader() {
  const spinnerContainer = document.createElement("div");
  spinnerContainer.className =
    "flex flex-col items-center justify-center gap-2.5 min-h-96";

  const spinner = document.createElement("div");
  spinner.className = "spinner";

  const loading = document.createElement("p");
  loading.className = "text-xl uppercase";
  loading.innerHTML = "Loading ...";
  appendElements(spinnerContainer, [spinner, loading]);

  return spinnerContainer;
}

export default loader;
