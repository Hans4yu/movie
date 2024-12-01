import { useState, useEffect } from "react";
import {
  Container,
  Flex,
  Grid,
  Heading,
  Select,
  Skeleton,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom"; // New import for URL params
import { fetchGenres, fetchGenreList } from "../../services/api"; // Assuming the same fetch methods
import CardComponent from "../../components/CardComponent";
import PaginationComponent from "../../components/PaginationComponent";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Read URL parameters
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const initialGenre = searchParams.get("genre") || "";
  const initialSortBy = searchParams.get("sortBy") || "";

  useEffect(() => {
    // Set initial state from URL params
    setActivePage(initialPage);
    setSelectedGenre(initialGenre);
    setSortBy(initialSortBy);
  }, [initialPage, initialGenre, initialSortBy]);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genreList = await fetchGenreList(); // Fetch genre list
        setGenres(genreList);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    loadGenres();
  }, []);

  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true);
      try {
        const moviesData = await fetchGenres(activePage, selectedGenre, sortBy); // Fetch movies based on genre and sort
        console.log("Fetched Movies:", moviesData);
        setMovies(moviesData?.results || []);
        setTotalPages(moviesData?.total_pages || 1);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, [activePage, selectedGenre, sortBy]);

  const handleGenreChange = (e) => {
    const newGenre = e.target.value;
    setSelectedGenre(newGenre);
    setActivePage(1);
    setSearchParams({ genre: newGenre, sortBy, page: 1 });
  };

  const handleSortChange = (e) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
    setActivePage(1);
    setSearchParams({ genre: selectedGenre, sortBy: newSortBy, page: 1 });
  };

  const handlePageChange = (page) => {
    setActivePage(page);
    setSearchParams({ genre: selectedGenre, sortBy, page });
  };

  return (
    <Container maxW="container.xl">
      <Flex alignItems="baseline" gap="4" my="10">
        <Heading as="h2" fontSize="md" textTransform="uppercase">
          Discover Movies
        </Heading>

        {/* Genre Dropdown */}
        <Select
          w="130px"
          value={selectedGenre}
          placeholder="All Genres"
          onChange={handleGenreChange}
        >
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </Select>

        {/* Sort Dropdown */}
        <Select
          w="130px"
          value={sortBy}
          placeholder="None"
          onChange={handleSortChange}
        >
          <option value="popularity.desc">Popular</option>
          <option value="vote_average.desc&vote_count.gte=1000">
            Top Rated
          </option>
        </Select>
      </Flex>

      {/* Movies Grid */}
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap="4"
      >
        {isLoading
          ? [...Array(10)].map((_, i) => <Skeleton height={300} key={i} />)
          : movies.map((movie) => (
              <CardComponent key={movie.id} item={movie} type="movie" />
            ))}
      </Grid>

      {/* Pagination Component */}
      <PaginationComponent
        activePage={activePage}
        totalPages={totalPages}
        setActivePage={handlePageChange}
      />
    </Container>
  );
};

export default Movies;
