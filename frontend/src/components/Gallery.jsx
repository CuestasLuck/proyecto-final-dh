import { useNavigate } from 'react-router-dom';
import styles from '../styles/gallery.module.css';

function Gallery(prop) {
  const { imgs, alt } = prop;

  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate('gallery', { state: { images: imgs } });
  };

  return (
    <div className={styles.gallery_container}>
      <div className={styles.main_image_view}>
        <img
          src={`http://localhost:8080/${imgs[0]}`}
          alt={alt}
          className={styles.main_img}
        />
      </div>

      <div className={styles.image_grid}>
        {imgs.slice(1, 5).map((url, index) => (
          <img
            key={index}
            src={`http://localhost:8080/${url}`}
            alt={alt}
            className={styles.grid_img}
          />
        ))}
      </div>

      {/* Texto "ver más" */}
      <div className={styles.view_more}>
        <button onClick={handleViewMore}>Ver más</button>
      </div>
    </div>
  );
}

export default Gallery;
