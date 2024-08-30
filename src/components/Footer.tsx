import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      as="footer"
      bg="teal.500"
      color="white"
      py={4}
      px={8}
      mt={8}
      textAlign="center"
    >
      <Text fontSize="sm">
        © 2024 The Archival Library. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
