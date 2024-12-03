import { Box, Flex, SimpleGrid, Text, Link, Select } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n"; // Ensure this points to the correct path

const Footer = () => {
  const { t, i18n } = useTranslation(); // Use i18next translation hook

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    i18n.changeLanguage(selectedLanguage); // Change language dynamically
    localStorage.setItem("language", selectedLanguage); // Save language to localStorage
  };

  return (
    <Box bg="blackAlpha.900" color="gray.400" py={10} fontSize="sm">
      <Box maxW="container.xl" mx="auto" px={6}>
        {/* Contact Section */}
        <Text mb={4}>
          {t("footer.questions")}:{" "}
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
              {t("footer.faq")}
            </Link>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              {t("footer.investorRelations")}
            </Link>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              {t("footer.waysToWatch")}
            </Link>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              {t("footer.corporateInfo")}
            </Link>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              {t("footer.onlyOnNetflix")}
            </Link>
          </Flex>
          <Flex direction="column" gap={2}>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              {t("footer.helpCenter")}
            </Link>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              {t("footer.jobs")}
            </Link>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              {t("footer.termsOfUse")}
            </Link>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              {t("footer.contactUs")}
            </Link>
          </Flex>
          <Flex direction="column" gap={2}>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              {t("footer.account")}
            </Link>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              {t("footer.redeemGiftCards")}
            </Link>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              {t("footer.privacy")}
            </Link>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              {t("footer.speedTest")}
            </Link>
          </Flex>
          <Flex direction="column" gap={2}>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              {t("footer.mediaCenter")}
            </Link>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              {t("footer.buyGiftCards")}
            </Link>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              {t("footer.cookiePreferences")}
            </Link>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              {t("footer.legalNotices")}
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
            onChange={handleLanguageChange} // Handle language change
          >
            <option value="en">{t("footer.languageSelector")} - English</option>
            <option value="id">
              {t("footer.languageSelector")} - Bahasa Indonesia
            </option>
          </Select>
        </Flex>

        {/* Footer Text */}
        <Text textAlign={{ base: "center", md: "start" }}>
          {t("footer.netflix")}
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
