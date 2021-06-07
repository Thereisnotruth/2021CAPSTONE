import React from 'react'
import axios from 'axios';

import Provider from './components/Provider';

import './scss/main.scss';

import useStore from './components/useStore';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'x-CSRFToken';
axios.defaults.withCredentials = true

function App() {
  const { Auth } = useStore();
  Auth.init();
  return (
    <Provider />
  );
}

export default App;

