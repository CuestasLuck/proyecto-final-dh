import { useState } from 'react';

function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'http://localhost:8080/categories'
      );
      const dataToJson = await response.json();
      setCategories(dataToJson);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (newCategory) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'http://localhost:8080/categories',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newCategory }),
        }
      );
      const dataToJson = await response.json();
      setCategories((prevCategories) => [
        ...prevCategories,
        dataToJson,
      ]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    getCategories,
    addCategory,
  };
}

export default useCategories;
