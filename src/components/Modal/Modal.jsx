const Modal = ({ mensaje, onClose, tipo }) => {
  const isError = tipo === 'error';
  
  return (
    <div style={styles.overlay}>
      <div style={{ 
        ...styles.modal, 
        borderColor: isError ? '#c0392b' : '#0a3d62',
        backgroundColor: 'white'
      }}>
        <h2 style={{ color: isError ? '#c0392b' : '#0a3d62' }}>
          {isError ? '❌ Error' : '✅ Éxito'}
        </h2>
        <p>{mensaje}</p>
        <button onClick={onClose} style={styles.botonCerrar}>Cerrar</button>
      </div>
    </div>
  );
};
export default Modal;

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100%', height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 9999,
  },
  modal: {
    padding: 20,
    border: '4px solid',
    borderRadius: 10,
    backgroundColor: '#fff',
    textAlign: 'center',
    maxWidth: 400,
  },
  botonCerrar: {
    marginTop: 20,
    padding: '8px 16px',
    backgroundColor: '#0a3d62',
    color: 'white',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
  }
};