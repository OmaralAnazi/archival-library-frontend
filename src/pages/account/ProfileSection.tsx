import { VStack, Avatar, Heading, Text, Button } from "@chakra-ui/react";
import useAuthStore from "../../stores/AuthStore";

interface ProfileSectionProps {
  onLogout: () => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ onLogout }) => {
  const { firstName, lastName, email, phoneNumber } = useAuthStore();

  return (
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
      minW="300px"
    >
      <Avatar size="2xl" name={`${firstName} ${lastName}`} />
      <Heading as="h2" size="lg" color="teal.600">
        {firstName} {lastName}
      </Heading>
      <Text fontSize="lg" color="gray.600">
        {email}
      </Text>
      <Text fontSize="lg" color="gray.600">
        {phoneNumber}
      </Text>
      <Button colorScheme="red" size="md" onClick={onLogout}>
        Logout
      </Button>
    </VStack>
  );
};

export default ProfileSection;
