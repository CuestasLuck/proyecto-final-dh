import { useState, useEffect } from 'react';
function Categories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] =
    useState([]);
  const [hotels, setHotels] = useState([]);
  const [totalHotels, setTotalHotels] = useState(0);

  useEffect(() => {
    fetch('http://localhost:8080/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
  };

  useEffect(() => {
    const url = selectedCategories.length
      ? `http://localhost:8080/hotels/categories?categoryIds=${selectedCategories.join(',')}`
      : 'http://localhost:8080/hotels';

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setHotels(data);
        setTotalHotels(data.length);
      });
  }, [selectedCategories]);

  return (
    <div>
      <h3>Categorías</h3>
      {categories.map((category) => (
        <label key={category.id}>
          <input
            type="checkbox"
            value={category.id}
            checked={selectedCategories.includes(
              category.id
            )}
            onChange={() =>
              handleCategoryChange(category.id)
            }
          />
          {category.title}
        </label>
      ))}

      <h3>
        Resultados: {hotels.length} / {totalHotels} hoteles
      </h3>

      <button onClick={() => setSelectedCategories([])}>
        Resetear Filtros
      </button>

      <div>
        {hotels.map((hotel) => (
          <div key={hotel.id}>
            <h4>{hotel.name}</h4>
            <p>
              {hotel.city}, {hotel.country}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
