import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/admin.module.css';

const AdminFeatureList = () => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/admin/features')
      .then((response) => response.json())
      .then((data) => setFeatures(data))
      .catch((error) =>
        console.error('Error fetching features:', error)
      );
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/admin/features/${id}`, {
      method: 'DELETE',
    })
      // .then((response) => response.json())
      .then(() => {
        setFeatures(
          features.filter((feature) => feature.id !== id)
        );
      })
      .catch((error) =>
        console.error('Error deleting feature:', error)
      );
  };

  return (
    <div>
      <h2>Administrar Características</h2>
      <Link to="/admin/features/add">
        <button>Agregar Nueva Característica</button>
      </Link>
      <ul>
        {features.map((feature) => (
          <li key={feature.id}>
            <span>
              {feature.name} - {feature.icon}
            </span>
            <Link to={`/admin/features/edit/${feature.id}`}>
              <button>Editar</button>
            </Link>
            <button
              onClick={() => handleDelete(feature.id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminFeatureList;
