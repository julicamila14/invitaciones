import React, { useState, useEffect } from 'react';
import './GaleriaFotos.css';
import { listarFotosAlbum, subirFoto, eliminarFoto } from '../../../fireBaseConfig';

const GaleriaFotos = () => {
  const [albumSeleccionado, setAlbumSeleccionado] = useState('ceremonia');
  const [fotos, setFotos] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);

  const albums = ['Ceremonia', 'Fiesta', 'Civil'];

  const cargarFotos = async (album) => {
    const fotosCargadas = await listarFotosAlbum(album);
    setFotos(fotosCargadas);
    setSeleccionadas([]);
  };

  const handleCambiarAlbum = async (e) => {
    const album = e.target.value;
    setAlbumSeleccionado(album);
    await cargarFotos(album);
  };

  const handleAgregarFotos = async (e) => {
    const archivos = Array.from(e.target.files);
    for (const archivo of archivos) {
      await subirFoto(archivo, albumSeleccionado);
    }
    await cargarFotos(albumSeleccionado);
  };

  const toggleSeleccion = (fotoId) => {
    setSeleccionadas((prev) =>
      prev.includes(fotoId) ? prev.filter((id) => id !== fotoId) : [...prev, fotoId]
    );
  };

  const handleEliminarSeleccionadas = async () => {
    for (const id of seleccionadas) {
      const foto = fotos.find((f) => f.id === id);
      if (foto) await eliminarFoto(foto.album, foto.nombre);
    }
    await cargarFotos(albumSeleccionado);
  };

  const handleDescargarSeleccionadas = () => {
    seleccionadas.forEach((id) => {
      const foto = fotos.find((f) => f.id === id);
      if (foto) {
        const a = document.createElement('a');
        a.href = foto.src;
        a.download = foto.nombre;
        a.click();
      }
    });
  };

  const eliminarUnaFoto = async (foto) => {
    await eliminarFoto(foto.album, foto.nombre);
    await cargarFotos(albumSeleccionado);
  };

  const descargarFoto = (foto) => {
    const a = document.createElement('a');
    a.href = foto.src;
    a.download = foto.nombre;
    a.click();
  };

  useEffect(() => {
    cargarFotos(albumSeleccionado);
  }, []);

  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);

  return (
    <section className="galeria-container">
      <div className="icono"> 
        <img src="/icons/camara.gif" alt="camara" />
      </div>
      <h2 className="galeria-titulo">📸 Galería de Momentos</h2>
      <p className="galeria-subtitulo">Subí tus fotos por álbum y carga tus fotos ⬇️</p>
      <div className='fondos-inputs'>
      <div className='div-cargar'>
      <select className='galeria-select' value={albumSeleccionado} onChange={handleCambiarAlbum}>
        {albums.map((album) => (
          <option key={album} value={album}>{album}</option>
        ))}
      </select>
      </div>
      <div className='div-cargarfotos'>
      <input 
        type="file"
        accept="image/*"
        multiple
        onChange={handleAgregarFotos}
        className="galeria-input"
      />
      </div>
      </div>
      {fotos.length > 0 && (
        <>
          <button className="galeria-boton" onClick={abrirModal}>📖 Ver Book</button>
        </>
      )}

      {modalAbierto && (
        <div className="galeria-modal">
          <div className="galeria-modal-contenido">
            <button className="cerrar-modal" onClick={cerrarModal}>✖</button>

            <div className="galeria-acciones-grupales">
              <button onClick={handleEliminarSeleccionadas} disabled={!seleccionadas.length}>
                🗑 Eliminar seleccionadas
              </button>
              <button onClick={handleDescargarSeleccionadas} disabled={!seleccionadas.length}>
                ⬇️ Descargar seleccionadas
              </button>
            </div>

            <div className="galeria-grid">
              {fotos.map((foto) => (
                <div
                  key={foto.id}
                  className={`foto ${seleccionadas.includes(foto.id) ? 'seleccionada' : ''}`}
                >
                  <div className="foto-contenedor" onClick={() => toggleSeleccion(foto.id)}>
                    <img
                      src={foto.src}
                      alt={foto.nombre}
                      className="foto-imagen"
                    />
                    <div className="foto-iconos">
                      <button onClick={(e) => { e.stopPropagation(); descargarFoto(foto); }}>⬇️</button>
                      <button onClick={(e) => { e.stopPropagation(); eliminarUnaFoto(foto); }}>🗑</button>
                    </div>
                  </div>
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