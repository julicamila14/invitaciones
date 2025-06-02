import React from 'react';
import './Ceremonias.css';

const Ceremonias = () => {
  return (
    <section className="ceremonias-container">
      <div className="cuando-section">
        <div className="icono">
        <img src="/icons/calendario.gif" alt="¿Cuándo?" />
        <p>¿CUÁNDO?</p>
        <p>20 DE SEPTIEMBRE 2025</p>
       </div>
      </div>

      <h1 className="ceremonias-titulo">Itinerario</h1>

      <div className="eventos-wrapper">
        <div className="evento">
          <div className="icono">
            <img src="/icons/iglesia.gif" alt="Ceremonia" />
          </div>
          <div className="info">
            <h3>CEREMONIA</h3>
            <p>| 20:30 HS |</p>
            <button>CÓMO LLEGAR</button>
          </div>
        </div>

        <div className="evento">
          <div className="icono">
            <img src="/icons/bola-disco.gif" alt="Fiesta" />
          </div>
          <div className="info">
            <h3>FIESTA</h3>
            <p>| 21:00 HS |</p>
            <button>CÓMO LLEGAR</button>
          </div>
        </div>

         <div className="evento">
          <div className="icono">
            <img src="/icons/civil.gif" alt="Civil" />
          </div>
          <div className="info">
            <h3>CIVIL</h3>
            <p>| 12:30 HS |</p>
            <button>CÓMO LLEGAR</button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Ceremonias;