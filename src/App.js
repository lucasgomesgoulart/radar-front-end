import { useState } from 'react';
import './App.css';
import api from './api'
import Cabecalho from './Components/Cabecalho/index.js'
import Formulario from './Components/Formulario';

const App = () => {

  

  return (
    <div className="App">
      <Cabecalho/>
      <Formulario/>
      
    </div>
  );
}

export default App;
