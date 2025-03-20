import { useContext, useEffect } from 'react';
import '../styles/admin.module.css';
import { HotelContext } from '../context/HotelContext';
import { useNavigate } from 'react-router-dom';

const AdminListProducts = () => {
  const { hotelList, removeHotel, getHotels } =
    useContext(HotelContext);

  useEffect(() => {
    getHotels();
  }, []);

  function handleDelete(id) {
    const confirmDelete = window.confirm(
      '¿Estás seguro de que quieres eliminar este producto?'
    );
    if (!confirmDelete) {
      return;
    } else {
      removeHotel(id);
    }
  }

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/admin/edit_hotel/${id}`);
  };

  return (
    <div className="adminTable">
      <h2 style={{ color: 'white' }}>Lista de Productos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {hotelList.map((hotel) => (
            <tr key={hotel.id}>
              <td>{hotel.id}</td>
              <td>{hotel.name}</td>
              <td>
                <button
                  onClick={() => handleDelete(hotel.id)}
                >
                  Eliminar
                </button>
                <button
                  onClick={() => handleEdit(hotel.id)}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminListProducts;
