import { useState, useEffect } from 'react';

const CategoryForm = () => {
  const [categories, setCategories] = useState([]); // Lista de categorías
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
  });

  // Cargar categorías al montar el componente
  useEffect(() => {
    fetch('http://localhost:8080/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) =>
        console.error('Error cargando categorías:', error)
      );
  }, []);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Enviar formulario para crear una nueva categoría
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'http://localhost:8080/categories',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert('Categoría creada exitosamente!');
        setFormData({
          title: '',
          description: '',
          imageUrl: '',
        });
        const newCategory = await response.json();
        setCategories([...categories, newCategory]); // Agregar nueva categoría a la lista
      } else {
        alert('Error al crear la categoría.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un problema con la solicitud.');
    }
  };

  return (
    <div>
      <h2>Agregar Nueva Categoría</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="URL de la imagen"
          value={formData.imageUrl}
          onChange={handleChange}
          required
        />
        <button type="submit">Crear Categoría</button>
      </form>

      <h3>Categorías existentes</h3>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <img
              src={category.imageUrl}
              alt={category.title}
              width="50"
            />
            <strong>{category.title}</strong> -{' '}
            {category.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryForm;
