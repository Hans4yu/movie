import { useEffect, useState } from "react";
import {
  Container,
  Flex,
  Grid,
  Heading,
  Input,
  Spinner,
  VStack,
  Text,
  Button,
} from "@chakra-ui/react";
import { searchData } from "../../services/api";
import CardComponent from "../../components/CardComponent";
import PaginationComponent from "../../components/PaginationComponent";
import { useFirestore } from "../../services/firestore";
import { useAuth } from "../../context/useAuth";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [tempSearchValue, setTempSearchValue] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  const { addSearchHistory, getSearchHistory, clearSearchHistory } =
    useFirestore();
  const { user } = useAuth(); // Get the current logged-in user

  // Fetch search results when searchValue or activePage changes
  useEffect(() => {
    if (!searchValue) return;

    setIsLoading(true);
    searchData(searchValue, activePage)
      .then((res) => {
        setData(res?.results);
        setActivePage(res?.page);
        setTotalPages(res?.total_pages);
      })
      .catch((err) => console.log(err, "err"))
      .finally(() => setIsLoading(false));
  }, [searchValue, activePage]);

  // Fetch search history on mount
  useEffect(() => {
    const fetchHistory = async () => {
      if (user) {
        const history = await getSearchHistory(user.uid);
        setSearchHistory(history);
      }
    };
    fetchHistory();
  }, [user, getSearchHistory]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!tempSearchValue.trim()) return;

    // Save to search history if user is logged in
    if (user) {
      await addSearchHistory(user.uid, tempSearchValue);
      const history = await getSearchHistory(user.uid); // Refresh search history
      setSearchHistory(history);
    }

    setSearchValue(tempSearchValue); // Trigger search
    setTempSearchValue(""); // Clear input
  };

  const handleClearHistory = async () => {
    if (user) {
      await clearSearchHistory(user.uid);
      setSearchHistory([]); // Clear local state
    }
  };

  return (
    <Container maxW={"container.xl"}>
      {/* Search Heading */}
      <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          Search
        </Heading>
      </Flex>

      {/* Search Input */}
      <form onSubmit={handleSearch}>
        <Input
          placeholder="Search movies, tv shows..."
          _placeholder={{ color: "gray.100" }}
          value={tempSearchValue}
          onChange={(e) => setTempSearchValue(e.target.value)}
          mb="4"
        />
      </form>

      {/* Search History Below Input */}
      {user && searchHistory.length > 0 && (
        <VStack align="start" spacing="3" mb="6">
          <Heading as="h3" fontSize="sm">
            Recent Searches
          </Heading>
          {searchHistory.map((entry) => (
            <Text
              key={entry.id}
              fontSize="md"
              cursor="pointer"
              onClick={() => setSearchValue(entry.query)} // Allow clicking to re-search
              _hover={{ textDecoration: "underline" }}
            >
              {entry.query}
            </Text>
          ))}
          <Button size="sm" colorScheme="red" onClick={handleClearHistory}>
            Clear History
          </Button>
        </VStack>
      )}

      {/* Search Results */}
      {isLoading && (
        <Flex justifyContent={"center"} mt="10">
          <Spinner size={"xl"} color="red" />
        </Flex>
      )}

      {data?.length === 0 && !isLoading && searchValue && (
        <Heading textAlign={"center"} as="h3" fontSize={"sm"} mt="10">
          No results found for "{searchValue}"
        </Heading>
      )}

      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={"4"}
        mt="6"
      >
        {data?.length > 0 &&
          !isLoading &&
          data.map((item) => (
            <CardComponent key={item?.id} item={item} type={item?.media_type} />
          ))}
      </Grid>

      {/* Pagination */}
      {data?.length > 0 && !isLoading && (
        <PaginationComponent
          activePage={activePage}
          totalPages={totalPages}
          setActivePage={setActivePage}
        />
      )}
    </Container>
  );
};

export default Search;
