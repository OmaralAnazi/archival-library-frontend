import { Box, Button, Heading, Text, Flex, Image, VStack, Stack, Divider } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import HeroImage1 from "../../assets/hero1.png";
import HeroImage2 from "../../assets/hero2.png";

const Home = () => {
  return (
    <Box p={8} maxW={1280} marginX={"auto"}>
      <Flex direction={{ base: "column-reverse", md: "row" }} align="center" mb={10} gap={5}>
        <Box flex="1" pr={{ base: 0, md: 8 }} mb={{ base: 8, md: 0 }}>
          <Heading as="h2" size="2xl" mb={4} color="teal.600">
            Discover, Learn, Preserve
          </Heading>
          <Text fontSize="lg" mb={6} color="gray.600">
            Welcome to The Archival Library, where knowledge meets preservation. Dive into a world
            of historical documents, rare collections, and digital treasures from across the globe.
          </Text>
          <Button colorScheme="teal" size="lg" as={RouterLink} to="/explore">
            Explore Now
          </Button>
        </Box>
        <Box flex="1">
          <Image
            src={HeroImage1}
            width={"100%"}
            maxWidth={{ base: "240px", sm: "320px", md: "100%" }}
            alt="About us"
            borderRadius="md"
            objectFit="cover"
          />
        </Box>
      </Flex>

      <Divider my={10} />

      <Stack direction={{ base: "column", md: "row" }} spacing={8} align="center" mb={10}>
        <Image
          src={HeroImage2}
          maxWidth={{ base: "240px", sm: "320px", md: "420px" }}
          alt="About us"
          borderRadius="md"
          objectFit="cover"
        />
        <VStack align="start" spacing={4} flex="1">
          <Heading as="h3" size="lg" color="teal.600">
            Our Mission
          </Heading>
          <Text fontSize="md" color="gray.600">
            The Archival Library is dedicated to digitizing and preserving historical documents,
            making them accessible to researchers, students, and enthusiasts worldwide. Join us in
            our mission to keep history alive.
          </Text>
          <Button variant="outline" colorScheme="teal" size="md" as={RouterLink} to="/more">
            Learn More
          </Button>
        </VStack>
      </Stack>

      <Divider my={10} />

      <Box textAlign="center" py={10} px={5} bg="teal.50" borderRadius="md">
        <Heading as="h3" size="lg" mb={4} color="teal.700">
          Join Our Community
        </Heading>
        <Text fontSize="lg" mb={6} color="gray.600">
          Become a part of a vibrant community that values knowledge, preservation, and education.
          Sign up for exclusive access to new collections and special events.
        </Text>
        <Button colorScheme="teal" size="lg" as={RouterLink} to="/signup">
          Sign Up Today
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
