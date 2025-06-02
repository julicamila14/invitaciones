import React, { useState } from 'react';
import './GaleriaFotos.css';

const GaleriaFotos = () => {
  const [fotos, setFotos] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);

  const handleAgregarFotos = (e) => {
    const archivos = Array.from(e.target.files);
    const nuevasFotos = archivos.map((archivo) => ({
      id: URL.createObjectURL(archivo),
      src: URL.createObjectURL(archivo),
      nombre: archivo.name,
    }));
    setFotos((prev) => [...prev, ...nuevasFotos]);
  };

  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);

  return (
    <section className="galeria-container">
      <h2 className="galeria-titulo">📸 Galería de Momentos</h2>
      <p className="galeria-subtitulo">Subí tus fotos y reviví los recuerdos con nosotros.</p>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleAgregarFotos}
        className="galeria-input"
      />

      {fotos.length > 0 && (
        <button className="galeria-boton" onClick={abrirModal}>
          📖 Ver Book
        </button>
      )}

      {modalAbierto && (
        <div className="galeria-modal">
          <div className="galeria-modal-contenido">
            <button className="cerrar-modal" onClick={cerrarModal}>✖</button>
            <div className="galeria-grid">
              {fotos.map((foto) => (
                <div className="foto" key={foto.id}>
                  <img src={foto.src} alt={foto.nombre} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GaleriaFotos;