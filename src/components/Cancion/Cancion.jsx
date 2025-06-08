import React, { useState } from 'react';
import './formularioCancion.css';
import { agregarCancion } from '../../../fireBaseConfig';
import { serverTimestamp, Timestamp } from 'firebase/firestore';

const FormularioCancion = () => {
  const [nombre, setNombre] = useState('');
  const [cancion, setCancion] = useState('');
  const [comentario, setComentario] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !cancion) {
      setMensaje('Por favor completá todos los campos.');
      return;
    }

    try {
      await agregarCancion({
        nombre,
        cancion,
        comentario,
        fechaHora: serverTimestamp()
      });

      setMensaje(`🎶 ¡Canción enviada con éxito! Gracias, ${nombre}.`);
      setNombre('');
      setCancion('');
      setComentario('');
    } catch (error) {
      console.error('Error al guardar canción:', error);
      setMensaje('❌ Hubo un error al guardar la canción. Intentá de nuevo.');
    }
  };

  return (
    <section className="form-cancion-container">
      <div className="icono">
        <img src="/icons/cancion.gif" alt="Ceremonia" />
      </div>
      <h1 className='titulo-cancion'> Sugerí una Canción</h1>
      <p className="intro">
        Nos encantaría que nos ayudes a armar la playlist de la fiesta. <br />
        ¡Sugerí una canción que no puede faltar y contanos por qué!
      </p>
      <form onSubmit={handleSubmit} className="form-cancion">
        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nombre de la canción y artista"
          value={cancion}
          onChange={(e) => setCancion(e.target.value)}
        />
        <textarea
          placeholder="Esta canción no puede faltar porque..."
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          rows="3"
        />
        <button type="submit">Enviar</button>
      </form>
      {mensaje && <p className="mensaje">{mensaje}</p>}
    </section>
  );
};

export default FormularioCancion;