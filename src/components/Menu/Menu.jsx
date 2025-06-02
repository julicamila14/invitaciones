import React, { useState, useEffect } from 'react';
import './Menu.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Define el ancho del breakpoint para móvil
    };

    handleResize(); // Verifica el tamaño inicial
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">F + J
        <img
          src="/favicon.ico"
          alt="Logo"
          style={{ height: '100%', maxHeight: '40px', width: 'auto' }}
        />
      </div>

      {/* Botón de menú hamburguesa (solo en móvil) */}
      {isMobile && (
        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Abrir menú"
        >
          {isOpen ? '✕' : '☰'} {/* Muestra "Menú ✕" o el menú */}
        </button>
      )}

      {/* Contenedor del menú */}
      <div className={`nav-menu ${isOpen ? 'open' : ''}`}>
        {/* Enlaces de navegación */}
        <ul className="nav-links">
          <li><a href="#inicio" onClick={toggleMenu}>Inicio</a></li>
          <li><a href="#eventos" onClick={toggleMenu}>Ceremonias</a></li>
          <li><a href="#rsvp" onClick={toggleMenu}>Confirmar asistencia</a></li>
          <li><a href="#cancion" onClick={toggleMenu}>Sugerir canción</a></li>
          <li><a href="#book" onClick={toggleMenu}>Book de fotos</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
