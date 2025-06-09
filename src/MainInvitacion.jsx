import React, { useEffect } from 'react';
import CuentaRegresiva from './components/CuentaRegresiva/CuentaRegresiva';
import Navbar from './components/Menu/Menu';
import Ceremonias from './components/Ceremonia/Ceremonias';
import FormularioCancion from './components/Cancion/Cancion';
import ConfirmarInvitacion from './components/ConfirmarInvitacion/ConfirmarInvitacion';
import GaleriaFotos from './components/BookFotos/geleriaFotos';
import CosasImportantes from './components/CosasImportantes';
import DressCode from './components/DressCode';
import { useLocation } from 'react-router';


function MainInvitacion() {

  const location = useLocation();

 useEffect(() => {
  if (location.hash) {
    const id = location.hash.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }, 100);
    }
  }
}, [location]);

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
