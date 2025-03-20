import { useState, useContext, useEffect } from 'react';
import { HotelContext } from '../context/HotelContext';
import styles from '../styles/admin.module.css';
import ImagePreview from '../components/ImagePreview';

const AdminAddProduct = () => {
  const {
    error,
    registerHotel,
    categories,
    getCategories,
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
  const [images, setImages] = useState([]);

  const [selectedCategory, setSelectedCategory] =
    useState('');
  const [selectedFeatures, setSelectedFeatures] = useState(
    []
  );
  const [previews, setPreviews] = useState([]);

  const [successMessage, setSuccessMessage] =
    useState(null);
  const [localError, setLocalError] = useState(null);

  const handleChange = (e) => {
    setHotel({ ...hotel, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getCategories();
    getFeatures();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validImages = files.filter((file) =>
      ['image/jpeg', 'image/png', 'image/jpg'].includes(
        file.type
      )
    );

    if (validImages.length !== files.length) {
      setLocalError('Solo se permiten imágenes JPG o PNG');
      return;
    }

    setImages(validImages);
    const imagePreviews = validImages.map((file) =>
      URL.createObjectURL(file)
    );
    setPreviews(imagePreviews);
  };

  const handleFeatureChange = (featureId) => {
    setSelectedFeatures((prevFeatures) => {
      if (prevFeatures.includes(featureId)) {
        return prevFeatures.filter(
          (id) => id !== featureId
        );
      } else {
        return [...prevFeatures, featureId];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      alert('Debes subir al menos una imagen');
      return;
    }
    console.log(selectedFeatures);
    console.log(selectedCategory);

    const newHotel = {
      ...hotel,
      rating: parseFloat(hotel.rating),
      pricePerNight: parseFloat(hotel.pricePerNight),
      categoryId: selectedCategory,
      featureIds: selectedFeatures,
    };

    const formData = new FormData();
    const hotelJson = JSON.stringify(newHotel);
    formData.append('hotel', hotelJson);
    images.forEach((image) => {
      formData.append('files', image);
    });

    console.log(formData);

    const response = await registerHotel(formData);

    if (response === true) {
      setSuccessMessage('Hotel agregado con éxito ✅');
      setLocalError(null);
      setHotel({
        name: '',
        city: '',
        country: '',
        pricePerNight: '',
        rating: '',
        description: '',
      });
      setImages([]);
      setPreviews([]);
      setSelectedCategory('');
      setTimeout(() => setSuccessMessage(null), 3000);
    } else {
      setLocalError(
        error || 'Hubo un problema al agregar el hotel'
      );
      setSuccessMessage(null);
    }
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

        <label
          htmlFor="fileInput"
          className={styles.customFileButton}
        >
          Subir Imágenes
        </label>
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          id="fileInput"
          className={styles.fileInput}
        />

        <ImagePreview previews={previews} />

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
              {cat.title}
            </option>
          ))}
        </select>

        <button type="submit" className={styles.button}>
          Agregar Hotel
        </button>
      </form>

      {successMessage && (
        <p className={styles.success}>{successMessage}</p>
      )}
      {localError && (
        <p className={styles.error}>{localError}</p>
      )}
    </div>
  );
};

export default AdminAddProduct;
