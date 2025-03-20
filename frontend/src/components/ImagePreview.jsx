import styles from '../styles/imagePreview.module.css';

const ImagePreview = ({ previews }) => {
  if (!previews || previews.length === 0) return null;

  return (
    <div className={styles.scrollWrapper}>
      <div className={styles.previewContainer}>
        {previews.map((preview, index) => (
          <img
            key={index}
            src={preview}
            alt={`preview-${index}`}
            className={styles.imagePreview}
          />
        ))}
      </div>
    </div>
  );
};

export default ImagePreview;
