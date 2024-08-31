import { HStack, Input, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { DocumentResponse } from "../../api/useAPI";
import useCategories from "../../hooks/useCategories";

interface SearchFilterProps {
  documents: DocumentResponse[];
  setFilteredDocs: (docs: DocumentResponse[]) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ documents, setFilteredDocs }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const { categories } = useCategories();

  useEffect(() => {
    const filtered = documents
      .filter((doc) => doc.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter((doc) => (filterCategory ? doc.categoryName === filterCategory : true))
      .sort((a, b) => {
        if (sortOrder === "newest") {
          return new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime();
        } else {
          return new Date(a.publicationDate).getTime() - new Date(b.publicationDate).getTime();
        }
      });

    setFilteredDocs(filtered);
  }, [searchTerm, filterCategory, sortOrder, documents, setFilteredDocs]);

  return (
    <>
      <Input
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <HStack spacing={4} width="full">
        <Select
          placeholder="Category"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </Select>
        <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </Select>
      </HStack>
    </>
  );
};

export default SearchFilter;
