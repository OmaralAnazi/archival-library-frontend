import {
  Box,
  Button,
  Avatar,
  Heading,
  Text,
  VStack,
  HStack,
  Flex,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FaTrash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/AuthStore";
import { useEffect, useState } from "react";
import { LibraryDocument } from "../../api/useAPI";

// TODO: Temporary data simulating the JSON file content. Replace with data from backend!
const documentsTemp: LibraryDocument[] = [
  {
    id: 1,
    title: "Introduction to Archival Science",
    author: "John Doe",
    publicationDate: "2023-01-15",
    description: "A comprehensive guide to understanding the basics of archival science.",
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
    description: "Effective cataloging techniques to manage large-scale archives efficiently.",
    category: "Cataloging",
    imageUrl: "https://via.placeholder.com/150",
    documentUrl: "https://example.com/document5.pdf",
  },
  {
    id: 6,
    title: "Cataloging Techniques for Large Archives",
    author: "Anna Williams",
    publicationDate: "2020-12-01",
    description: "Effective cataloging techniques to manage large-scale archives efficiently.",
    category: "Cataloging",
    imageUrl: "https://via.placeholder.com/150",
    documentUrl: "https://example.com/document5.pdf",
  },
];

const Account: React.FC = () => {
  const { firstName, lastName, email, phoneNumber, logout } = useAuthStore();
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<LibraryDocument[]>([]);

  // TODO: Mock fetching documents (replace with real API call)
  useEffect(() => {
    setDocuments(documentsTemp);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleDelete = (id: number) => {
    setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== id));
  };

  const handleView = (id: number) => {
    // TODO: implement a view page and nav to it
  };

  return (
    <Box p={8} mx="auto" mt={10} borderWidth={1} borderRadius="lg" boxShadow="xl" bg="white">
      <Flex direction={{ base: "column", md: "row" }} gap={8}>
        <VStack
          spacing={4}
          textAlign="center"
          justifyContent="center"
          alignItems="center"
          align="start"
          flex="1"
          borderRight={{ base: "none", md: "1px solid gray" }}
          borderColor="gray.200"
          pr={{ base: 0, md: 8 }}
        >
          <Avatar size="2xl" name={`${firstName} ${lastName}`} src="" />
          <Heading as="h2" size="lg" color="teal.600">
            {firstName} {lastName}
          </Heading>
          <Text fontSize="lg" color="gray.600">
            {email}
          </Text>
          <Text fontSize="lg" color="gray.600">
            {phoneNumber}
          </Text>
          <Button colorScheme="red" size="md" onClick={handleLogout}>
            Logout
          </Button>
        </VStack>

        <Box flex="2">
          <Heading as="h3" size="md" color="teal.600" mb={4} textAlign="center">
            Your Documents
          </Heading>
          <Box
            maxH="400px"
            overflowY="auto"
            borderWidth="1px"
            borderRadius="md"
            borderColor="gray.200"
          >
            <Table variant="simple" size="md">
              <Thead bg="gray.50">
                <Tr>
                  <Th>Title</Th>
                  <Th>Date Created</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {documents.map((doc) => (
                  <Tr key={doc.id} _hover={{ bg: "gray.100" }}>
                    <Td>{doc.title}</Td>
                    <Td>{doc.publicationDate}</Td>
                    <Td>
                      <HStack spacing={2}>
                        <IconButton
                          aria-label="View document"
                          icon={<FaEye />}
                          colorScheme="blue"
                          onClick={() => handleView(doc.id)}
                        />
                        <IconButton
                          aria-label="Delete document"
                          icon={<FaTrash />}
                          colorScheme="red"
                          onClick={() => handleDelete(doc.id)}
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Account;
