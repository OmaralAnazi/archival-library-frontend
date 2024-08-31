import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import useAuthStore from "../stores/AuthStore";

interface AuthCheckerProps {
  children: React.ReactNode;
}

const AuthChecker: React.FC<AuthCheckerProps> = ({ children }) => {
  const { accessToken } = useAuthStore();

  if (!accessToken) {
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
            Access Restricted
          </Heading>
          <Text fontSize="lg" color="gray.600">
            It seems you are either not logged in or your session has expired. Please log in again
            to continue.
          </Text>
          <Button as={RouterLink} to="/login" colorScheme="teal" size="lg" mt={4}>
            Go to Login
          </Button>
        </VStack>
      </Box>
    );
  }

  return <>{children}</>;
};

export default AuthChecker;
