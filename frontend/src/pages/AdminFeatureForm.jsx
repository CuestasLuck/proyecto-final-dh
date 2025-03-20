import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../styles/admin.module.css';

const AdminFeatureForm = () => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/admin/features/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setName(data.name);
          setIcon(data.icon);
        })
        .catch((error) =>
          console.error('Error fetching feature:', error)
        );
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const feature = { name, icon };

    const method = id ? 'PUT' : 'POST';
    const url = id
      ? `http://localhost:8080/admin/features/${id}`
      : 'http://localhost:8080/admin/features';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feature),
    })
      // .then((response) => response.json())
      .then(() => {
        navigate('/admin/features');
      })
      .catch((error) =>
        console.error('Error saving feature:', error)
      );
  };

  return (
    <div>
      <h2>
        {id
          ? 'Editar Característica'
          : 'Agregar Nueva Característica'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Ícono:</label>
          <input
            type="text"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
          />
        </div>
        <button type="submit">
          {id ? 'Actualizar' : 'Agregar'}
        </button>
      </form>
    </div>
  );
};

export default AdminFeatureForm;
