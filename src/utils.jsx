import { Navigate } from 'react-router-dom';

export default function RutaProtegida({ children }) {
  const autorizado = localStorage.getItem('accesoValido');

  if (autorizado === 'true') {
    return children;
  }

  return <Navigate to="/" />;
}