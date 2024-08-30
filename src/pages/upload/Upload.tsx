import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Textarea,
  VStack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required"),
  file: Yup.mixed<FileList>()
    .required("A PDF file is required")
    .test(
      "fileType",
      "Only PDF files are allowed",
      (value) =>
        value && value.length > 0 && value[0].type === "application/pdf"
    ),
});

type UploadFormInputs = {
  title: string;
  category: string;
  description: string;
  file: FileList;
};

const Upload = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UploadFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const toast = useToast();

  const onSubmit = (data: UploadFormInputs) => {
    // TODO: Implement upload logic (e.g., file upload to backend)
    toast({
      title: "Document Uploaded",
      description: "Your document has been uploaded successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    reset();
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
        Upload Document
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.title}>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              id="title"
              placeholder="Enter document title"
              {...register("title")}
            />
            <FormErrorMessage>
              {errors.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.category}>
            <FormLabel htmlFor="category">Category</FormLabel>
            <Select
              id="category"
              placeholder="Select category"
              {...register("category")}
            >
              {/* TODO: get from backend */}
              <option value="Science">Science</option>
              <option value="History">History</option>
              <option value="Preservation">Preservation</option>
              <option value="Technology">Technology</option>
              <option value="Cataloging">Cataloging</option>
            </Select>
            <FormErrorMessage>
              {errors.category && errors.category.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.description}>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea
              id="description"
              placeholder="Enter a brief description"
              {...register("description")}
            />
            <FormErrorMessage>
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.file}>
            <FormLabel htmlFor="file">Upload File</FormLabel>
            <Input id="file" type="file" accept=".pdf" {...register("file")} />
            <FormErrorMessage>
              {errors.file && errors.file.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            width="full"
            isLoading={isSubmitting}
          >
            Upload
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Upload;
