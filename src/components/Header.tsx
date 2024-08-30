import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Header = () => {
  return (
    <Box as="header" bg="teal.500" color="white" py={4} px={8} w={"100%"}>
      <Flex justify="space-between" align="center">
        <Heading as="h1" size="lg">
          The Archival Library
        </Heading>
        <Flex gap={4}>
          <Link as={RouterLink} to="/" fontWeight="bold">
            Home
          </Link>
          <Link as={RouterLink} to="/login" fontWeight="bold">
            Login
          </Link>
          <Link as={RouterLink} to="/signup" fontWeight="bold">
            Signup
          </Link>
          <Link as={RouterLink} to="/explore" fontWeight="bold">
            Explore
          </Link>
          <Link as={RouterLink} to="/upload" fontWeight="bold">
            Upload
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
