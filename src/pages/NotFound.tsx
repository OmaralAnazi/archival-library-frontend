import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      p={8}
      flex={1}
      display="flex"
      alignItems="center"
      justifyContent="center"
      maxW={720}
      marginX="auto"
    >
      <VStack spacing={6} textAlign="center">
        <Heading as="h1" size="2xl" color="teal.600">
          Oops! Page Not Found
        </Heading>
        <Text fontSize="lg" color="gray.600">
          The page you’re looking for doesn’t exist. It might have been removed,
          or you may have mistyped the URL.
        </Text>
        <Button as={RouterLink} to="/" colorScheme="teal" size="lg" mt={4}>
          Go Back Home
        </Button>
      </VStack>
    </Box>
  );
};

export default NotFound;
