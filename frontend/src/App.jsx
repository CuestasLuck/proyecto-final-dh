import { AuthProvider } from './context/AuthContext';
import { HotelProvider } from './context/HotelContext';
import MainRouter from './router';

function App() {
  return (
    <AuthProvider>
      <HotelProvider>
        <MainRouter />
      </HotelProvider>
    </AuthProvider>
  );
}

export default App;
