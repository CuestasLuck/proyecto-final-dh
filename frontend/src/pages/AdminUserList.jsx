import { useState, useEffect } from 'react';

const AdminUserList = () => {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    fetch('http://localhost:8080/admin/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) =>
        console.error('Error fetching users:', error)
      );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    const response = await fetch(
      `http://localhost:8080/admin/change-role/${userId}?role=${newRole}`,
      {
        method: 'PUT',
      }
    );
    if (!response.ok) {
      setError(
        response.error ||
          `Ocurrió un error al cambiar el rol del usuario con Id: ${userId}`
      );
    } else {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? { ...user, role: newRole }
            : user
        )
      );
    }
  };

  return (
    <div>
      <h1>Listado de usuarios</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {user.role !== 'admin' ? (
                  <button
                    onClick={() =>
                      handleRoleChange(user.id, 'admin')
                    }
                  >
                    Asignar Administrador
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      handleRoleChange(user.id, 'user')
                    }
                  >
                    Quitar Administrador
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserList;
