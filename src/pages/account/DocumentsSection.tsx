import { Box, Heading, Table, Tbody, Th, Thead, Tr, Text, Center } from "@chakra-ui/react";
import DocumentRow from "./DocumentRow";
import { DocumentResponse } from "../../api/useAPI";

interface DocumentsSectionProps {
  documents: DocumentResponse[];
  onView: (id: number) => void;
  onDelete: (id: number) => void;
}

const DocumentsSection: React.FC<DocumentsSectionProps> = ({ documents, onView, onDelete }) => {
  return (
    <Box flex="2">
      <Heading as="h3" size="md" color="teal.600" mb={4} textAlign="center">
        Your Documents
      </Heading>
      <Box maxH="400px" overflowY="auto" borderWidth="1px" borderRadius="md" borderColor="gray.200">
        {documents.length === 0 ? (
          <Center py={10}>
            <Text fontSize="lg" color="gray.600" textAlign="center">
              You have no documents available.
            </Text>
          </Center>
        ) : (
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
