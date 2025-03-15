import { baseURL } from "../../api/base";

export let isLoading = false;
export let error = "";

async function fetchMultipleMovies(query) {
  try {
    isLoading = true;
    error = "";
    const response = await fetch(`${baseURL}&s=${query}`);

    if (!response.ok)
      throw new Error("Something went wrong with fetching movies!");

    const data = await response.json();

    if (data.Response === "False") {
      return [];
    }
    error = "";
    return data.Search || [];
  } catch (err) {
    console.error(err.message);
    error = err.message;
    return [];
  } finally {
    isLoading = false;
  }
}

export default fetchMultipleMovies;
