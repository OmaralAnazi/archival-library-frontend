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
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number is not valid")
    .min(10, "Phone number must be at least 10 digits"),
  birthdate: Yup.date()
    .required("Birthdate is required")
    .max(new Date(), "Birthdate cannot be in the future"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

type SignupFormInputs = {
  firstName: string;
  lastName: string;
  phone: string;
  birthdate: Date;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: SignupFormInputs) => {
    // TODO: Handle the logic needed to talk to the backend!
    console.log("Form Submitted", data);
  };

  return (
    <Box
      maxW="lg"
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
            <FormControl isInvalid={!!errors.firstName}>
              <FormLabel htmlFor="firstName">First Name</FormLabel>
              <Input
                id="firstName"
                placeholder="Enter your first name"
                {...register("firstName")}
              />
              <FormErrorMessage>
                {errors.firstName && errors.firstName.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.lastName}>
              <FormLabel htmlFor="lastName">Last Name</FormLabel>
              <Input
                id="lastName"
                placeholder="Enter your last name"
                {...register("lastName")}
              />
              <FormErrorMessage>
                {errors.lastName && errors.lastName.message}
              </FormErrorMessage>
            </FormControl>
          </HStack>

          <FormControl isInvalid={!!errors.phone}>
            <FormLabel htmlFor="phone">Phone Number</FormLabel>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              {...register("phone")}
            />
            <FormErrorMessage>
              {errors.phone && errors.phone.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.birthdate}>
            <FormLabel htmlFor="birthdate">Birthdate</FormLabel>
            <Input
              id="birthdate"
              type="date"
              placeholder="Enter your birthdate"
              {...register("birthdate")}
            />
            <FormErrorMessage>
              {errors.birthdate && errors.birthdate.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">Email Address</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.confirmPassword}>
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              {...register("confirmPassword")}
            />
            <FormErrorMessage>
              {errors.confirmPassword && errors.confirmPassword.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            width="full"
            isLoading={isSubmitting}
          >
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
