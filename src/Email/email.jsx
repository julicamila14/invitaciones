import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import { registrarAcceso } from '../../fireBaseConfig';
import './email.css';

export default function EmailVerification() {
  const [email, setEmail] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const navigate = useNavigate();

  const generateCode = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

  const sendVerificationEmail = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage('📬 Por favor, ingresa tu email.');
      return;
    }

    setIsSending(true);
    const code = generateCode();
    setGeneratedCode(code);

    const templateParams = {
      user_email: email,
      verification_code: code,
    };

    try {
      await emailjs.send(
        'service_yz78mnb',
        'template_ihh8gia',
        templateParams,
        'nuvwek2Q9VVpzqFid'
      );
      setMessage('✅ Código enviado. Revisá tu correo 📩');
      setCodeSent(true);
      registrarAcceso(email);
    } catch (error) {
      console.error('Error al enviar el email:', error);
      setMessage('❌ Hubo un error al enviar el correo.');
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyCode = () => {
    if (inputCode.trim() === generatedCode) {
      navigate('/invitacion');
    } else {
      setMessage('⚠️ El código ingresado es incorrecto.');
    }
  };

  return (
    <div className="container-email body-email">
      <h2 className="title">
        <span className="emoji-wave">💌</span> Bienvenidos
        </h2>
        <p className="subtitle">
        <span className="emoji-shake">🚀</span> Verificá tu correo para continuar
        </p>
      {!codeSent ? (
        <form onSubmit={sendVerificationEmail} className="fade-in">
          <label>Email:</label>
          <input
            className='input-verificacion '
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
            disabled={isSending}
          />
         <button
            type="submit"
            disabled={isSending}
            className="boton-animado boton-enviar"
            >
            {isSending ? 'Enviando...' : '📤 Enviar Código'}
            </button>
        </form>
      ) : (
        <div className="fade-in">
          <p className="subtitle">📩 Código enviado. Ingresalo abajo:</p>
          <input className='input-verificacion '
            type="text"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="Ingrese código"
            maxLength={6}
          />
          <button className="boton-animado boton-enviar" onClick={handleVerifyCode}>
            ✅ Verificar y Entrar
          </button>
        </div>
      )}

      {message && <p className="mensaje fade-in">{message}</p>}
    </div>
  );
}