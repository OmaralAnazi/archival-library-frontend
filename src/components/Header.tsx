import {
  Box,
  Flex,
  Heading,
  Link,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import routes from "../routes";
import useAuthStore from "../stores/AuthStore";

const Header = () => {
  const { accessToken } = useAuthStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box as="header" bg="teal.500" color="white" py={4} px={8} w="100%">
      <Flex justify="space-between" align="center">
        <Heading as="h1" size="lg">
          <Link as={RouterLink} to="/" _hover={{ textDecoration: "none" }}>
            Archival Library
          </Link>
        </Heading>
        <Flex display={{ base: "none", md: "flex" }} gap={4}>
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
        {/* Hamburger Icon for small screens */}
        <IconButton
          display={{ base: "flex", md: "none" }}
          icon={<HamburgerIcon />}
          aria-label="Open Menu"
          onClick={onOpen}
          bg="teal.600"
          color="white"
          _hover={{ bg: "teal.600" }}
          size={"lg"}
        />
      </Flex>

      {/* Mobile Drawer */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bgGradient="linear(to-b, teal.600, teal.400)" color="white" maxW={"240px"}>
          <DrawerCloseButton color="white" _hover={{ bg: "teal.700" }} />
          <Flex p={4} borderBottom="1px solid white" mb={4}>
            <Heading as="h3" size="md" color="white">
              Menu
            </Heading>
          </Flex>
          <DrawerBody>
            <VStack spacing={4} mt={4} align="start">
              {routes.map((route) => {
                if (
                  (!accessToken && !route.hideFromHeaderForGuestUsers) ||
                  (accessToken && !route.hideFromHeaderForLoggedInUsers)
                ) {
                  return (
                    <Link
                      as={RouterLink}
                      to={route.path}
                      key={route.name}
                      onClick={onClose}
                      fontWeight="bold"
                      w="full"
                      textAlign="left"
                      p={2}
                      borderRadius="md"
                      _hover={{ bg: "teal.500", textDecoration: "none" }}
                    >
                      {route.name}
                    </Link>
                  );
                }
                return null;
              })}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Header;
