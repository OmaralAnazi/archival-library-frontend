import { Box, Heading, Table, Tbody, Th, Thead, Tr, Text, Center, Button } from "@chakra-ui/react";
import DocumentRow from "./DocumentRow";
import { DocumentResponse } from "../../api/useAPI";
import { Link as RouterLink } from "react-router-dom";

interface DocumentsSectionProps {
  documents: DocumentResponse[];
  onView: (id: number) => void;
  onDelete: (id: number) => void;
}

const DocumentsSection: React.FC<DocumentsSectionProps> = ({ documents, onView, onDelete }) => {
  return (
    <Box>
      <Heading as="h3" size="md" color="teal.600" mb={4} textAlign="center">
        Your Documents
      </Heading>
      <Box
        maxH="400px"
        overflowY="auto"
        borderWidth={documents.length === 0 ? "" : "1px"}
        borderRadius="md"
        borderColor="gray.200"
      >
        {documents.length === 0 ? (
          <Center py={10} flexDirection="column">
            <Text fontSize="lg" color="gray.600" textAlign="center" mb={4}>
              You have no documents available.
            </Text>
            <Button colorScheme="teal" as={RouterLink} to="/upload">
              Upload Now
            </Button>
          </Center>
        ) : (
          <Table variant="simple" size="lg">
            <Thead bg="gray.50">
              <Tr>
                <Th>Title</Th>
                <Th>Date Created</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {documents.map((doc) => (
                <DocumentRow key={doc.id} document={doc} onView={onView} onDelete={onDelete} />
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </Box>
  );
};

export default DocumentsSection;
