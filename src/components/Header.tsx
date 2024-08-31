import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import routes from "../routes";
import useAuthStore from "../stores/AuthStore";

const Header = () => {
  const { accessToken } = useAuthStore();

  return (
    <Box as="header" bg="teal.500" color="white" py={4} px={8} w={"100%"}>
      <Flex justify="space-between" align="center">
        <Heading as="h1" size="lg">
          Archival Library
        </Heading>
        <Flex gap={4}>
          {routes.map((route) => {
            if (
              (!accessToken && !route.hideFromHeaderForGuestUsers) ||
              (accessToken && !route.hideFromHeaderForLoggedInUsers)
            ) {
              return (
                <Link as={RouterLink} to={route.path} key={route.name} fontWeight="bold">
                  {route.name}
                </Link>
              );
            }
            return null;
          })}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
