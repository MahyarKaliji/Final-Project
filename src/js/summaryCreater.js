import { watched } from "../main";
import appendElements from "./appendElements";
import calcSummary from "./calcSummary";

const summaryCreater = () => {
  const summaryContainer = document.createElement("div");
  summaryContainer.className =
    "bg-background-100 px-9 pt-6 pb-5 rounded-lg shadow-[0_0.852rem_1.7rem_rgba(0,0,0,0.2)]";
  summaryContainer.id = "summary";

  const summaryTitle = document.createElement("h2");
  summaryTitle.className = "uppercase text-lg mb-2";
  summaryTitle.innerHTML = "movies you watched";

  const summaryDetails = document.createElement("div");
  summaryDetails.className = "flex items-center gap-7 text-lg font-semibold";
  summaryDetails.id = "summary-details";

  appendElements(summaryDetails, [...calcSummary(watched)]);

  appendElements(summaryContainer, [summaryTitle, summaryDetails]);

  return summaryContainer;
};

export default summaryCreater;
