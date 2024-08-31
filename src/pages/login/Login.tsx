import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
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
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const { handleSubmit, register, onSubmit, formState } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        Login to Your Account
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
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

          <Button type="submit" colorScheme="teal" width="full" isLoading={formState.isSubmitting}>
            Login
          </Button>
        </VStack>
      </form>

      <Text mt={4} textAlign="center">
        Don't have an account?{" "}
        <Link as={RouterLink} to="/signup" color="teal.500" fontWeight="bold">
          Sign Up
        </Link>
      </Text>
    </Box>
  );
};

export default Login;
