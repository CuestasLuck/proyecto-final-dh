import { useEffect, useState } from 'react';

export const ProfileName = (props) => {
  const [user, setUser] = useState(null);
  const { style } = props;

  useEffect(() => {
    const loggedInUser = JSON.parse(
      localStorage.getItem('user')
    );
    setUser(loggedInUser);
  }, []);

  return (
    <div className={style}>
      {user && (
        <h1>
          Bienvenido, {user.firstName} {user.lastName}
        </h1>
      )}
    </div>
  );
};

export const ProfileAvatar = (props) => {
  const [user, setUser] = useState(null);
  const { style } = props;

  useEffect(() => {
    const loggedInUser = JSON.parse(
      localStorage.getItem('user')
    );
    setUser(loggedInUser);
  }, []);

  return (
    <div>
      {user && (
        <div className={style}>
          {user.firstName.charAt(0)}
          {user.lastName.charAt(0)}
        </div>
      )}
    </div>
  );
};
