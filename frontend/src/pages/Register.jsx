import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/forms.module.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    role: 'user',
  });

  const [userEmail, setUserEmail] = useState('');

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!/^[a-zA-Z\s]+$/.test(formData.firstName)) {
      newErrors.firstName =
        'El nombre solo puede contener letras.';
    }
    if (!/^[a-zA-Z\s]+$/.test(formData.lastName)) {
      newErrors.lastName =
        'El apellido solo puede contener letras.';
    }
    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = 'Correo electrónico inválido.';
    }
    if (formData.password.length < 6) {
      newErrors.password =
        'La contraseña debe tener al menos 6 caracteres.';
    }
    return newErrors;
  };

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleRegister = async (e) => {
  //   e.preventDefault();

  //   const newErrors = validateForm();
  //   if (Object.keys(newErrors).length > 0) {
  //     setErrors(newErrors);
  //     return;
  //   }

  //   try {
  //     const response = await fetch(
  //       'http://localhost:8080/auth/register',
  //       {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify(formData),
  //       }
  //     );

  //     if (response.ok) {
  //       alert('Registro exitoso');
  //       navigate('/login');
  //     } else {
  //       alert(
  //         'Error en el registro, intenta con otro usuario'
  //       );
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     alert('Hubo un problema con el registro.');
  //   }
  // };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === 'email') {
      setUserEmail(e.target.value); // Guardamos el email para reenviar
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch(
        'http://localhost:8080/auth/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert(
          'Registro exitoso. Revisa tu correo para confirmar tu cuenta.'
        );
        navigate('/login');
      } else {
        alert(
          'Error en el registro, intenta con otro usuario.'
        );
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un problema con el registro.');
    }
  };

  const resendEmail = async () => {
    if (!userEmail) {
      alert(
        'Ingresa tu correo para reenviar la confirmación.'
      );
      return;
    }

    try {
      const response = await fetch(
        'http://localhost:8080/auth/resend-confirmation',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userEmail }),
        }
      );

      if (response.ok) {
        alert(
          'Correo de confirmación reenviado con éxito.'
        );
      } else {
        alert('Error al reenviar el correo.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un problema al reenviar el correo.');
    }
  };

  return (
    <div className={styles.form_container}>
      <form
        className={styles.form}
        onSubmit={handleRegister}
      >
        <input
          type="text"
          name="firstName"
          placeholder="Nombre"
          value={formData.firstName}
          onChange={handleChange}
          className={styles.input}
        />
        {errors.firstName && (
          <p className={styles.error}>{errors.firstName}</p>
        )}

        <input
          type="text"
          name="lastName"
          placeholder="Apellido"
          value={formData.lastName}
          onChange={handleChange}
          className={styles.input}
        />
        {errors.lastName && (
          <p className={styles.error}>{errors.lastName}</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
        />
        {errors.email && (
          <p className={styles.error}>{errors.email}</p>
        )}

        <input
          type="text"
          name="username"
          placeholder="Usuario"
          value={formData.username}
          onChange={handleChange}
          className={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          className={styles.input}
        />
        {errors.password && (
          <p className={styles.error}>{errors.password}</p>
        )}

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className={styles.input}
        >
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>

        <button type="submit" className={styles.button}>
          Registrarse
        </button>

        <Link to="/">
          <button type="button" className={styles.button}>
            Volver a Inicio
          </button>
        </Link>
      </form>
      <button
        type="button"
        className={styles.button_secondary}
        onClick={resendEmail}
      >
        Reenviar correo de confirmación
      </button>
    </div>
  );
};

export default Register;
