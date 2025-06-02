import React from 'react';
import CuentaRegresiva from './components/CuentaRegresiva/CuentaRegresiva';
import Navbar from './components/Menu/Menu';
import Ceremonias from './components/Ceremonia/Ceremonias';
import FormularioCancion from './components/Cancion/Cancion';
import ConfirmarInvitacion from './components/ConfirmarInvitacion/ConfirmarInvitacion';
import GaleriaFotos from './components/BookFotos/geleriaFotos';


function MainInvitacion() {
  return (
    <div className="main-container">
      <Navbar />
      <div className="main-content">
        <CuentaRegresiva fechaObjetivo="2025-09-20T19:00:00" />
      </div>
      <div className="main-ceremonias">
      <Ceremonias/>
      </div>
      <div>
        <FormularioCancion/>
      </div>
      <div>
        <ConfirmarInvitacion/>
      </div>
      <div>
        <GaleriaFotos/>
      </div>
    </div>
  );
}

export default MainInvitacion;
