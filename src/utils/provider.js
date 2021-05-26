import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { ToastContainer } from 'react-toastify';

export const Context = createContext();

export const Provider = ({ children }) => {
  const defaultValues = {
    isLoggedIn: false,
    token: undefined,
    user: {},
  };

  const [state, setState] = useState(defaultValues);
  const cookies = new Cookies();

  const getDefaultValues = async () => {
    // Verificar si esta persona tiene acceso
    const token = cookies.get('x-access-token');
    if (!!token) {
      // Verificar si el usuario existe
      await axios
        .get('/students/info', {
          headers: {
            'x-access-token': token,
          },
        })
        .then((response) => {
          console.log('PROV');
          console.log(response);
          setState({ ...state, isLoggedIn: true, token, user: response.data.user });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getDefaultValues();
  }, []);

  return (
    <Context.Provider value={[state, setState]}>
      <ToastContainer />
      {children}
    </Context.Provider>
  );
};

export default Provider;
