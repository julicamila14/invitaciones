import React from 'react';
import CuentaRegresiva from './components/CuentaRegresiva/CuentaRegresiva';
import Navbar from './components/Menu/Menu';
import Ceremonias from './components/Ceremonia/Ceremonias';
import FormularioCancion from './components/Cancion/Cancion';
import ConfirmarInvitacion from './components/ConfirmarInvitacion/ConfirmarInvitacion';
import GaleriaFotos from './components/BookFotos/geleriaFotos';
import CosasImportantes from './components/CosasImportantes';
import DressCode from './components/DressCode';


function MainInvitacion() {
  return (
    <div className="main-container">
      <Navbar />

      <div id="inicio" className="main-content">
        <CuentaRegresiva fechaObjetivo="2025-09-20T19:00:00" />
      </div>

      <div id="eventos" className="main-ceremonias">
        <Ceremonias />
      </div>

      <div id="cancion" className="fondo-cancion">
        <FormularioCancion />
      </div>

      <div>
        <DressCode />
      </div>

      <div id="rsvp" className="fondo-cancion confirmacion-hoja">
        <ConfirmarInvitacion className='confirmacion-containe' />
      </div>

      <div id="book">
        <GaleriaFotos />
      </div>
    </div>
  );
}

export default MainInvitacion;
