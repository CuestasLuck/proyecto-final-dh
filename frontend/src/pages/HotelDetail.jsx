import { useParams } from 'react-router-dom';
import HotelCard from '../components/HotelCard';
import { useContext, useEffect } from 'react';
import { HotelContext } from '../context/HotelContext';

function HotelDetail() {
  const { id } = useParams();
  const { foundHotel, findHotel, loading } =
    useContext(HotelContext);

  console.log(foundHotel);

  useEffect(() => {
    findHotel(id);
  }, [id]);

  if (!foundHotel) return <p>Cargando detalles...</p>;

  return <HotelCard value={foundHotel} />;
}

export default HotelDetail;
