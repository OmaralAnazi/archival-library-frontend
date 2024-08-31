import { useRef } from "react";
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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useCustomToast, { ToastStatus } from "../../hooks/useCustomToast";
import useAPI, { UploadDocumentRequest } from "../../api/useAPI";
import useCategories from "../../hooks/useCategories";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  categoryId: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required"),
  file: Yup.mixed<File>().required("A PDF file is required"),
});

const Upload = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<UploadDocumentRequest>({
    resolver: yupResolver(validationSchema),
  });
  const { showMessage } = useCustomToast();
  const { uploadDocument } = useAPI();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { categories } = useCategories();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("file", file, { shouldValidate: true });
    }
  };

  const onSubmit = async (data: UploadDocumentRequest) => {
    try {
      await uploadDocument(data);
      showMessage("Document Uploaded Successfully", ToastStatus.SUCCESS);
      reset();
    } catch (error) {
      showMessage("Failed to upload document", ToastStatus.ERROR);
    }
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
            <Input id="title" placeholder="Enter document title" {...register("title")} />
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.categoryId}>
            <FormLabel htmlFor="category">Category</FormLabel>
            <Select id="category" placeholder="Select category" {...register("categoryId")}>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{errors.categoryId?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.description}>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea
              id="description"
              placeholder="Enter a brief description"
              {...register("description")}
            />
            <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.file}>
            <FormLabel htmlFor="file">Upload File</FormLabel>
            <Input
              id="file"
              type="file"
              accept=".pdf"
              ref={fileInputRef}
              onChange={handleFileChange} // Handling file change separately
            />
            <FormErrorMessage>{errors.file?.message}</FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme="teal" width="full" isLoading={isSubmitting}>
            Upload
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Upload;
