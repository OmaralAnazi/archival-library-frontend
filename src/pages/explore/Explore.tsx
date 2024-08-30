import {
  Box,
  Heading,
  SimpleGrid,
  VStack,
  Text,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import SearchFilter from "./SearchFilter";
import DocumentCard from "./DocumentCard";
import { LibraryDocument } from "../../api/useAPI";

// TODO: Temporary data simulating the JSON file content. Replace with data from backend!
const documents: LibraryDocument[] = [
  {
    id: 1,
    title: "Introduction to Archival Science",
    author: "John Doe",
    publicationDate: "2023-01-15",
    description:
      "A comprehensive guide to understanding the basics of archival science.",
    category: "Science",
    imageUrl: "https://via.placeholder.com/150", // Placeholder image URL
    documentUrl: "https://example.com/document1.pdf", // Placeholder document URL
  },
  {
    id: 2,
    title: "The History of Digital Archives",
    author: "Jane Smith",
    publicationDate: "2022-11-05",
    description:
      "An exploration of the evolution of digital archives and their impact on information management.",
    category: "History",
    imageUrl: "https://via.placeholder.com/150",
    documentUrl: "https://example.com/document2.pdf",
  },
  {
    id: 3,
    title: "Preserving Rare Manuscripts",
    author: "Emily Clark",
    publicationDate: "2021-08-20",
    description:
      "Techniques and best practices for preserving rare manuscripts in the digital age.",
    category: "Preservation",
    imageUrl: "https://via.placeholder.com/150",
    documentUrl: "https://example.com/document3.pdf",
  },
  {
    id: 4,
    title: "Data Security in Archives",
    author: "Michael Brown",
    publicationDate: "2023-02-10",
    description:
      "A look at the challenges and solutions for maintaining data security in archival systems.",
    category: "Technology",
    imageUrl: "https://via.placeholder.com/150",
    documentUrl: "https://example.com/document4.pdf",
  },
  {
    id: 5,
    title: "Cataloging Techniques for Large Archives",
    author: "Anna Williams",
    publicationDate: "2020-12-01",
    description:
      "Effective cataloging techniques to manage large-scale archives efficiently.",
    category: "Cataloging",
    imageUrl: "https://via.placeholder.com/150",
    documentUrl: "https://example.com/document5.pdf",
  },
];

const Explore = () => {
  const [filteredDocs, setFilteredDocs] = useState(documents);

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
