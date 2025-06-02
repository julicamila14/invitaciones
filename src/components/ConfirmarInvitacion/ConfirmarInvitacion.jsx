import React, { useState } from 'react';
import './ConfirmarInvitacion.css';

const invitadosMock = [
  { id: 1, nombre: 'Juan', apellido: 'Pérez' },
  { id: 2, nombre: 'Ana', apellido: 'González' },
  { id: 3, nombre: 'Lucía', apellido: 'Martínez' },
];

const estados = ['Sin confirmar', 'Confirmado', 'No asistiré'];
const comidas = ['No necesita', 'Vegano', 'Sin TACC', 'Vegetariano'];

const ConfirmarInvitacion = () => {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [mensaje, setMensaje] = useState('');

  const handleBuscar = () => {
    const encontrados = invitadosMock.filter((i) =>
      `${i.nombre} ${i.apellido}`.toLowerCase().includes(busqueda.toLowerCase())
    ).map(i => ({
      ...i,
      estado: 'Sin confirmar',
      comida: 'No necesita',
    }));

    setResultados(encontrados);
    setMensaje(encontrados.length === 0 ? 'No se encontró ningún invitado.' : '');
  };

  const actualizarCampo = (id, campo, valor) => {
    setResultados((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, [campo]: valor } : inv))
    );
  };

  const handleEnviar = () => {
    // Simula un envío
    setMensaje('✅ Confirmación enviada. ¡Gracias!');
    console.log('Invitados confirmados:', resultados);
  };

  return (
    <section className="confirmacion-container">
      <h2>Confirmar Invitación</h2>
      <div className="busqueda">
        <input
          type="text"
          placeholder="Buscar por nombre y apellido"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button onClick={handleBuscar}>Buscar</button>
      </div>

      {mensaje && <p className="mensaje">{mensaje}</p>}

      {resultados.length > 0 && (
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
            {resultados.map((invitado) => (
              <tr key={invitado.id}>
                <td>{invitado.nombre}</td>
                <td>{invitado.apellido}</td>
                <td>
                  <select
                    value={invitado.estado}
                    onChange={(e) =>
                      actualizarCampo(invitado.id, 'estado', e.target.value)
                    }
                  >
                    {estados.map((estado) => (
                      <option key={estado} value={estado}>{estado}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    value={invitado.comida}
                    onChange={(e) =>
                      actualizarCampo(invitado.id, 'comida', e.target.value)
                    }
                  >
                    {comidas.map((opcion) => (
                      <option key={opcion} value={opcion}>{opcion}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {resultados.length > 0 && (
        <button className="btn-enviar" onClick={handleEnviar}>
          Enviar confirmación
        </button>
      )}
    </section>
  );
};

export default ConfirmarInvitacion;