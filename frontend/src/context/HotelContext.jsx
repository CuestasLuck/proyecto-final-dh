import { createContext, useEffect, useState } from 'react';
import useHotels from '../hooks/useHotels';
import useCategories from '../hooks/useCategories';

export const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
  const {
    hotelList,
    foundHotel,
    loading,
    error,
    removeHotel,
    registerHotel,
    getHotels,
    findHotel,
    editHotel,
  } = useHotels();

  const [features, setFeatures] = useState([]);

  const { categories, getCategories, addCategory } =
    useCategories();

  useEffect(() => {
    getHotels('http://localhost:8080/hotels');
  }, []);

  const getFeatures = async () => {
    try {
      const response = await fetch(
        'http://localhost:8080/admin/features'
      );
      if (!response.ok)
        throw new Error('Error al obtener características');
      const data = await response.json();
      setFeatures(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <HotelContext.Provider
      value={{
        hotelList,
        foundHotel,
        categories,
        loading,
        error,
        removeHotel,
        registerHotel,
        getHotels,
        findHotel,
        editHotel,
        getCategories,
        addCategory,
        getFeatures,
        features,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};
