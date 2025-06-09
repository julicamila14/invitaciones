import React, { useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../fireBaseConfig';
import './ConfirmarInvitacion.css';
import Modal from '../Modal/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const estados = ['Sin confirmar', 'Confirmado', 'No asistiré'];
const comidas = ['No necesita', 'Vegano', 'Sin TACC', 'Vegetariano'];

const ConfirmarInvitacion = () => {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [originales, setOriginales] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMensaje, setModalMensaje] = useState('');
  const [modalTipo, setModalTipo] = useState('exito');
  const [paginaActual, setPaginaActual] = useState(1);
  const [porPagina, setPorPagina] = useState(10);

  const handleBuscar = async () => {
    const invitadosRef = collection(db, 'invitados');
    const snapshot = await getDocs(invitadosRef);

    const encontrados = snapshot.docs
      .map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }))
      .filter((i) =>
        `${i.nombre} ${i.apellido}`.toLowerCase().includes(busqueda.toLowerCase())
      )
      .map((i) => ({
        ...i,
        estado: estados.includes(i.estado) ? i.estado : 'Sin confirmar',
        comida: comidas.includes(i.comida) ? i.comida : 'No necesita',
        confirmado: i.confirmado || 0,
      }));

    setResultados(encontrados);
    setOriginales(encontrados);
    setPaginaActual(1);
    setMensaje(encontrados.length === 0 ? 'No se encontró ningún invitado.' : '');
  };

  const actualizarCampo = (id, campo, valor) => {
    setResultados((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, [campo]: valor } : inv))
    );
  };

  const hayInvitadosParaConfirmar = () => {
    return resultados.some((inv) => {
      const original = originales.find((o) => o.id === inv.id);
      const modificado = original && (
        inv.estado !== original.estado ||
        inv.comida !== original.comida ||
        original.confirmado !== 1
      );
      const estadoValido = inv.estado === 'Confirmado' || inv.estado === 'No asistiré';
      return modificado && estadoValido;
    });
  };

  const handleEnviar = async () => {
    try {
      const aConfirmar = resultados.filter((inv) => {
        const original = originales.find((o) => o.id === inv.id);
        const modificado = original && (
          inv.estado !== original.estado ||
          inv.comida !== original.comida ||
          original.confirmado !== 1
        );
        const estadoValido = inv.estado === 'Confirmado' || inv.estado === 'No asistiré';
        return modificado && estadoValido;
      });

      for (const inv of aConfirmar) {
        await updateDoc(doc(db, 'invitados', inv.id), {
          estado: inv.estado,
          comida: inv.comida,
          confirmado: 1,
        });
      }

      await handleBuscar();
      mostrarModalExito('✅ Confirmación enviada. ¡Gracias!');
    } catch (error) {
      console.error('Error actualizando invitados:', error);
      mostrarModalError('❌ Hubo un error al enviar la confirmación.');
    }
  };

  const mostrarModalExito = (mensaje) => {
    setModalMensaje(mensaje);
    setModalTipo('exito');
    setModalVisible(true);
  };

  const mostrarModalError = (mensaje) => {
    setModalMensaje(mensaje);
    setModalTipo('error');
    setModalVisible(true);
  };

  const totalPaginas = Math.ceil(resultados.length / porPagina);
  const invitadosMostrados = resultados.slice(
    (paginaActual - 1) * porPagina,
    paginaActual * porPagina
  );

  return (
    <section className="confirmacion-container">
      <div className="icono">
        <img src="/icons/mail.gif" alt="Mail" />
      </div>
      <h2 className="titulo">Confirmar Invitación</h2>

      <div className="busqueda">
        <input
          type="text"
          placeholder="Buscar por nombre y apellido"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button onClick={handleBuscar}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      {mensaje && <p className="mensaje">{mensaje}</p>}

      {resultados.length > 0 && (
        <>
          <div className="tabla-responsive">
            <table className="grilla">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Asistencia</th>
                  <th>Comida especial</th>
                </tr>
              </thead>
              <tbody>
                {invitadosMostrados.map((invitado) => (
                  <tr key={invitado.id}>
                    <td>{invitado.nombre}</td>
                    <td>{invitado.apellido}</td>
                    <td>
                      <select
                        value={invitado.estado}
                        onChange={(e) =>
                          actualizarCampo(invitado.id, 'estado', e.target.value)
                        }
                        disabled={invitado.confirmado === 1}
                      >
                        {estados.map((estado) => (
                          <option key={estado} value={estado}>
                            {estado}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        value={invitado.comida}
                        onChange={(e) =>
                          actualizarCampo(invitado.id, 'comida', e.target.value)
                        }
                        disabled={invitado.confirmado === 1}
                      >
                        {comidas.map((opcion) => (
                          <option key={opcion} value={opcion}>
                            {opcion}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Controles de paginación */}
          <div className="paginacion">
            <div className="info">
              <p>
                Mostrando {Math.min(paginaActual * porPagina, resultados.length)} de {resultados.length} resultados
              </p>
              <label>
                Resultados por página:&nbsp;
                <select
                  value={porPagina}
                  onChange={(e) => {
                    setPorPagina(parseInt(e.target.value));
                    setPaginaActual(1);
                  }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </label>
            </div>
            <div className="controles">
              <button onClick={() => setPaginaActual(paginaActual - 1)} disabled={paginaActual === 1}>
                Anterior
              </button>
              <span className="paginas-indicador">
                Página {paginaActual} de {totalPaginas}
              </span>
              <button
                onClick={() => setPaginaActual(paginaActual + 1)}
                disabled={paginaActual === totalPaginas}
              >
                Siguiente
              </button>
            </div>
          </div>
        </>
      )}

      <div>
        {resultados.length > 0 && (
          <>
            <button
              className="btn-enviar"
              onClick={handleEnviar}
              disabled={!hayInvitadosParaConfirmar()}
            >
              Enviar confirmación
            </button>
            {!hayInvitadosParaConfirmar() && (
              <p className="mensaje-advertencia">
                ⚠️ Debe modificar al menos un invitado y seleccionar "Confirmado" o "No asistiré".
              </p>
            )}
          </>
        )}
      </div>

      {modalVisible && (
        <Modal
          mensaje={modalMensaje}
          tipo={modalTipo}
          onClose={() => setModalVisible(false)}
        />
      )}
    </section>
  );
};

export default ConfirmarInvitacion;