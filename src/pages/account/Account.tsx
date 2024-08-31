import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useAPI, { DocumentResponse } from "../../api/useAPI";
import ProfileSection from "./ProfileSection";
import DocumentsSection from "./DocumentsSection";
import ConfirmationModal from "../../components/ConfirmationModal";
import useAuthStore from "../../stores/AuthStore";
import { useNavigate } from "react-router-dom";
import useCustomToast, { ToastStatus } from "../../hooks/useCustomToast";

const Account: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentResponse[]>([]);
  const [selectedDocId, setSelectedDocId] = useState<number | null>(null);
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const { getAllDocumentsByUser, deleteDocument, viewDocumentFile } = useAPI();
  const { showMessage } = useCustomToast();

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

  const confirmDelete = async () => {
    if (selectedDocId !== null) {
      try {
        await deleteDocument(selectedDocId);
        setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== selectedDocId));
        showMessage("Document has been deleted successfully", ToastStatus.SUCCESS);
      } catch (error: any) {
        showMessage("Failed to delete the document", ToastStatus.ERROR);
      }
      onCloseDeleteModal();
      setSelectedDocId(null);
    }
  };

  useEffect(() => {
    getAllDocumentsByUser().then((docs) => setDocuments(docs));
  }, []);

  return (
    <Box p={8} mx="auto" mt={10} borderWidth={1} borderRadius="lg" boxShadow="xl" bg="white">
      <Flex direction={{ base: "column", md: "row" }} gap={8}>
        <ProfileSection onLogout={handleLogout} />

        <DocumentsSection
          documents={documents}
          onView={(id) => viewDocumentFile(id)}
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
