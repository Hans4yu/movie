import axios from "axios";

// Fungsi untuk mendapatkan data dari cache (localStorage)
const getCache = (key) => {
  const cachedData = localStorage.getItem(key);
  if (!cachedData) return null;

  const parsedData = JSON.parse(cachedData);
  const currentTime = new Date().getTime();

  // Tentukan waktu kedaluwarsa cache (misal 1 jam = 3600000 ms)
  const expirationTime = 3600000; // 1 jam
  if (currentTime - parsedData.timestamp > expirationTime) {
    localStorage.removeItem(key); // Hapus cache jika sudah kedaluwarsa
    return null;
  }

  return parsedData.data; // Jika data masih valid, kembalikan data
};

const setCache = (key, data) => {
  const cacheData = {
    timestamp: new Date().getTime(), // Simpan timestamp
    data: data,
  };
  localStorage.setItem(key, JSON.stringify(cacheData));
};

export const imagePath = "https://image.tmdb.org/t/p/w500";
export const imagePathOriginal = "https://image.tmdb.org/t/p/original";

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_API_KEY;

// TRENDING
export const fetchTrending = async (timeWindow = "day") => {
  const cacheKey = `trending-${timeWindow}`; // Cache key untuk trending
  const cachedData = getCache(cacheKey); // Cek cache

  if (cachedData) {
    console.log(`Using cached trending data for ${timeWindow}`);
    return cachedData; // Jika ada, kembalikan data dari cache
  }

  try {
    const { data } = await axios.get(
      `${baseUrl}/trending/all/${timeWindow}?api_key=${apiKey}`
    );
    setCache(cacheKey, data?.results); // Simpan data ke cache
    return data?.results; // Kembalikan hasil dari API
  } catch (error) {
    console.error("Error fetching trending data:", error);
    return []; // Kembalikan data kosong jika terjadi error
  }
};

// MOVIES & SERIES - Details
export const fetchDetails = async (type, id) => {
  const cacheKey = `${type}-${id}-details`; // Cache key berdasarkan jenis dan ID
  const cachedData = getCache(cacheKey); // Cek apakah data ada di cache

  if (cachedData) {
    console.log(`Using cached data for ${type} details`);
    return cachedData;
  }

  try {
    const res = await axios.get(`${baseUrl}/${type}/${id}?api_key=${apiKey}`);
    const data = res?.data;
    setCache(cacheKey, data); // Simpan data ke cache untuk penggunaan berikutnya
    return data; // Kembalikan data dari API
  } catch (error) {
    console.error(`Error fetching details for ${type} with ID ${id}:`, error);
    return null; // Kembalikan null jika terjadi error
  }
};

// MOVIES & SERIES - Credits

export const fetchCredits = async (type, id) => {
  const cacheKey = `${type}-${id}-credits`; // Cache key untuk credits
  const cachedData = getCache(cacheKey);

  if (cachedData) {
    console.log(`Using cached credits for ${type} ${id}`);
    return cachedData;
  }

  try {
    const url = `${baseUrl}/${type}/${id}/credits?api_key=${apiKey}`;
    const res = await axios.get(url);
    const cast = res?.data?.cast
      ? res.data.cast.map((actor) => ({
          id: actor.id,
          name: actor.name,
          profile_path: actor.profile_path,
        }))
      : [];

    setCache(cacheKey, { cast }); // Simpan data ke cache
    return { cast }; // Kembalikan data cast
  } catch (error) {
    console.error(`Error fetching credits for ${type} ${id}:`, error);
    return { cast: [] }; // Kembalikan data kosong jika terjadi error
  }
};

// MOVIES & SERIES - Videos

export const fetchVideos = async (type, id) => {
  const cacheKey = `${type}-${id}-videos`; // Cache key untuk videos
  const cachedData = getCache(cacheKey);

  if (cachedData) {
    console.log(`Using cached videos for ${type} ${id}`);
    return cachedData;
  }

  try {
    const res = await axios.get(
      `${baseUrl}/${type}/${id}/videos?api_key=${apiKey}`
    );
    const data = res?.data?.results || [];
    setCache(cacheKey, data); // Simpan data ke cache
    return data; // Kembalikan data video
  } catch (error) {
    console.error(`Error fetching videos for ${type} ${id}:`, error);
    return []; // Kembalikan data kosong jika terjadi error
  }
};

