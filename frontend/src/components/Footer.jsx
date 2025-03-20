import { Copyright } from 'lucide-react';
import styles from '../styles/footer.module.css';
import logo from '../assets/BookInn-3-Icono.png';

function Footer() {
  return (
    <div className={styles.footer}>
      <img src={logo} alt="logo" className={styles.icon} />
      <Copyright />
      <p className={styles.text}>2025 BookInn</p>
    </div>
  );
}

export default Footer;
