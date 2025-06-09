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

  const goToInvitacion = () => {
    window.location.href = '/invitacion';
    setIsOpen(!isOpen);
  }
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
            <li><a href="#inicio" onClick={goToInvitacion}>Inicio</a></li>
            <li><a href="#eventos" onClick={goToInvitacion}>Ceremonias</a></li>
            <li><a href="#rsvp" onClick={goToInvitacion}>Confirmar asistencia</a></li>
            <li><a href="#cancion" onClick={goToInvitacion}>Sugerir canción</a></li>
            <li><a href="#book" onClick={goToInvitacion}>Book de fotos</a></li>

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