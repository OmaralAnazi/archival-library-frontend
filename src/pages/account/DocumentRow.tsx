import { Tr, Td, HStack, IconButton } from "@chakra-ui/react";
import { FaTrash, FaEye } from "react-icons/fa";
import { DocumentResponse } from "../../api/useAPI";

interface DocumentRowProps {
  document: DocumentResponse;
  onView: (id: number) => void;
  onDelete: (id: number) => void;
}

const DocumentRow: React.FC<DocumentRowProps> = ({ document, onView, onDelete }) => {
  return (
    <Tr _hover={{ bg: "gray.100" }}>
      <Td>{document.title}</Td>
      <Td>{document.publicationDate.split("T")[0]}</Td>
      <Td>
        <HStack spacing={2}>
          <IconButton
            aria-label="View document"
            icon={<FaEye />}
            colorScheme="blue"
            onClick={() => onView(document.id)}
          />
          <IconButton
            aria-label="Delete document"
            icon={<FaTrash />}
            colorScheme="red"
            onClick={() => onDelete(document.id)}
          />
        </HStack>
      </Td>
    </Tr>
  );
};

export default DocumentRow;
