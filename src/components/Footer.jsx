import { Box, Flex, SimpleGrid, Text, Link, Select } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg="blackAlpha.900" color="gray.400" py={10} fontSize="sm">
      <Box maxW="container.xl" mx="auto" px={6}>
        {/* Contact Section */}
        <Text mb={4}>
          Questions? Call{" "}
          <Link
            href="tel:007-803-321-2130"
            color="blue.400"
            _hover={{ textDecoration: "underline" }}
          >
            007-803-321-2130
          </Link>
        </Text>

        {/* Links Grid */}
        <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} spacing={4} mb={6}>
          <Flex direction="column" gap={2}>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              FAQ
            </Link>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              Investor Relations
            </Link>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              Ways to Watch
            </Link>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              Corporate Information
            </Link>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              Only on Netflix
            </Link>
          </Flex>
          <Flex direction="column" gap={2}>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              Help Center
            </Link>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              Jobs
            </Link>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              Terms of Use
            </Link>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              Contact Us
            </Link>
          </Flex>
          <Flex direction="column" gap={2}>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              Account
            </Link>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              Redeem Gift Cards
            </Link>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              Privacy
            </Link>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              Speed Test
            </Link>
          </Flex>
          <Flex direction="column" gap={2}>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              Media Center
            </Link>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              Buy Gift Cards
            </Link>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              Cookie Preferences
            </Link>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              Legal Notices
            </Link>
          </Flex>
        </SimpleGrid>

        {/* Language Selector */}
        <Flex align="center" justify={{ base: "center", md: "start" }} mb={4}>
          <Select
            w="150px"
            bg="gray.800"
            borderColor="gray.700"
            color="gray.400"
            size="sm"
            _hover={{ borderColor: "gray.600" }}
          >
            <option value="en">English</option>
            <option value="id">Bahasa Indonesia</option>
          </Select>
        </Flex>

        {/* Footer Text */}
        <Text textAlign={{ base: "center", md: "start" }}>
          Netflix Indonesia
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
