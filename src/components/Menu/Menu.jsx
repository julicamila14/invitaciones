import React, { useState, useEffect } from 'react';
import { auth } from '../../../fireBaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Login from '../../Login/Login';
import './Menu.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };
  handleResize();
  window.addEventListener('resize', handleResize);

  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setUser(user);
    if (user) {
      setShowLogin(false);
    }
  });

  return () => {
    window.removeEventListener('resize', handleResize);
    unsubscribe();
  };
}, []);

  const goToInvitacion = (seccionId) => {
    const destino = `/invitacion${seccionId}`;
    window.location.href = destino;
    setIsOpen(false);
  }
  ;
  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    await signOut(auth);
    setIsOpen(false);
    setShowLogin(false);
  }

  const handleShowLogin = () => {
    setShowLogin(true);
    setIsOpen(false);
  };

  const goToAdmin = () => {
    setIsOpen(false);
    window.location.href = '/admin';
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <img
            src="/png/Menu.gif"
            alt="Logo"
            style={{ height: '100%', maxHeight: '60px', width: 'auto' }}
          />
        </div>

        {isMobile && (
          <button className="menu-toggle" onClick={toggleMenu} aria-label="Abrir menú">
            {isOpen ? '✕' : '☰'}
          </button>
        )}

        <div className={`nav-menu ${isOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            <li><a onClick={() => goToInvitacion('#inicio')}>Inicio</a></li>
            <li><a onClick={() => goToInvitacion('#eventos')}>Ceremonias</a></li>
            <li><a onClick={() => goToInvitacion('#rsvp')}>Confirmar asistencia</a></li>
            <li><a onClick={() => goToInvitacion('#cancion')}>Sugerir canción</a></li>
            <li><a onClick={() => goToInvitacion('#book')}>Book de fotos</a></li>

            {user ? (
              <>
                <li><a onClick={handleLogout}>Cerrar sesión</a></li>
                <li><a onClick={goToAdmin}>Admin</a></li> 
             </>
            ) : (
              <li><a onClick={handleShowLogin}>Iniciar sesión</a></li>
            )}
          </ul>
        </div>
      </nav>

      {showLogin && <Login />}
    </>
  );
}

export default Navbar;