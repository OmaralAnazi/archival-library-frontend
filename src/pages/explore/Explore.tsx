import { Box, Heading, SimpleGrid, VStack, Text, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SearchFilter from "./SearchFilter";
import DocumentCard from "./DocumentCard";
import useAPI, { DocumentResponse } from "../../api/useAPI";

const Explore = () => {
  const [documents, setDocuments] = useState<DocumentResponse[]>([]);
  const [filteredDocs, setFilteredDocs] = useState<DocumentResponse[]>([]);
  const { getAllDocuments } = useAPI();

  useEffect(() => {
    getAllDocuments().then((docs) => setDocuments(docs));
  }, []);

  return (
    <Box p={8} maxW={1280} mx="auto">
      <Heading as="h2" size="xl" mb={6} textAlign="center" color="teal.600">
        Library Documents
      </Heading>
      <VStack spacing={4} mb={6}>
        <SearchFilter documents={documents} setFilteredDocs={setFilteredDocs} />
      </VStack>
      {filteredDocs.length === 0 ? (
        <Center>
          <Text fontSize="lg" color="gray.500">
            No documents found. Try adjusting your search or filter criteria.
          </Text>
        </Center>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {filteredDocs.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Explore;
