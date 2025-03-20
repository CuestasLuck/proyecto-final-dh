import Dashboard from '../components/Dashboard';
import styles from '../styles/home.module.css';
import { ProfileName } from '../components/Profile';
import Categories from '../components/Categories';

function Home() {
  return (
    <div className={styles.home}>
      <ProfileName />
      <h1>Buscador</h1>
      <Dashboard
        styles={[
          styles.list,
          styles.card,
          styles.buttonBox,
          styles.button,
          styles.pagesButton,
        ]}
      />
      <Categories />
      <h1>Recomendados</h1>
    </div>
  );
}

export default Home;
