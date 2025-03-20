import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../styles/gallery.module.css';
import { ArrowLeft } from 'lucide-react';

function FullGallery() {
  const location = useLocation();
  const { images } = location.state || { images: [] };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <div className={styles.title}>
        <button
          onClick={handleBack}
          className={styles.back_button}
        >
          <ArrowLeft />
          Volver
        </button>
      </div>
      <div className={styles.full_gallery}>
        {images.map((url, index) => (
          <img
            key={index}
            src={`http://localhost:8080/${url}`}
            alt={`Imagen ${index}`}
            className={styles.full_img}
          />
        ))}
      </div>
    </div>
  );
}

export default FullGallery;
