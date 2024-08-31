import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  HStack,
  Heading,
  Text,
  Link,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import useSignup from "../../hooks/useSignup";

const Signup = () => {
  const { handleSubmit, register, onSubmit, formState } = useSignup();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Box
      maxW="lg"
      minW={{ base: "auto", md: "720px" }}
      mx="auto"
      mt={10}
      p={8}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
    >
      <Heading as="h2" size="xl" textAlign="center" mb={6} color="teal.600">
        Create Your Account
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <HStack spacing={4} width="full">
            <FormControl isInvalid={!!formState.errors.firstName}>
              <FormLabel htmlFor="firstName">First Name</FormLabel>
              <Input
                id="firstName"
                placeholder="Enter your first name"
                {...register("firstName")}
              />
              <FormErrorMessage>
                {formState.errors.firstName && formState.errors.firstName.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formState.errors.lastName}>
              <FormLabel htmlFor="lastName">Last Name</FormLabel>
              <Input id="lastName" placeholder="Enter your last name" {...register("lastName")} />
              <FormErrorMessage>
                {formState.errors.lastName && formState.errors.lastName.message}
              </FormErrorMessage>
            </FormControl>
          </HStack>

          <FormControl isInvalid={!!formState.errors.phoneNumber}>
            <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="Enter your phone number"
              {...register("phoneNumber")}
            />
            <FormErrorMessage>
              {formState.errors.phoneNumber && formState.errors.phoneNumber.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!formState.errors.birthdate}>
            <FormLabel htmlFor="birthdate">Birthdate</FormLabel>
            <Input
              id="birthdate"
              type="date"
              placeholder="Enter your birthdate"
              {...register("birthdate")}
            />
            <FormErrorMessage>
              {formState.errors.birthdate && formState.errors.birthdate.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!formState.errors.email}>
            <FormLabel htmlFor="email">Email Address</FormLabel>
            <Input id="email" type="email" placeholder="Enter your email" {...register("email")} />
            <FormErrorMessage>
              {formState.errors.email && formState.errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!formState.errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
              />
              <InputRightElement>
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={togglePasswordVisibility}
                  variant="ghost"
                  size="sm"
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {formState.errors.password && formState.errors.password.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!formState.errors.confirmPassword}>
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <InputGroup>
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                {...register("confirmPassword")}
              />
              <InputRightElement>
                <IconButton
                  aria-label={
                    showConfirmPassword ? "Hide confirm password" : "Show confirm password"
                  }
                  icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={toggleConfirmPasswordVisibility}
                  variant="ghost"
                  size="sm"
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {formState.errors.confirmPassword && formState.errors.confirmPassword.message}
            </FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme="teal" width="full" isLoading={formState.isSubmitting}>
            Sign Up
          </Button>
        </VStack>
      </form>

      <Text mt={4} textAlign="center">
        Do you have an account?{" "}
        <Link as={RouterLink} to="/login" color="teal.500" fontWeight="bold">
          Login
        </Link>
      </Text>
    </Box>
  );
};

export default Signup;
