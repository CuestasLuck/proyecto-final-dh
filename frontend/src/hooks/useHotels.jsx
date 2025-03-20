import { useState } from 'react';

function useHotels() {
  const [hotelList, setHotelList] = useState([]);
  const [foundHotel, setFoundHotel] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getHotels = async (url) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      const dataToJson = await response.json();
      setHotelList(dataToJson);
      if (!response.ok) {
        setError(
          dataToJson.error ||
            'Ocurrió un error al obtener la lista de hoteles'
        );
      } else {
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const findHotel = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:8080/hotels/${id}`
      );
      const dataToJson = await response.json();
      if (!response.ok) {
        setError(
          dataToJson.error ||
            `Ocurrió un error al buscar el hotel con Id: ${id}`
        );
      } else {
        setFoundHotel(dataToJson);
      }
      console.log(dataToJson);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const registerHotel = async (newHotel) => {
    setLoading(true);
    setError(null);
    console.log(newHotel);
    try {
      const response = await fetch(
        'http://localhost:8080/hotels',
        {
          method: 'POST',
          body: newHotel,
        }
      );
      const dataToJson = await response.json();
      if (!response.ok) {
        setError(
          dataToJson.error ||
            `Ocurrió un error al registrar el hotel: ${newHotel.name}`
        );
      } else {
        setHotelList((prevHotels) => [
          ...prevHotels,
          dataToJson,
        ]);
        return true;
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const removeHotel = async (hotelId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:8080/hotels/${hotelId}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) {
        const dataToJson = await response.json();
        setError(
          dataToJson.error ||
            `Ocurrió un error al eliminar el hotel con Id: ${id}`
        );
        return;
      }
      setHotelList((prevHotels) =>
        prevHotels.filter(
          (hotelItem) => hotelItem.id !== hotelId
        )
      );
      alert('Producto eliminado con éxito');
    } catch (err) {
      setError(err);
      alert('Hubo un problema al eliminar el producto');
    } finally {
      setLoading(false);
    }
  };

  const editHotel = async (hotelId, updatedHotel) => {
    console.log(hotelId, updatedHotel);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:8080/hotels/update/${hotelId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedHotel),
        }
      );

      const dataToJson = await response.json();

      if (!response.ok) {
        setError(
          dataToJson.error ||
            `Ocurrió un error al editar el hotel con Id: ${updatedHotel.id}`
        );
      } else {
        setHotelList(
          hotelList.map((hotel) =>
            hotel.id === dataToJson.id ? dataToJson : hotel
          )
        );
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
}

export default useHotels;
