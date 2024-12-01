// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendingData } from "../slices/trendingSlice";
import CardComponent from "../components/CardComponent";
import BannerHome from "../components/BannerHome";

const Home = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.trending); // Accessing the state from Redux

  const [timeWindow, setTimeWindow] = useState("day");

  useEffect(() => {
    dispatch(fetchTrendingData(timeWindow)); // Dispatch the action to fetch data
  }, [dispatch, timeWindow]);

  return (
    <>
      <BannerHome />
      <Container maxW={"container.xl"}>
        {/* Display BannerHome component */}

        <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
          <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
            Trending
          </Heading>
          <Flex
            alignItems={"center"}
            gap={"2"}
            border={"1px solid teal"}
            borderRadius={"20px"}
          >
            <Box
              as="button"
              px="3"
              py="1"
              borderRadius={"20px"}
              bg={`${timeWindow === "day" ? "gray.800" : ""}`}
              onClick={() => setTimeWindow("day")}
            >
              Today
            </Box>
            <Box
              as="button"
              px="3"
              py="1"
              borderRadius={"20px"}
              bg={`${timeWindow === "week" ? "gray.800" : ""}`}
              onClick={() => setTimeWindow("week")}
            >
              This Week
            </Box>
          </Flex>
        </Flex>

        {/* Show error message if there's an issue with fetching data */}
        {error && <Text color="red.500">{error}</Text>}

        {/* Grid for displaying trending items */}
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(5, 1fr)",
          }}
          gap={"4"}
        >
          {loading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <Skeleton height={300} key={index} />
            )) // Show skeletons while loading
          ) : data.length === 0 ? (
            <Text>No trending data available.</Text> // Handle empty data
          ) : (
            data.map((item) => (
              <CardComponent
                key={item?.id}
                item={item}
                type={item?.media_type}
              />
            ))
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
