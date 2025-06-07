import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import * as XLSX from 'xlsx';
import Navbar from '../Menu/Menu';
import { db } from '../../../fireBaseConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSave } from '@fortawesome/free-solid-svg-icons';
import "./Admin.css"

const estados = ['Sin confirmar', 'Confirmado', 'No asistiré'];
const comidas = ['No necesita', 'Vegano', 'Sin TACC', 'Vegetariano'];

function Admin() {
  const [invitados, setInvitados] = useState([]);
  const [canciones, setCanciones] = useState([]);
  const [nuevoInvitado, setNuevoInvitado] = useState({
    nombre: '',
    apellido: '',
    estado: 'Sin confirmar',
    comida: 'No necesita',
    confirmado: 0
  });
  const [mensaje, setMensaje] = useState('');

  const fetchData = async () => {
    const invitadosSnapshot = await getDocs(collection(db, "invitados"));
    const cancionesSnapshot = await getDocs(collection(db, "canciones"));

    setInvitados(invitadosSnapshot.docs.map(docSnap => {
    const data = docSnap.data();
    return {
        id: docSnap.id,
        nombre: data.nombre || '',
        apellido: data.apellido || '',
        estado: estados.includes(data.estado) ? data.estado : 'Sin confirmar',
        comida: comidas.includes(data.comida) ? data.comida : 'No necesita',
        confirmado: typeof data.confirmado === 'number' ? data.confirmado : 0
    };
    }));

    setCanciones(cancionesSnapshot.docs.map(doc => doc.data()));
  };

  useEffect(() => {
    fetchData();
  }, []);

const handleAgregarInvitado = async (e) => {
  e.preventDefault();

  // Convertir a mayúsculas y quitar espacios extra
  const nombre = nuevoInvitado.nombre.trim().toUpperCase();
  const apellido = nuevoInvitado.apellido.trim().toUpperCase();

  if (!nombre || !apellido) return;

  // Verificar si ya existe un invitado con mismo nombre y apellido
  const yaExiste = invitados.some(
    (inv) =>
      inv.nombre.trim().toUpperCase() === nombre &&
      inv.apellido.trim().toUpperCase() === apellido
  );

  if (yaExiste) {
    setMensaje('❌ El invitado ya existe.');
    setTimeout(() => setMensaje(''), 3000);
    return;
  }

  const invitadoFormateado = {
    ...nuevoInvitado,
    nombre,
    apellido,
  };

  await addDoc(collection(db, "invitados"), invitadoFormateado);

  setNuevoInvitado({ nombre: '', apellido: '', estado: 'Sin confirmar', comida: 'No necesita', confirmado: 0 });
  fetchData();
  setMensaje('✅ Invitado agregado correctamente.');
  setTimeout(() => setMensaje(''), 10000);
};

  const actualizarCampo = (id, campo, valor) => {
    setInvitados((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, [campo]: valor } : inv))
    );
  };

  const guardarCambios = async (invitado) => {
    try {
      await updateDoc(doc(db, 'invitados', invitado.id), {
        nombre: invitado.nombre,
        apellido: invitado.apellido,
        estado: invitado.estado,
        comida: invitado.comida,
        confirmado: invitado.confirmado
      });
      setMensaje('✅ Cambios guardados.');
      setTimeout(() => setMensaje(''), 3000);
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error al guardar cambios.');
      setTimeout(() => setMensaje(''), 3000);
    }
  };

  const eliminarInvitado = async (id) => {
  try {
    await deleteDoc(doc(db, "invitados", id));
    setMensaje('Invitado eliminado correctamente.');
    fetchData();
    setTimeout(() => setMensaje(''), 3000);
  } catch (error) {
    console.error(error);
    setMensaje('Error al eliminar invitado.');
    setTimeout(() => setMensaje(''), 3000);
  }
};

  const exportToExcel = (data, filename) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Datos");
    XLSX.writeFile(wb, filename);
  };

  return (
    <div className="main-container">
      <Navbar />
      <div className="main-content"></div>
      <div className="admin-container">
        <h1>Admin - Invitados</h1>

        {mensaje && <p className={`mensaje ${mensaje.tipo}`}>{mensaje.texto}</p>}

        <form onSubmit={handleAgregarInvitado} className="form-agregar">
          <input
            type="text"
            placeholder="Nombre"
            value={nuevoInvitado.nombre}
            onChange={(e) => setNuevoInvitado({ ...nuevoInvitado, nombre: e.target.value })}
          />
          <input
            type="text"
            placeholder="Apellido"
            value={nuevoInvitado.apellido}
            onChange={(e) => setNuevoInvitado({ ...nuevoInvitado, apellido: e.target.value })}
          />
          <select
            value={nuevoInvitado.estado}
            onChange={(e) => setNuevoInvitado({ ...nuevoInvitado, estado: e.target.value })}
          >
            {estados.map((estado) => (
              <option key={estado} value={estado}>{estado}</option>
            ))}
          </select>
          <select
            value={nuevoInvitado.comida}
            onChange={(e) => setNuevoInvitado({ ...nuevoInvitado, comida: e.target.value })}
          >
            {comidas.map((comida) => (
              <option key={comida} value={comida}>{comida}</option>
            ))}
          </select>
          <button type="submit" className="admin-button">Agregar Invitado</button>
        </form>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
                <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Estado</th>
                <th>Comida</th>
                <th>¿Ya confirmo?</th>
                <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                {invitados.map((inv) => (
                <tr key={inv.id}>
                    <td>
                    <input
                        type="text"
                        value={inv.nombre}
                        onChange={(e) => actualizarCampo(inv.id, 'nombre', e.target.value)}
                    />
                    </td>
                    <td>
                    <input
                        type="text"
                        value={inv.apellido}
                        onChange={(e) => actualizarCampo(inv.id, 'apellido', e.target.value)}
                    />
                    </td>
                    <td>
                    <select
                        value={inv.estado}
                        onChange={(e) => actualizarCampo(inv.id, 'estado', e.target.value)}
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
                        value={inv.comida}
                        onChange={(e) => actualizarCampo(inv.id, 'comida', e.target.value)}
                    >
                        {comidas.map((comida) => (
                        <option key={comida} value={comida}>
                            {comida}
                        </option>
                        ))}
                    </select>
                    </td>
                    <td>
                    <select
                        value={inv.confirmado}
                        onChange={(e) => actualizarCampo(inv.id, 'confirmado', Number(e.target.value))}
                    >
                        <option value={0}>No</option>
                        <option value={1}>Sí</option>
                    </select>
                    </td>
                    <td>
                    <button title="Guardar" onClick={() => guardarCambios(inv)} className="icon-button">
                        <FontAwesomeIcon icon={faSave} />
                    </button>
                    <button title="Eliminar" onClick={() => eliminarInvitado(inv.id)} className="icon-button delete-button">
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
          </table>
        </div>

        <button className="admin-button" onClick={() => exportToExcel(invitados, "invitados.xlsx")}>
          Exportar Invitados a Excel
        </button>

        <h1>Canciones Sugeridas</h1>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr><th>Título</th><th>Artista</th></tr>
            </thead>
            <tbody>
              {canciones.map((can, i) => (
                <tr key={i}>
                  <td>{can.titulo}</td>
                  <td>{can.artista}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="admin-button" onClick={() => exportToExcel(canciones, "canciones.xlsx")}>
          Exportar Canciones a Excel
        </button>
      </div>
    </div>
  );
}

export default Admin;