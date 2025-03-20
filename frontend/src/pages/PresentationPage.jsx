import { useContext, useEffect, useState } from 'react';
import { List, ListItem } from '../components/RenderList';
import { HotelContext } from '../context/HotelContext';
import styles from '../styles/presentationPage.module.css';
import { Link } from 'react-router-dom';

function PresentationPage() {
  const { hotelList } = useContext(HotelContext);
  const [randomHotels, setRandomHotels] = useState([]);

  const randomizer = (items) => {
    return [...items]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
  };

  useEffect(() => {
    setRandomHotels(randomizer(hotelList));
  }, [hotelList]);

  return (
    <List className={styles.list}>
      {randomHotels.map((item) => {
        return (
          <ListItem
            key={item.id}
            value={item}
            className={styles.card}
          >
            <Link to={`/hotels/${item.id}`}>
              <button className={styles.button}>
                Ver Detalles
              </button>
            </Link>
          </ListItem>
        );
      })}
    </List>
  );
}

export default PresentationPage;
