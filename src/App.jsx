import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../fireBaseConfig';

import Login from './Login/Login';
import MainInvitacion from './MainInvitacion';
import Admin from './components/Admin/Admin';
import EmailVerification from './Email/email';
import RutaProtegida from './utils'; 

function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  if (user === undefined) return <div>Cargando...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmailVerification />} />
        <Route
          path="/invitacion"
          element={
            <RutaProtegida>
              <MainInvitacion />
            </RutaProtegida>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={user ? <Admin /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;