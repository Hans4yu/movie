import {
  Container,
  Flex,
  Grid,
  Heading,
  Select,
  Skeleton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchGenresForTVShows, fetchTvGenreList } from "../../services/api";
import CardComponent from "../../components/CardComponent";
import PaginationComponent from "../../components/PaginationComponent";

const Shows = () => {
  const [shows, setShows] = useState([]); // TV shows data
  const [genres, setGenres] = useState([]); // TV genres list
  const [activePage, setActivePage] = useState(1); // Current page
  const [selectedGenre, setSelectedGenre] = useState(""); // Selected genre filter
  const [sortBy, setSortBy] = useState(""); // Sort filter
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const location = useLocation(); // Access the current URL
  const navigate = useNavigate(); // Navigate to new URL

  // Parse query parameters from the URL
  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return {
      genre: params.get("genre") || "",
      sortBy: params.get("sortBy") || "",
      page: parseInt(params.get("page"), 10) || 1,
    };
  };

  // Update the URL with current filters and page
  const updateURL = (genre, sortBy, page) => {
    const params = new URLSearchParams();
    if (genre) params.set("genre", genre);
    if (sortBy) params.set("sortBy", sortBy);
    if (page) params.set("page", page);
    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
  };

  // Fetch TV genres on mount
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genreList = await fetchTvGenreList(); // Fetch genre list for TV shows
        setGenres(genreList);
      } catch (error) {
        console.error("Error fetching TV genres:", error);
      }
    };

    loadGenres();
  }, []);

  // Fetch TV shows when filters or page change
  useEffect(() => {
    const { genre, sortBy, page } = getQueryParams(); // Get query params from URL
    setSelectedGenre(genre);
    setSortBy(sortBy);
    setActivePage(page);

    const loadShows = async () => {
      setIsLoading(true);
      try {
        const showsData = await fetchGenresForTVShows(page, genre, sortBy); // Fetch TV shows based on filters
        setShows(showsData?.results || []);
        setTotalPages(showsData?.total_pages || 1);
      } catch (error) {
        console.error("Error fetching TV shows:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadShows();
  }, [location.search]); // Rerun the effect when the query parameters change

  // Handle filter change (Genre or Sort)
  const handleFilterChange = (type, value) => {
    setActivePage(1); // Reset to first page when filters change
    if (type === "genre") {
      setSelectedGenre(value);
      updateURL(value, sortBy, 1); // Update URL with new genre
    } else if (type === "sortBy") {
      setSortBy(value);
      updateURL(selectedGenre, value, 1); // Update URL with new sortBy
    }
  };

  return (
    <Container maxW="container.xl">
      <Flex alignItems="baseline" gap="4" my="10">
        <Heading as="h2" fontSize="md" textTransform="uppercase">
          Discover TV Shows
        </Heading>

        {/* Genre Dropdown */}
        <Select
          w="130px"
          placeholder="All Genres"
          value={selectedGenre}
          onChange={(e) => handleFilterChange("genre", e.target.value)}
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
          value={sortBy}
          onChange={(e) => handleFilterChange("sortBy", e.target.value)}
        >
          <option value="popularity.desc">Popular</option>
          <option value="vote_average.desc&vote_count.gte=1000">
            Top Rated
          </option>
        </Select>
      </Flex>

      {/* TV Shows Grid */}
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
          : shows.map((show) => (
              <CardComponent key={show.id} item={show} type="tv" />
            ))}
      </Grid>

      {/* Pagination Component */}
      <PaginationComponent
        activePage={activePage}
        totalPages={totalPages}
        setActivePage={(page) => {
          setActivePage(page);
          updateURL(selectedGenre, sortBy, page); // Update URL when page changes
        }}
      />
    </Container>
  );
};

export default Shows;
