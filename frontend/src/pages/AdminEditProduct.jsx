import { useState, useContext, useEffect } from 'react';
import { HotelContext } from '../context/HotelContext';
import styles from '../styles/admin.module.css';
import { useParams } from 'react-router-dom'; // Para capturar el id del producto a editar

const AdminEditProduct = () => {
  const { id } = useParams(); // Capturamos el id del producto
  const {
    error,
    editHotel,
    categories,
    getCategories,
    findHotel,
    foundHotel,
    getFeatures,
    features,
  } = useContext(HotelContext);
  const [hotel, setHotel] = useState({
    name: '',
    city: '',
    country: '',
    pricePerNight: '',
    rating: '',
    description: '',
  });
  const [selectedCategory, setSelectedCategory] =
    useState('');
  const [selectedFeatures, setSelectedFeatures] = useState(
    []
  );

  useEffect(() => {
    findHotel(id);
    getCategories();
    getFeatures();
  }, [id]);

  useEffect(() => {
    if (foundHotel) {
      setHotel({
        name: foundHotel.name,
        city: foundHotel.city,
        country: foundHotel.country,
        pricePerNight: foundHotel.pricePerNight,
        rating: foundHotel.rating,
        description: foundHotel.description,
      });
      setSelectedCategory(foundHotel.category);
      setSelectedFeatures(
        foundHotel.features.map((f) => f.id)
      ); // Guardamos los IDs
    }
  }, [foundHotel]);

  const handleChange = (e) => {
    setHotel({ ...hotel, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const getCategory = (categoryId) => {
      return (
        categories.find(
          (cat) => cat.id === parseInt(categoryId)
        ) || null
      );
    };

    const category = getCategory(selectedCategory);

    console.log(category);

    const updatedHotel = {
      ...hotel,
      rating: parseFloat(hotel.rating),
      pricePerNight: parseFloat(hotel.pricePerNight),
      category: { id: selectedCategory },
      featureId: selectedFeatures, // Enviar características seleccionadas
    };

    await editHotel(id, updatedHotel);

    setHotel({
      name: '',
      city: '',
      country: '',
      pricePerNight: '',
      rating: '',
      description: '',
    });
    setSelectedCategory('');
  };

  return (
    <div className={styles.formConteiner}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Nombre del hotel"
          value={hotel.name}
          onChange={handleChange}
          required
          className={styles.forminput}
        />
        <input
          type="text"
          name="city"
          placeholder="Ciudad"
          value={hotel.city}
          onChange={handleChange}
          required
          className={styles.forminput}
        />
        <input
          type="text"
          name="country"
          placeholder="País"
          value={hotel.country}
          onChange={handleChange}
          required
          className={styles.forminput}
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating (1-5)"
          step="0.1"
          value={hotel.rating}
          onChange={handleChange}
          required
          className={styles.forminput}
        />
        <input
          type="number"
          name="pricePerNight"
          placeholder="Precio por noche"
          value={hotel.pricePerNight}
          onChange={handleChange}
          required
          className={styles.forminput}
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={hotel.description}
          onChange={handleChange}
          required
          className={styles.forminput}
        />
        <div>
          <label>Características:</label>
          {features.map((feature) => (
            <div key={feature.id}>
              <input
                type="checkbox"
                id={`feature-${feature.id}`}
                value={feature.id}
                checked={selectedFeatures.includes(
                  feature.id
                )}
                onChange={() =>
                  handleFeatureChange(feature.id)
                }
              />
              <label htmlFor={`feature-${feature.id}`}>
                {feature.name}
              </label>
            </div>
          ))}
        </div>
        <select
          name="category"
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(e.target.value)
          }
          required
          className={styles.forminput}
        >
          <option value="">Seleccione una categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button type="submit" className={styles.button}>
          Actualizar Hotel
        </button>
      </form>
    </div>
  );
};

export default AdminEditProduct;
