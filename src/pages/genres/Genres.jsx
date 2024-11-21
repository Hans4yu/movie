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

const Genres = () => {
  const [movies, setMovies] = useState([]); // Movie data
  const [genres, setGenres] = useState([]); // Genre list
  const [activePage, setActivePage] = useState(1); // Current page
  const [selectedGenre, setSelectedGenre] = useState(""); // Selected genre filter
  const [isLoading, setIsLoading] = useState(true); // Loading state

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

  // Fetch movies when filters change
  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true);
      try {
        const moviesData = await fetchGenres(activePage, selectedGenre); // Fetch movies based on genre
        console.log("Fetched Movies:", moviesData); // Debug the fetched movies
        setMovies(moviesData?.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, [activePage, selectedGenre]);

  return (
    <Container maxW="container.xl">
      <Flex alignItems="baseline" gap="4" my="10">
        <Heading as="h2" fontSize="md" textTransform="uppercase">
          Discover Movies
        </Heading>

        {/* Genre Dropdown */}
        <Select
  w="130px"
  placeholder="All Genres" // This serves as the "All Genres" option
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
    </Container>
  );
};

export default Genres;
