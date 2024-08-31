import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import useAPI, { DocumentResponse } from "../../api/useAPI";

interface DocumentCardProps {
  document: DocumentResponse;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document }) => {
  const { viewDocumentFile } = useAPI();

  return (
    <Flex
      p={4}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
      bg="white"
      direction={{ base: "column", md: "row" }}
      justifyContent="space-between"
      alignItems="center"
      height="100%"
      gap={4}
    >
      <Image
        // TODO: implement:
        // src={document.imageUrl}
        alt={document.title}
        borderRadius="md"
        width={{ base: "100%", md: "150px" }}
        height={{ base: "auto", md: "100%" }}
        objectFit="cover"
        flexShrink={0}
      />
      <Flex direction="column" justifyContent="space-between" flex="1">
        <Box mb={4}>
          <Heading as="h3" size="md" mb={2}>
            {document.title}
          </Heading>
          <Text fontSize="sm" color="gray.500">
            {document.authorName} - {new Date(document.publicationDate).toLocaleDateString()}
          </Text>
          <Text mt={2}>{document.description}</Text>
          <Text mt={2} fontSize="sm" color="gray.600">
            Category: {document.categoryName}
          </Text>
        </Box>
        <Button
          mt={{ base: 4, md: 0 }}
          colorScheme="teal"
          width="full"
          onClick={() => viewDocumentFile(document.id)}
        >
          View Document
        </Button>
      </Flex>
    </Flex>
  );
};

export default DocumentCard;
