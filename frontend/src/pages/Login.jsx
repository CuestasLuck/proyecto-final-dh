import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/forms.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await login(email, password);
    console.log(response);
    if (response) {
      // Login exitoso, redirigir al dashboard
      navigate('/dashboard');
    } else {
      // Si las credenciales son incorrectas, muestra un mensaje
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className={styles.form_container}>
      <form className={styles.form}>
        <div>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
        </div>
        <div>
          <button
            type="button"
            onClick={handleLogin}
            className={styles.button}
          >
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
