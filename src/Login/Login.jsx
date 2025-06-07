import React, { useState} from 'react';
import { auth } from '../../fireBaseConfig';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import "./login.css"

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      alert('Credenciales inválidas');
    }
  };

  return (
    <div id="contenedor">
      <div id="central">
        <div id="login">
          <div className="titulo">Bienvenido/a</div>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Usuario"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
        <div className="inferior">
          <a href="/">Volver a inicio</a>
        </div>
      </div>
    </div>
  );
}

export default Login;