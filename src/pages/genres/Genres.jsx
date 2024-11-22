import { useState, useEffect } from "react";
import {
  Container,
  Flex,
  Grid,
  Heading,
  Select,
  Skeleton,
} from "@chakra-ui/react";
import { fetchGenres, fetchGenreList } from "../../services/api";
import CardComponent from "../../components/CardComponent";
import PaginationComponent from "../../components/PaginationComponent";

const Genres = () => {
  const [movies, setMovies] = useState([]); // Movie data
  const [genres, setGenres] = useState([]); // Genre list
  const [activePage, setActivePage] = useState(1); // Current page
  const [selectedGenre, setSelectedGenre] = useState(""); // Selected genre filter
  const [sortBy, setSortBy] = useState(""); // Sort filter: Popular, Top Rated, or None
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [likesCount, setLikesCount] = useState(456); // Mock likes count

  // Fetch genre list on mount
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

  // Fetch movies when filters or page change
  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true);
      try {
        const moviesData = await fetchGenres(activePage, selectedGenre, sortBy); // Fetch movies based on genre and sort
        console.log("Fetched Movies:", moviesData); // Debug the fetched movies
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

  return (
    <Container maxW="container.xl">
      <Flex alignItems="baseline" gap="4" my="10">
        <Heading as="h2" fontSize="md" textTransform="uppercase">
          Discover Movies
        </Heading>

        {/* Genre Dropdown */}
        <Select
          w="130px"
          placeholder="All Genres"
          onChange={(e) => {
            setActivePage(1);
            setSelectedGenre(e.target.value); // Update selected genre
          }}
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
          placeholder="None"
          onChange={(e) => {
            setActivePage(1);
            setSortBy(e.target.value); // Update sort filter
          }}
        >
          <option value="popularity.desc">Popular</option>
          <option value="vote_average.desc&vote_count.gte=1000">Top Rated</option>
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
        setActivePage={setActivePage}
        likesCount={likesCount} // Pass the likes count
      />
    </Container>
  );
};

export default Genres;
