import { useNavigate } from 'react-router-dom';
import styles from '../styles/hotelDetails.module.css';
import Gallery from './Gallery';
import { ArrowLeft } from 'lucide-react';

function HotelCard(props) {
  const { value } = props;

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.infoConteiner}>
      <div className={styles.title}>
        <h2>{value.name}</h2>
        <button
          onClick={handleBack}
          className={styles.back_button}
        >
          <ArrowLeft />
          Volver
        </button>
      </div>
      <p>
        Ubicación: {value.city}, {value.country}
      </p>
      <p>
        Rating: {value.rating} Precio por noche: $
        {value.pricePerNight}
      </p>
      <p></p>
      <p>{value.description}</p>
      <div>
        <Gallery imgs={value.imageUrls} alt={value.name} />
      </div>

      <div className={styles.featuresBlock}>
        <h2>Características</h2>
        <div className={styles.featuresList}>
          {value.features.map((feature) => (
            <div
              key={feature.id}
              className={styles.featureItem}
            >
              <img
                src={feature.icon}
                alt={feature.name}
                className={styles.featureIcon}
              />
              <span>{feature.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
