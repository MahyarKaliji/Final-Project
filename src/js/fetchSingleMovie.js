import { baseURL } from "../../api/base";

export let isLoading = false;
export let error = "";

async function fetchSingleMovie(id) {
  try {
    isLoading = true;
    error = "";
    const response = await fetch(`${baseURL}&i=${id}`);

    if (!response.ok)
      throw new Error("Something went wrong with fetching movies!");

    const data = await response.json();
    error = "";
    return data;
  } catch (err) {
    console.error(err.message);
    error = err.message;
  } finally {
    // isLoading = false;
  }
}

export default fetchSingleMovie;
