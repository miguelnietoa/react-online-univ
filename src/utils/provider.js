import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie';

export const Context = createContext();

export const Provider = ({ children }) => {

  const defaultValues = {
    isLoggedIn: false
  }

  const [state, setState] = useState(defaultValues)
  const cookies = new Cookies();
  
  const getDefaultValues = async () => {
    // Verificar si esta persona tiene acceso
    if (!!cookies.get('x-access-token')) {
        // Verificar si el soplamondá existe
        await axios.get('/students/info', {
          headers: {
            'x-access-token': cookies.get('x-access-token'),
          },
        })
        .then((response) => {
            console.log(response);
          setState({...state,isLoggedIn: true})
        })
        .catch((err) => {
          console.log(err)
        });
    }
  }

  useEffect(() => {
    getDefaultValues()
  }, [])

  return (
    <Context.Provider value={[state, setState]}>
      {children}
    </Context.Provider>
  )
}  
  
export default Provider;
  

