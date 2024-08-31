import { useEffect, useState } from "react";
import useAPI, { CategoryResponse } from "../api/useAPI";

const useCategories = () => {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const { getCategories } = useAPI();

  useEffect(() => {
    getCategories().then((categories) => setCategories(categories));
  }, []);

  return {
    categories,
  };
};

export default useCategories;