// DISCOVER

export const fetchMovies = async (page, sortBy) => {
  const cacheKey = `movies-page-${page}-sort-${sortBy}`; // Cache key untuk movies
  const cachedData = getCache(cacheKey);

  if (cachedData) {
    console.log(`Using cached movie data for page ${page}, sort by ${sortBy}`);
    return cachedData;
  }

  try {
    const res = await axios.get(
      `${baseUrl}/discover/movie?api_key=${apiKey}&page=${page}&sort_by=${sortBy}`
    );
    const data = res?.data;
    setCache(cacheKey, data); // Simpan data ke cache
    return data; // Kembalikan hasil dari API
  } catch (error) {
    console.error(
      `Error fetching movie data for page ${page}, sort by ${sortBy}:`,
      error
    );
    return { results: [], total_pages: 0 }; // Kembalikan data kosong jika terjadi error
  }
};

export const fetchTvSeries = async (page, sortBy) => {
  const cacheKey = `tvseries-page-${page}-sort-${sortBy}`; // Cache key untuk tv series
  const cachedData = getCache(cacheKey);

  if (cachedData) {
    console.log(
      `Using cached TV series data for page ${page}, sort by ${sortBy}`
    );
    return cachedData;
  }

  try {
    const res = await axios.get(
      `${baseUrl}/discover/tv?api_key=${apiKey}&page=${page}&sort_by=${sortBy}`
    );
    const data = res?.data;
    setCache(cacheKey, data); // Simpan data ke cache
    return data; // Kembalikan hasil dari API
  } catch (error) {
    console.error(
      `Error fetching TV series data for page ${page}, sort by ${sortBy}:`,
      error
    );
    return { results: [], total_pages: 0 }; // Kembalikan data kosong jika terjadi error
  }
};

// SEARCH

export const searchData = async (query, page) => {
  const cacheKey = `search-${query}-page-${page}`; // Cache key untuk search
  const cachedData = getCache(cacheKey);

  if (cachedData) {
    console.log(`Using cached search data for ${query} page ${page}`);
    return cachedData;
  }

  try {
    const res = await axios.get(
      `${baseUrl}/search/multi?api_key=${apiKey}&query=${query}&page=${page}`
    );
    const data = res?.data;
    setCache(cacheKey, data); // Simpan data ke cache
    return data; // Kembalikan hasil dari API
  } catch (error) {
    console.error(
      `Error searching data for query ${query}, page ${page}:`,
      error
    );
    return { results: [], total_pages: 0 }; // Kembalikan data kosong jika terjadi error
  }
};

// GENRES
export const fetchGenres = async (page, genreId, sortBy = "") => {
  const cacheKey = `genres-${genreId}-page-${page}-sort-${sortBy}`; // Cache key untuk genres
  const cachedData = getCache(cacheKey);

  if (cachedData) {
    console.log(`Using cached genre data for genre ${genreId}`);
    return cachedData;
  }

  try {
    const genreQuery = genreId ? `&with_genres=${genreId}` : "";
    const sortQuery = sortBy ? `&sort_by=${sortBy}` : "";
    const url = `${baseUrl}/discover/movie?api_key=${apiKey}&page=${page}${genreQuery}${sortQuery}`;
    const res = await axios.get(url);
    const data = res?.data;
    setCache(cacheKey, data); // Simpan data ke cache
    return data; // Kembalikan hasil dari API
  } catch (error) {
    console.error(`Error fetching genre data for genre ${genreId}:`, error);
    return { results: [], total_pages: 0 }; // Kembalikan data kosong jika terjadi error
  }
};

export const fetchGenreList = async () => {
  const cacheKey = `genre-list`; // Cache key untuk genre list
  const cachedData = getCache(cacheKey);

  if (cachedData) {
    console.log(`Using cached genre list`);
    return cachedData;
  }

  try {
    const url = `${baseUrl}/genre/movie/list?api_key=${apiKey}&language=en`;
    const res = await axios.get(url);
    const data = res?.data?.genres || [];
    setCache(cacheKey, data); // Simpan data ke cache
    return data; // Kembalikan hasil dari API
  } catch (error) {
    console.error("Error fetching genre list:", error);
    return []; // Kembalikan data kosong jika terjadi error
  }
};
