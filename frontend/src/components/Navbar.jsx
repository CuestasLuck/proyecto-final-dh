import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import pageLogo from '../assets/BookInn-1-Tema Blanco.png';
import styles from '../styles/header.module.css';
import { AuthContext } from '../context/AuthContext';
import { useContext, useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ProfileAvatar } from './Profile';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleNavigation = () => {
    navigate(
      location.pathname === '/admin'
        ? '/dashboard'
        : '/admin'
    );
    closeMenu();
  };

  useEffect(() => {
    const handleResize = () =>
      window.innerWidth > 768 && closeMenu();
    window.addEventListener('resize', handleResize);
    return () =>
      window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={styles.header}>
      <Link to="/dashboard" className={styles.logo}>
        <img
          src={pageLogo}
          alt="bookinn_logo"
          className={styles.icon}
        />
        <p className={styles.text}>
          Donde cada estancia se siente como en casa
        </p>
      </Link>

      {/* Icono de hamburguesa (solo en mobile) */}
      {!menuOpen && (
        <button
          className={styles.hamburger}
          onClick={toggleMenu}
        >
          <Menu size={40} />
        </button>
      )}

      {/* Overlay para cerrar el menú al hacer click fuera */}
      {menuOpen && (
        <div
          className={styles.overlay}
          onClick={closeMenu}
        ></div>
      )}

      {/* Menú lateral */}
      <nav
        className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}
      >
        <div className={styles.navbar}>
          <button
            className={styles.closeIcon}
            onClick={closeMenu}
          >
            <X size={40} />
          </button>
          {user ? (
            <>
              {user.role === 'admin' && (
                <button
                  onClick={handleNavigation}
                  className={styles.button}
                >
                  {location.pathname === '/admin'
                    ? 'Menú Principal'
                    : 'Admin Dashboard'}
                </button>
              )}
              <Link to="/">
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className={styles.button}
                >
                  Cerrar Sesión
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <button
                  onClick={closeMenu}
                  className={styles.button}
                >
                  Iniciar Sesión
                </button>
              </Link>

              <Link to="/register">
                <button
                  onClick={closeMenu}
                  className={styles.button}
                >
                  Crear Cuenta
                </button>
              </Link>
            </>
          )}
        </div>
        <ProfileAvatar style={styles.profileAvatar} />
      </nav>
    </header>
  );
}

export default Navbar;
