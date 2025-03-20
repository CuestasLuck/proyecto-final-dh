import { useContext, useState } from 'react';
import { HotelContext } from '../context/HotelContext';
import { List, ListItem } from './RenderList';
import { Link } from 'react-router-dom';
import useMobile from '../hooks/useMobile';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react';

function Dashboard(props) {
  const { hotelList } = useContext(HotelContext);
  const isMobile = useMobile();
  const [currentPage, setCurrentPage] = useState(1);
  const { styles } = props;

  const products = [...hotelList];

  const itemsPerPage = 4;
  const totalPages = Math.ceil(
    products.length / itemsPerPage
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const productList = (
    <List className={styles[0]}>
      {currentProducts.map((product) => {
        return (
          <ListItem
            key={product.id}
            value={product}
            className={styles[1]}
          >
            <Link to={`/hotels/${product.id}`}>
              <button className={styles[3]}>
                Ver Detalles
              </button>
            </Link>
          </ListItem>
        );
      })}
    </List>
  );

  const buttons = (
    <div>
      {isMobile ? (
        <div className={styles[2]}>
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className={styles[4]}
          >
            <ChevronsLeftIcon size={24} />
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.max(prev - 1, 1)
              )
            }
            disabled={currentPage === 1}
            className={styles[4]}
          >
            <ChevronLeft size={24} />
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, totalPages)
              )
            }
            disabled={currentPage === totalPages}
            className={styles[4]}
          >
            <ChevronRight size={24} />
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className={styles[4]}
          >
            <ChevronsRightIcon size={24} />
          </button>
        </div>
      ) : (
        <div className={styles[2]}>
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className={styles[3]}
          >
            Inicio
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.max(prev - 1, 1)
              )
            }
            disabled={currentPage === 1}
            className={styles[3]}
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, totalPages)
              )
            }
            disabled={currentPage === totalPages}
            className={styles[3]}
          >
            Siguiente
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className={styles[3]}
          >
            Última
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div>
      {productList}
      {buttons}
    </div>
  );
}

export default Dashboard;
