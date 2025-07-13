import React, { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  updateDoc,
  addDoc,
  doc,
  deleteDoc, query, orderBy 
} from "firebase/firestore";
import * as XLSX from 'xlsx';
import Navbar from '../Menu/Menu';
import { db } from '../../../fireBaseConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSave } from '@fortawesome/free-solid-svg-icons';
import './Admin.css';

const estados = ['Sin confirmar', 'Confirmado', 'No asistiré'];
const comidas = ['No necesita', 'Vegano', 'Sin TACC', 'Vegetariano'];

export default function Admin() {
  const [invitados, setInvitados] = useState([]);
  const [canciones, setCanciones] = useState([]);
  const [visitas, setVisitas] = useState([]);
  const [nuevoInvitado, setNuevoInvitado] = useState({
    nombre: '',
    apellido: '',
    estado: 'Sin confirmar',
    comida: 'No necesita',
    confirmado: 0
  });
  const [mensaje, setMensaje] = useState('');

  const filasPorPagina = 10;
  const [pagInv, setPagInv] = useState(1);
  const [pagCan, setPagCan] = useState(1);
  const [pagVis, setPagVis] = useState(1);

  const fetchData = async () => {
  const invitadosQuery = query(collection(db, "invitados"), orderBy("apellido", "asc"));
  const cancionesQuery = query(collection(db, "canciones"), orderBy("fechaHora", "desc"));
  const visitasQuery = query(collection(db, "registrosAccesos"), orderBy("fechaHora", "desc"));

  const [ins, cs, vs] = await Promise.all([
    getDocs(invitadosQuery),
    getDocs(cancionesQuery),
    getDocs(visitasQuery)
  ]);

  setInvitados(ins.docs.map(d => ({ id: d.id, ...d.data() })));
  setCanciones(cs.docs.map(d => ({ id: d.id, ...d.data() })));
  setVisitas(vs.docs.map(d => ({
    email: d.data().email,
    fechahora: d.data().fechaHora?.toDate?.()?.toISOString() ?? 'Sin fecha'
  })));
};

  useEffect(() => {
    fetchData();
  }, []);

  const guardarCambios = async inv => {
    await updateDoc(doc(db, 'invitados', inv.id), inv);
    setMensaje('✅ Cambios guardados.');
    setTimeout(() => setMensaje(''), 3000);
    fetchData();
  };

  const eliminarInvitado = async id => {
    await deleteDoc(doc(db, "invitados", id));
    setMensaje('✅ Invitado eliminado.');
    setTimeout(() => setMensaje(''), 3000);
    fetchData();
  };

  const eliminarCancion = async (id) => {
  await deleteDoc(doc(db, "canciones", id));
  setMensaje('✅ Canción eliminada.');
  setTimeout(() => setMensaje(''), 3000);
  fetchData();
};
  const handleAgregar = async e => {
    e.preventDefault();
    const nm = nuevoInvitado.nombre.trim().toUpperCase();
    const ap = nuevoInvitado.apellido.trim().toUpperCase();
    if (!nm || !ap) return;
    const existe = invitados.some(i => i.nombre === nm && i.apellido === ap);
    if (existe) { setMensaje('❌ Ya existe.'); return; }
    await addDoc(collection(db, "invitados"), { ...nuevoInvitado, nombre: nm, apellido: ap });
    setNuevoInvitado({
      nombre: '',
      apellido: '',
      estado: 'Sin confirmar',
      comida: 'No necesita',
      confirmado: 0
    });
    setMensaje('✅ Invitado agregado.');
    setTimeout(() => setMensaje(''), 3000);
    fetchData();
  };

  const exportToExcel = (data, filename) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "datos");
    XLSX.writeFile(wb, filename);
  };

  return (
    <div className="main-container">
      <Navbar />
      <div className="admin-container">
        {mensaje && <p className="mensaje">{mensaje}</p>}

        {/* Invitados */}
        <h2 className='titulo-admin'>Invitados</h2>
        <form onSubmit={handleAgregar} className="form-agregar">
          <input
            type="text"
            placeholder="Apellido"
            value={nuevoInvitado.apellido}
            onChange={e => setNuevoInvitado({ ...nuevoInvitado, apellido: e.target.value })}
          />
           <input
            type="text"
            placeholder="Nombre"
            value={nuevoInvitado.nombre}
            onChange={e => setNuevoInvitado({ ...nuevoInvitado, nombre: e.target.value })}
          />
          <select
            value={nuevoInvitado.estado}
            onChange={e => setNuevoInvitado({ ...nuevoInvitado, estado: e.target.value })}
          >
            {estados.map(s => <option key={s}>{s}</option>)}
          </select>
          <select
            value={nuevoInvitado.comida}
            onChange={e => setNuevoInvitado({ ...nuevoInvitado, comida: e.target.value })}
          >
            {comidas.map(s => <option key={s}>{s}</option>)}
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
                <th>Confirmó</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {invitados.slice((pagInv-1)*filasPorPagina, pagInv*filasPorPagina)
                .map(inv => (
                <tr key={inv.id}>
                  <td><input value={inv.nombre} onChange={e => (inv.nombre = e.target.value)} /></td>
                  <td><input value={inv.apellido} onChange={e => (inv.apellido = e.target.value)} /></td>
                  <td>
                    <select value={inv.estado} onChange={e => (inv.estado = e.target.value)}>
                      {estados.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td>
                    <select value={inv.comida} onChange={e => (inv.comida = e.target.value)}>
                      {comidas.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td>
                    <select value={inv.confirmado} onChange={e=> inv.confirmado = Number(e.target.value)}>
                      <option value={0}>No</option>
                      <option value={1}>Sí</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={()=>guardarCambios(inv)} className="icon-button">
                      <FontAwesomeIcon icon={faSave} />
                    </button>
                    <button onClick={()=>eliminarInvitado(inv.id)} className="icon-button delete-button">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="paginacion">
            <button className="admin-button" disabled={pagInv===1} onClick={()=>setPagInv(p=>p-1)}>Anterior</button>
            <span  className='paginas'>Página {pagInv}</span>
            <button  className="admin-button" disabled={pagInv>= Math.ceil(invitados.length/filasPorPagina)} onClick={()=> setPagInv(p=>p+1)}>Siguiente</button>
          </div>
        </div>
        <button className="admin-button" onClick={()=>exportToExcel(invitados,"invitados.xlsx")}>
          Exportar Invitados
        </button>

        {/* Canciones */}
        <h2 className='titulo-admin'>Canciones</h2>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Canción</th>
                <th>Comentario</th>
                <th>Fecha y Hora</th>
                <th>Acción</th> 
              </tr>
            </thead>
            <tbody>
              {canciones
                .slice((pagCan - 1) * filasPorPagina, pagCan * filasPorPagina)
                .map((c, i) => (
                  <tr key={c.id}>
                    <td>{c.nombre}</td>
                    <td>{c.cancion}</td>
                    <td>{c.comentario}</td>
                    <td>{c.fechaHora ? c.fechaHora.toDate().toLocaleString() : 'Sin fecha'}</td>
                    <td>
                      <button onClick={() => eliminarCancion(c.id)} className="icon-button delete-button">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="paginacion">
            <button  className="admin-button" disabled={pagCan===1} onClick={()=>setPagCan(p=>p-1)}>Anterior</button>
            <span  className='paginas'>Página {pagCan}</span>
            <button  className="admin-button" disabled={pagCan>= Math.ceil(canciones.length/filasPorPagina)} onClick={()=> setPagCan(p=>p+1)}>Siguiente</button>
          </div>
        </div>
        <button className="admin-button" onClick={()=>exportToExcel(canciones,"canciones.xlsx")}>
          Exportar Canciones
        </button>

        {/* Visitas */}
        <h2  className='titulo-admin'>Visitas</h2>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead><tr><th>Email</th><th>Fecha y Hora</th></tr></thead>
            <tbody>
              {visitas.slice((pagVis-1)*filasPorPagina, pagVis*filasPorPagina).map((v,i)=>(
                  <tr key={`${v.email}-${v.fechahora}`}><td>{v.email}</td><td>{new Date(v.fechahora).toLocaleString()}</td></tr>
              ))}
            </tbody>
          </table>
          <div  className="paginacion">
            <button  className="admin-button" disabled={pagVis===1} onClick={()=>setPagVis(p=>p-1)}>Anterior</button>
            <span  className='paginas'>Página {pagVis}</span>
            <button  className="admin-button" disabled={pagVis>= Math.ceil(visitas.length/filasPorPagina)} onClick={()=> setPagVis(p=>p+1)}>Siguiente</button>
          </div>
        </div>
        <button className="admin-button" onClick={()=>exportToExcel(visitas,"visitas.xlsx")}>
          Exportar Visitas
        </button>
      </div>
    </div>
  );
}