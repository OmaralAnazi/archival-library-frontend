import {
  Box,
  Button,
  Heading,
  Input,
  Select,
  SimpleGrid,
  VStack,
  Text,
  HStack,
  Image,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

// Temporary data simulating the JSON file content
const documents = [
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
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [filteredDocs, setFilteredDocs] = useState(documents);

  useEffect(() => {
    const filtered = documents
      .filter((doc) =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((doc) =>
        filterCategory ? doc.category === filterCategory : true
      )
      .sort((a, b) => {
        if (sortOrder === "newest") {
          return (
            new Date(b.publicationDate).getTime() -
            new Date(a.publicationDate).getTime()
          );
        } else {
          return (
            new Date(a.publicationDate).getTime() -
            new Date(b.publicationDate).getTime()
          );
        }
      });

    setFilteredDocs(filtered);
  }, [searchTerm, filterCategory, sortOrder]);

  return (
    <Box p={8} maxW={1280} mx="auto">
      <Heading as="h2" size="xl" mb={6} textAlign="center" color="teal.600">
        Library Documents
      </Heading>
      <VStack spacing={4} mb={6}>
        <Input
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <HStack spacing={4} width="full">
          <Select
            placeholder="Category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {/* TODO: get them from the backend */}
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="Preservation">Preservation</option>
            <option value="Technology">Technology</option>
            <option value="Cataloging">Cataloging</option>
          </Select>
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </Select>
        </HStack>
      </VStack>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {filteredDocs.map((doc) => (
          <Flex
            key={doc.id}
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
              src={doc.imageUrl}
              alt={doc.title}
              borderRadius="md"
              width={{ base: "100%", md: "150px" }}
              height={{ base: "auto", md: "100%" }}
              objectFit="cover"
              flexShrink={0}
            />
            <Flex direction="column" justifyContent="space-between" flex="1">
              <Box mb={4}>
                <Heading as="h3" size="md" mb={2}>
                  {doc.title}
                </Heading>
                <Text fontSize="sm" color="gray.500">
                  {doc.author} -{" "}
                  {new Date(doc.publicationDate).toLocaleDateString()}
                </Text>
                <Text mt={2}>{doc.description}</Text>
                <Text mt={2} fontSize="sm" color="gray.600">
                  Category: {doc.category}
                </Text>
              </Box>
              <Button
                mt={{ base: 4, md: 0 }}
                colorScheme="teal"
                width="full"
                onClick={() => window.open(doc.documentUrl, "_blank")}
              >
                View Document
              </Button>
            </Flex>
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Explore;
