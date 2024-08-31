import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LibraryDocument } from "../../api/useAPI";
import ProfileSection from "./ProfileSection";
import DocumentsSection from "./DocumentsSection";
import ConfirmationModal from "../../components/ConfirmationModal";
import useAuthStore from "../../stores/AuthStore";
import { useNavigate } from "react-router-dom";

// TODO: Temporary data simulating the JSON file content. Replace with data from backend!
const documentsTemp: LibraryDocument[] = [
  {
    id: 1,
    title: "Introduction to Archival Science",
    author: "John Doe",
    publicationDate: "2023-01-15",
    description: "A comprehensive guide to understanding the basics of archival science.",
    category: "Science",
    imageUrl: "https://via.placeholder.com/150",
    documentUrl: "https://example.com/document1.pdf",
  },
  {
    id: 2,
    title: "Introduction to Archival Science",
    author: "John Doe",
    publicationDate: "2023-01-15",
    description: "A comprehensive guide to understanding the basics of archival science.",
    category: "Science",
    imageUrl: "https://via.placeholder.com/150",
    documentUrl: "https://example.com/document1.pdf",
  },
  {
    id: 3,
    title: "Introduction to Archival Science",
    author: "John Doe",
    publicationDate: "2023-01-15",
    description: "A comprehensive guide to understanding the basics of archival science.",
    category: "Science",
    imageUrl: "https://via.placeholder.com/150",
    documentUrl: "https://example.com/document1.pdf",
  },
];

const Account: React.FC = () => {
  const [documents, setDocuments] = useState<LibraryDocument[]>([]);
  const [selectedDocId, setSelectedDocId] = useState<number | null>(null);
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const {
    isOpen: isDeleteModalOpen,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();

  const {
    isOpen: isLogoutModalOpen,
    onOpen: onOpenLogoutModal,
    onClose: onCloseLogoutModal,
  } = useDisclosure();

  const handleLogout = () => {
    onOpenLogoutModal();
  };

  const confirmLogout = () => {
    logout();
    onCloseLogoutModal();
    navigate("/login");
  };

  const handleDelete = (id: number) => {
    setSelectedDocId(id);
    onOpenDeleteModal();
  };

  const confirmDelete = () => {
    if (selectedDocId !== null) {
      // TODO: implement with backend!
      setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== selectedDocId));
      onCloseDeleteModal();
      setSelectedDocId(null);
    }
  };

  useEffect(() => {
    setDocuments(documentsTemp);
  }, []);

  return (
    <Box p={8} mx="auto" mt={10} borderWidth={1} borderRadius="lg" boxShadow="xl" bg="white">
      <Flex direction={{ base: "column", md: "row" }} gap={8}>
        <ProfileSection onLogout={handleLogout} />

        <DocumentsSection
          documents={documents}
          onView={(id) => console.log(`Viewing document with id: ${id}`)}
          onDelete={handleDelete}
        />
      </Flex>

      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={onCloseLogoutModal}
        onConfirm={confirmLogout}
        title="Confirm Logout"
        body="Are you sure you want to log out?"
        confirmText="Logout"
        cancelText="Cancel"
        isDanger
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={onCloseDeleteModal}
        onConfirm={confirmDelete}
        title="Confirm Delete"
        body="Are you sure you want to delete this document?"
        confirmText="Delete"
        cancelText="Cancel"
        isDanger
      />
    </Box>
  );
};

export default Account;
