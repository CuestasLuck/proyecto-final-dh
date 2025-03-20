import { useContext, useEffect, useState } from 'react';
import styles from '../styles/admin.module.css';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () =>
      window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (isMobile) {
    return (
      <h2 className={styles.errMsg}>
        El panel de administración no está disponible en
        dispositivos móviles.
      </h2>
    );
  }
  if (user.role !== 'admin') {
    return <p>No tienes permisos</p>;
  }
  return (
    <div className={styles.adminPanel}>
      <h1>Panel de Administrador</h1>
      <Link to="add_hotel">
        <button className={styles.button}>
          Registrar Hotel
        </button>
      </Link>

      <Link to="hotels_list">
        <button className={styles.button}>
          Lista de Hoteles
        </button>
      </Link>

      <Link to="change_role">
        <button className={styles.button}>
          Lista de Usuarios
        </button>
      </Link>

      <Link to="features">
        <button className={styles.button}>
          Lista de Caracteristicas
        </button>
      </Link>

      <Link to="categories">
        <button className={styles.button}>
          Agregar Categorias
        </button>
      </Link>
    </div>
  );
}

export default AdminDashboard;
