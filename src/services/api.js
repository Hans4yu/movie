import axios from "axios";

export const imagePath = "https://image.tmdb.org/t/p/w500";
export const imagePathOriginal = "https://image.tmdb.org/t/p/original";

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_API_KEY;

// TRENDING
export const fetchTrending = async (timeWindow = "day") => {
  const { data } = await axios.get(
    `${baseUrl}/trending/all/${timeWindow}?api_key=${apiKey}`
  );

  return data?.results;
};

// MOVIES & SERIES - Details

export const fetchDetails = async (type, id) => {
  const res = await axios.get(`${baseUrl}/${type}/${id}?api_key=${apiKey}`);
  return res?.data;
};

// MOVIES & SERIES - Credits

export const fetchCredits = async (type, id) => {
  if (!type || !id) throw new Error("Type and ID are required");
  
  const url = `${baseUrl}/${type}/${id}/credits?api_key=${apiKey}`;
  const res = await axios.get(url);

  if (res?.data?.cast) {
    // Ensure name and profile_path are included in the cast data
    const cast = res.data.cast.map((actor) => ({
      id: actor.id,
      name: actor.name,
      profile_path: actor.profile_path,
    }));
    return { cast };
  }

  return { cast: [] }; // Return an empty cast array if no data is found
};


// MOVIES & SERIES - Videos

export const fetchVideos = async (type, id) => {
  const res = await axios.get(
    `${baseUrl}/${type}/${id}/videos?api_key=${apiKey}`
  );
  return res?.data;
};

// DISCOVER

export const fetchMovies = async (page, sortBy) => {
  const res = await axios.get(
    `${baseUrl}/discover/movie?api_key=${apiKey}&page=${page}&sort_by=${sortBy}`
  );
  return res?.data;
};

export const fetchTvSeries = async (page, sortBy) => {
  const res = await axios.get(
    `${baseUrl}/discover/tv?api_key=${apiKey}&page=${page}&sort_by=${sortBy}`
  );
  return res?.data;
};

// SEARCH

export const searchData = async (query, page) => {
  const res = await axios.get(
    `${baseUrl}/search/multi?api_key=${apiKey}&query=${query}&page=${page}`
  );
  return res?.data
};

// GENRES
export const fetchGenres = async (page, genreId, sortBy = "") => {
  // Construct dynamic query parameters
  const genreQuery = genreId ? `&with_genres=${genreId}` : "";
  const sortQuery = sortBy ? `&sort_by=${sortBy}` : "";

  // Construct API URL
  const url = `${baseUrl}/discover/movie?api_key=${apiKey}&page=${page}${genreQuery}${sortQuery}`;
  console.log("Fetching movies from URL:", url); // Debugging the API call

  // Perform API call
  const res = await axios.get(url);
  return res?.data; // Returns filtered and sorted movies
};


export const fetchGenreList = async () => {
  const url = `${baseUrl}/genre/movie/list?api_key=${apiKey}&language=en`;
  console.log("Fetching genres from URL:", url); // Debugging the API call
  const res = await axios.get(url);
  return res?.data?.genres || []; // Returns genres
};



